// Control de acceso de la app en Cloudflare (sin tarjeta): pide usuario y contraseña (HTTP Basic) antes de servir nada.
// Solo se usa en Cloudflare; en local (abrir index.html) no interviene. Ver docs/despliegue_cloudflare.md.
//
// La app consulta /__usuario para saber quién ha entrado y no pide un segundo login.
//
// Cerrar sesión: HTTP Basic no tiene «salir», así que la app pide /__salir con el usuario reservado SALIR. El navegador
// guarda esas credenciales falsas en lugar de las buenas y, al recargar, el worker vuelve a pedir usuario y contraseña.
//
// Usuarios autorizados: secreto USUARIOS del Worker (Settings → Variables and Secrets → tipo Secret), una persona por
// línea o separadas por comas. Cada línea es «usuario:hash» generado con herramientas/generar_usuario.html
// (ana:pbkdf2-sha256$10000$<sal>$<hash>): así la contraseña no se guarda en ningún sitio. Por compatibilidad se acepta
// también «usuario:contraseña» en claro, pero no se recomienda.
// Aceptar a alguien = añadir su línea; denegar = borrarla. Sin USUARIOS no entra nadie (falla cerrado).
//
// Intentos fallidos: el binding LIMITE_INTENTOS (wrangler.jsonc) limita por IP las comprobaciones de contraseña. Las
// credenciales ya comprobadas se recuerdan en memoria y no cuentan, así que usar la app con normalidad no gasta intentos.

const REINO = "Quimica Industrial";
/** Usuario reservado para cerrar sesión (nunca es una cuenta real: no se compara con USUARIOS ni gasta intentos). */
export const SALIR = "__salir";
// Cabeceras de seguridad de TODAS las respuestas (única fuente: no hay archivo _headers). Sin 'unsafe-inline': la app no
// usa style="" ni scripts en línea (lo comprueba tests/).
export const SEGURIDAD = {
  "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'; object-src 'none'",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "X-Robots-Tag": "noindex, nofollow",
  "Cache-Control": "private, no-store"
};

// Lo único que se sirve sin contraseña: el manifest y los iconos para instalar la app en el móvil (Android los descarga
// sin las credenciales del usuario). No contienen nada del contenido de la app. Rutas exactas, no prefijos.
export const PUBLICOS = new Set(["/manifest.webmanifest", "/iconos/icono.svg", "/iconos/icono-180.png", "/iconos/icono-192.png",
  "/iconos/icono-512.png", "/iconos/icono-maskable-512.png", "/favicon.ico"]);

/** Lee el secreto USUARIOS → Map(usuario en minúsculas → { nombre, clave }). La contraseña puede contener «:», pero no comas. */
export function leerUsuarios(texto) {
  const m = new Map();
  for (const linea of String(texto || "").split(/[\n,]/)) {
    const i = linea.indexOf(":");
    if (i < 1) continue;
    const u = linea.slice(0, i).trim(), c = linea.slice(i + 1).trim();
    if (u && c) m.set(u.toLowerCase(), { nombre: u, clave: c });
  }
  return m;
}

/** Decodifica la cabecera «Authorization: Basic …» (UTF-8). Devuelve [usuario, contraseña] o null. */
export function leerCredenciales(cabecera) {
  const m = /^Basic\s+([A-Za-z0-9+/=]+)$/i.exec(cabecera || "");
  if (!m) return null;
  try {
    const texto = new TextDecoder().decode(Uint8Array.from(atob(m[1]), ch => ch.charCodeAt(0)));
    const i = texto.indexOf(":");
    return i < 1 ? null : [texto.slice(0, i).trim().toLowerCase(), texto.slice(i + 1)];
  } catch { return null; }
}

const HEX = b => Array.from(new Uint8Array(b), x => x.toString(16).padStart(2, "0")).join("");
const sha256 = async s => HEX(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)));

/** Iteraciones para los hashes nuevos: ~2–3 ms de CPU, dentro del límite del plan gratuito de Workers (10 ms). */
export const ITERACIONES = 10000;
const FORMATO = /^pbkdf2-sha256\$(\d{1,7})\$((?:[0-9a-f]{2}){8,64})\$([0-9a-f]{64})$/;

/** PBKDF2-SHA256 de la contraseña con la sal (hex) → hex de 32 bytes. Igual que herramientas/generar_usuario.html. */
export async function derivar(clave, salHex, iteraciones) {
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(clave), "PBKDF2", false, ["deriveBits"]);
  const sal = Uint8Array.from(salHex.match(/../g), h => parseInt(h, 16));
  return HEX(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: sal, iterations: iteraciones }, k, 256));
}

