// Perfiles locales con usuario y contraseña. Todo vive en el navegador (localStorage): no hay servidor.
// Sirve para que varias personas usen el mismo dispositivo con su propio progreso. NO protege el contenido de la app
// (es pública) ni es seguridad fuerte: quien tenga acceso al dispositivo puede leer localStorage.
// La contraseña nunca se guarda: solo un hash con sal (PBKDF2 si el navegador lo permite; si no, SHA-256 iterado).
"use strict";
const USUARIOS = "qi-usuarios", SESION = "qi-sesion", PROGRESO = "qi-progreso-v1", INVITADO = "~invitado";

const almacen = {
  leer(k, def) { try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch { return def; } },
  escribir(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } }
};

// SHA-256 en JS puro (respaldo para navegadores sin crypto.subtle). Devuelve hex.
function sha256(texto) {
  const K = [], H = [];
  const primo = n => { for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
  for (let n = 2, i = 0; i < 64; n++) if (primo(n)) { if (i < 8) H[i] = (Math.pow(n, 1 / 2) % 1) * 2 ** 32 | 0; K[i++] = (Math.pow(n, 1 / 3) % 1) * 2 ** 32 | 0; }
  const b = Array.from(new TextEncoder().encode(texto)), l = b.length * 8;
  b.push(0x80); while (b.length % 64 !== 56) b.push(0);
  for (let i = 7; i >= 0; i--) b.push(i > 3 ? 0 : (l >>> (i * 8)) & 255);
  const r = (x, n) => (x >>> n) | (x << (32 - n));
  for (let o = 0; o < b.length; o += 64) {
    const w = [];
    for (let i = 0; i < 64; i++) w[i] = i < 16 ? (b[o + 4 * i] << 24 | b[o + 4 * i + 1] << 16 | b[o + 4 * i + 2] << 8 | b[o + 4 * i + 3])
      : (w[i - 16] + (r(w[i - 15], 7) ^ r(w[i - 15], 18) ^ (w[i - 15] >>> 3)) + w[i - 7] + (r(w[i - 2], 17) ^ r(w[i - 2], 19) ^ (w[i - 2] >>> 10))) | 0;
    let [a, bb, c, d, e, f, g, h] = H;
    for (let i = 0; i < 64; i++) {
      const t1 = (h + (r(e, 6) ^ r(e, 11) ^ r(e, 25)) + ((e & f) ^ (~e & g)) + K[i] + w[i]) | 0;
      const t2 = ((r(a, 2) ^ r(a, 13) ^ r(a, 22)) + ((a & bb) ^ (a & c) ^ (bb & c))) | 0;
      [h, g, f, e, d, c, bb, a] = [g, f, e, (d + t1) | 0, c, bb, a, (t1 + t2) | 0];
    }
    [a, bb, c, d, e, f, g, h].forEach((v, i) => H[i] = (H[i] + v) | 0);
  }
  return H.map(v => (v >>> 0).toString(16).padStart(8, "0")).join("");
}

// Iteraciones de PBKDF2-SHA256 por algoritmo guardado. «pbkdf2» (100 000) es el de los perfiles antiguos: se sigue
// aceptando y se actualiza al entrar. Los nuevos usan 600 000 (recomendación actual de OWASP).
const ITERACIONES = { "pbkdf2": 100000, "pbkdf2-600k": 600000 };
async function hashClave(clave, sal, alg) {
  if (ITERACIONES[alg]) {
    const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(clave), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: new TextEncoder().encode(sal), iterations: ITERACIONES[alg] }, k, 256);
    return Array.from(new Uint8Array(bits), x => x.toString(16).padStart(2, "0")).join("");
  }
  let h = sal + clave; for (let i = 0; i < 2000; i++) h = sha256(h + sal); return h;
}
// Respaldo sha256x2000: solo si no hay crypto.subtle (página servida por http sin cifrar, p. ej. una IP de la red local).
const algDisponible = () => (window.crypto && crypto.subtle ? "pbkdf2-600k" : "sha256x2000");

const normalizar = n => n.trim().toLowerCase();
const nombreValido = n => /^[\p{L}\p{N}_.-]{2,30}$/u.test(n.trim());

