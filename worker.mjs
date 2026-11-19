// Control de acceso de la app en Cloudflare (sin tarjeta): pide usuario y contraseña (HTTP Basic) antes de servir nada.
// Solo se usa en Cloudflare; en local (abrir index.html) no interviene. Ver docs/despliegue_cloudflare.md.
//
// Usuarios autorizados: secreto USUARIOS del Worker (Settings → Variables and Secrets → tipo Secret), una persona por
// línea o separadas por comas:   ana:una-contraseña-larga, luis:otra-contraseña
// Aceptar a alguien = añadir su línea; denegar = borrarla. Sin USUARIOS no entra nadie (falla cerrado).

const REINO = "Quimica Industrial";
const SEGURIDAD = {
  "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
  "X-Robots-Tag": "noindex, nofollow",
  "Cache-Control": "private, no-store"
};

/** Lee el secreto USUARIOS → Map(usuario → contraseña). La contraseña puede contener «:», pero no comas. */
export function leerUsuarios(texto) {
  const m = new Map();
  for (const linea of String(texto || "").split(/[\n,]/)) {
    const i = linea.indexOf(":");
    if (i < 1) continue;
    const u = linea.slice(0, i).trim(), c = linea.slice(i + 1).trim();
    if (u && c) m.set(u.toLowerCase(), c);
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

function pedirClave(mensaje) {
  return conCabeceras(new Response(mensaje, { status: 401, headers: { "Content-Type": "text/plain; charset=utf-8" } }),
    { "WWW-Authenticate": `Basic realm="${REINO}", charset="UTF-8"` });
}

export default {
  async fetch(peticion, env) {
    const usuarios = leerUsuarios(env.USUARIOS);
    if (!usuarios.size) return conCabeceras(new Response("Acceso cerrado: no hay usuarios autorizados configurados.",
      { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } }));

    const cred = leerCredenciales(peticion.headers.get("Authorization"));
    const esperada = cred && usuarios.get(cred[0]);
    // Se compara siempre (aunque el usuario no exista) para no revelar qué usuarios hay.
    const ok = await iguales(cred ? cred[1] : "", esperada ?? "\u0000sin-usuario");
    if (!cred || esperada === undefined || !ok) {
      if (cred) await new Promise(r => setTimeout(r, 700)); // frena los intentos de adivinar contraseñas
      return pedirClave("Usuario o contraseña incorrectos.");
    }
    return conCabeceras(await env.ASSETS.fetch(peticion));
  }
};