/**
 * ¿La contraseña coincide con lo guardado en USUARIOS? Lo guardado es un hash «pbkdf2-sha256$iter$sal$hash» o, en el
 * formato antiguo, la contraseña en claro. Sin usuario (guardada = undefined) se hace el mismo trabajo y devuelve false,
 * para no revelar qué usuarios existen.
 */
export async function claveCorrecta(clave, guardada) {
  const m = FORMATO.exec(guardada ?? "");
  if (m) return iguales(await derivar(clave, m[2], +m[1]), m[3]);
  if (guardada === undefined) { await derivar(clave, "00".repeat(16), ITERACIONES); return false; }
  return iguales(clave, guardada);
}

/** Compara en tiempo constante (sobre los SHA-256, para que la longitud no dé pistas). */
async function iguales(a, b) {
  const h = async s => new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)));
  const [x, y] = await Promise.all([h(a), h(b)]);
  let dif = 0; for (let i = 0; i < x.length; i++) dif |= x[i] ^ y[i];
  return dif === 0;
}

function conCabeceras(resp, extra = {}) {
  const r = new Response(resp.body, resp);
  for (const [k, v] of Object.entries({ ...SEGURIDAD, ...extra })) r.headers.set(k, v);
  return r;
}

// Credenciales ya comprobadas en este proceso del Worker (huella de USUARIOS + cabecera): no repiten el hash ni cuentan
// como intento. Al cambiar el secreto USUARIOS la huella cambia, así que un usuario borrado deja de entrar al momento.
const VALIDADAS = new Set();

function pedirClave(mensaje) {
  return conCabeceras(new Response(mensaje, { status: 401, headers: { "Content-Type": "text/plain; charset=utf-8" } }),
    { "WWW-Authenticate": `Basic realm="${REINO}", charset="UTF-8"` });
}

export default {
  async fetch(peticion, env) {
    const usuarios = leerUsuarios(env.USUARIOS);
    if (!usuarios.size) return conCabeceras(new Response("Acceso cerrado: no hay usuarios autorizados configurados.",
      { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } }));

    if (PUBLICOS.has(new URL(peticion.url).pathname) && ["GET", "HEAD"].includes(peticion.method))
      return conCabeceras(await env.ASSETS.fetch(peticion), { "Cache-Control": "public, max-age=86400" });

    const cabecera = peticion.headers.get("Authorization"), cred = leerCredenciales(cabecera);
    // Cerrar sesión: /__salir acepta solo el usuario reservado (el navegador lo guarda en lugar del bueno); con él, el
    // resto de rutas vuelve a pedir la contraseña.
    if (new URL(peticion.url).pathname === "/__salir")
      return cred?.[0] === SALIR ? conCabeceras(new Response("Sesión cerrada.", { headers: { "Content-Type": "text/plain; charset=utf-8" } }))
        : pedirClave("Introduce tu usuario y contraseña.");
    if (cred?.[0] === SALIR) return pedirClave("Sesión cerrada. Introduce tu usuario y contraseña.");
    if (!cred) return pedirClave("Introduce tu usuario y contraseña.");
    const cuenta = usuarios.get(cred[0]);
    const huella = await sha256(String(env.USUARIOS) + "\n" + cabecera);
    if (!cuenta || !VALIDADAS.has(huella)) {
      // Cada comprobación de contraseña cuenta como intento para esta IP (también si el usuario no existe).
      if (env.LIMITE_INTENTOS) {
        const { success } = await env.LIMITE_INTENTOS.limit({ key: peticion.headers.get("CF-Connecting-IP") || "sin-ip" });
        if (!success) return conCabeceras(new Response("Demasiados intentos. Espera un minuto y vuelve a probar.",
          { status: 429, headers: { "Content-Type": "text/plain; charset=utf-8" } }), { "Retry-After": "60" });
      }
      // Se compara siempre (aunque el usuario no exista) para no revelar qué usuarios hay.
      const ok = await claveCorrecta(cred[1], cuenta?.clave);
      if (!cuenta || !ok) {
        await new Promise(r => setTimeout(r, 700)); // frena los intentos de adivinar contraseñas
        return pedirClave("Usuario o contraseña incorrectos.");
      }
      if (VALIDADAS.size > 1000) VALIDADAS.clear();
      VALIDADAS.add(huella);
    }
    // La app pregunta quién ha entrado para usar ese usuario directamente (una sola pantalla de acceso).
    if (new URL(peticion.url).pathname === "/__usuario")
      return conCabeceras(Response.json({ usuario: cuenta.nombre }));
    return conCabeceras(await env.ASSETS.fetch(peticion));
  }
};