// En Cloudflare, worker.mjs ya ha pedido usuario y contraseña: la app usa ese usuario y no muestra su propio login.
// En local (index.html abierto como archivo) no hay worker y se usa el login local de abajo.
let USUARIO_REMOTO = null;
async function detectarUsuarioRemoto() {
  if (!/^https?:$/.test(location.protocol)) return null;
  try {
    const r = await fetch("/__usuario", { cache: "no-store", credentials: "same-origin" });
    const d = r.ok ? await r.json() : null;
    if (d && typeof d.usuario === "string" && d.usuario.trim()) {
      USUARIO_REMOTO = d.usuario.trim().slice(0, 40);
      const antiguo = almacen.leer(PROGRESO, null), clave = claveProgreso();
      if (antiguo && !almacen.leer(clave, null)) { almacen.escribir(clave, antiguo); try { localStorage.removeItem(PROGRESO); } catch {} }
    }
  } catch { /* sin worker (p. ej. otro servidor): login local */ }
  return USUARIO_REMOTO;
}

function usuarioActual() {
  if (USUARIO_REMOTO) return { id: "cf:" + USUARIO_REMOTO.toLowerCase(), nombre: USUARIO_REMOTO, remoto: true };
  let u = null;
  try { u = sessionStorage.getItem(SESION) || localStorage.getItem(SESION); } catch {}
  if (u === INVITADO) return { id: INVITADO, nombre: "Invitado" };
  const lista = almacen.leer(USUARIOS, {});
  return u && lista[u] ? { id: u, nombre: lista[u].nombre } : null;
}
function abrirSesion(id, recordar) {
  try { sessionStorage.setItem(SESION, id); if (recordar) localStorage.setItem(SESION, id); else localStorage.removeItem(SESION); } catch {}
}
function cerrarSesion() { try { sessionStorage.removeItem(SESION); localStorage.removeItem(SESION); } catch {} }

/** Crea un usuario. Devuelve un mensaje de error o null. El primer usuario hereda el progreso anterior a los perfiles. */
async function registrar(nombre, clave) {
  if (!nombreValido(nombre)) return "El usuario debe tener 2–30 letras, números, «.», «-» o «_».";
  if (clave.length < 4) return "La contraseña debe tener al menos 4 caracteres.";
  const lista = almacen.leer(USUARIOS, {}), id = normalizar(nombre);
  if (lista[id]) return "Ese usuario ya existe en este navegador.";
  const sal = Array.from(crypto.getRandomValues(new Uint8Array(16)), x => x.toString(16).padStart(2, "0")).join("");
  const alg = algDisponible();
  lista[id] = { nombre: nombre.trim(), sal, alg, hash: await hashClave(clave, sal, alg) };
  if (!almacen.escribir(USUARIOS, lista)) return "No se puede guardar en este navegador (¿modo privado?).";
  const antiguo = almacen.leer(PROGRESO, null);
  if (antiguo && Object.keys(lista).length === 1) { almacen.escribir(`${PROGRESO}:${id}`, antiguo); try { localStorage.removeItem(PROGRESO); } catch {} }
  return null;
}
/** Comprueba usuario y contraseña. Devuelve el id o null. */
async function entrar(nombre, clave) {
  const lista = almacen.leer(USUARIOS, {}), id = normalizar(nombre), u = lista[id];
  if (!u || (await hashClave(clave, u.sal, u.alg)) !== u.hash) return null;
  const alg = algDisponible();
  if (u.alg !== alg && alg !== "sha256x2000") { // perfil con un hash más débil: se rehace con el actual
    lista[id] = { ...u, alg, hash: await hashClave(clave, u.sal, alg) }; almacen.escribir(USUARIOS, lista);
  }
  return id;
}

// Progreso del usuario con sesión abierta
const claveProgreso = () => `${PROGRESO}:${(usuarioActual() || { id: INVITADO }).id}`;
function cargar() { return almacen.leer(claveProgreso(), {}) || {}; }
function guardar(p) { almacen.escribir(claveProgreso(), p); }

/** Mezcla un progreso importado con el actual: por pregunta se queda con el registro con más intentos. */
function mezclarProgreso(actual, importado) {
  const r = { ...actual };
  for (const [id, x] of Object.entries(importado || {})) {
    if (!x || typeof x !== "object" || !Number.isFinite(x.a) || !Number.isFinite(x.f)) continue;
    const limpio = { a: Math.max(0, x.a | 0), f: Math.max(0, x.f | 0), ultimo: !!x.ultimo };
    if (!r[id] || limpio.a + limpio.f > r[id].a + r[id].f) r[id] = limpio;
  }
  return r;
}
