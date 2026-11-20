// Control de acceso en Cloudflare (worker.mjs): sin usuarios → 503; sin clave o clave mala → 401; clave buena → la app.
// Contraseñas con hash (herramientas/generar_usuario.html) o en claro (formato antiguo). Límite de intentos por IP.
// Solo el manifest y los iconos (rutas exactas, GET/HEAD) se sirven sin contraseña. Todas las respuestas llevan cabeceras.
const fs = require("fs"), path = require("path");
const { RAIZ, URL_LOCAL, cargarWorker } = require("./comun");

/** Límite de intentos falso, como el binding de Cloudflare: { success } y cuenta las llamadas por clave. */
function limitador(maximo) {
  const cuenta = new Map();
  return { cuenta, async limit({ key }) { const n = (cuenta.get(key) || 0) + 1; cuenta.set(key, n); return { success: n <= maximo }; } };
}

module.exports = async ctx => {
  const w = await cargarWorker(), mal = e => ctx.problemas.push("acceso: " + e);
  const assets = { fetch: async () => new Response("app") };
  const pedir = (usuarios, { cred = null, ruta = "/", metodo = "GET", ip = "1.2.3.4", limite } = {}) => w.default.fetch(
    new Request("https://x" + ruta, { method: metodo, headers: { "CF-Connecting-IP": ip,
      ...(cred ? { Authorization: "Basic " + Buffer.from(cred).toString("base64") } : {}) } }),
    { USUARIOS: usuarios, ASSETS: assets, ...(limite ? { LIMITE_INTENTOS: limite } : {}) });
  const revisarCabeceras = (r, caso) => {
    for (const [k, v] of Object.entries(w.SEGURIDAD)) if (k !== "Cache-Control" && r.headers.get(k) !== v) mal(`${caso}: falta la cabecera ${k}`);
  };

  // Línea con hash, calculada como herramientas/generar_usuario.html.
  const sal = "0123456789abcdef0123456789abcdef";
  const hashAna = `ana:pbkdf2-sha256$${w.ITERACIONES}$${sal}$${await w.derivar("clave-larga-1", sal, w.ITERACIONES)}`;

  for (const [u, cred, esperado] of [["", "ana:x", 503], ["ana:clave-1", null, 401], ["ana:clave-1", "ana:mala", 401],
    ["ana:clave-1", "pepe:clave-1", 401], ["ana:clave-1", "ana:clave-1", 200], ["ana:a:b ñ, Luis:z", "LUIS:z", 200], ["ana:a:b ñ, Luis:z", "ana:a:b ñ", 200],
    [hashAna, "ana:clave-larga-1", 200], [hashAna, "ANA:clave-larga-1", 200], [hashAna, "ana:clave-larga-2", 401],
    [hashAna, "ana:" + hashAna.slice(4), 401], [hashAna + "\nluis:otra-1", "luis:otra-1", 200], [hashAna + "\nluis:otra-1", "luis:clave-larga-1", 401],
    ["ana:pbkdf2-sha256$10$zz$00", "ana:x", 401]]) {
    const r = await pedir(u, { cred });
    if (r.status !== esperado) mal(`USUARIOS=«${u.slice(0, 40)}…» y ${cred} da ${r.status}, se esperaba ${esperado}`);
    revisarCabeceras(r, `respuesta ${r.status}`);
  }
  for (const [u, ruta, metodo, esperado] of [["ana:1", "/manifest.webmanifest", "GET", 200], ["ana:1", "/iconos/icono-192.png", "GET", 200],
    ["ana:1", "/iconos/../index.html", "GET", 401], ["ana:1", "/iconos/", "GET", 401], ["ana:1", "/datos/tsf_ud5.js", "GET", 401],
    ["ana:1", "/manifest.webmanifest", "POST", 401], ["", "/manifest.webmanifest", "GET", 503]]) {
    const r = await pedir(u, { ruta, metodo });
    if (r.status !== esperado) mal(`${metodo} ${ruta} sin contraseña da ${r.status}, se esperaba ${esperado}`);
    revisarCabeceras(r, `${metodo} ${ruta}`);
  }
  const yo = await pedir(hashAna, { cred: "ana:clave-larga-1", ruta: "/__usuario" });
  if ((await yo.json()).usuario !== "ana") mal("/__usuario no devuelve el usuario que ha entrado");
  if (/unsafe-inline|unsafe-eval/.test(w.SEGURIDAD["Content-Security-Policy"])) mal("la CSP no debe permitir 'unsafe-inline' ni 'unsafe-eval'");

  // Límite de intentos: tras 3 comprobaciones fallidas desde una IP, 429 (también con la contraseña buena); otra IP sigue.
  {
    const lim = limitador(3), usuarios = hashAna + "\nlimite:otra-clave-9";
    for (let i = 0; i < 3; i++) await pedir(usuarios, { cred: "limite:mala-" + i, ip: "9.9.9.9", limite: lim });
    const r = await pedir(usuarios, { cred: "limite:otra-clave-9", ip: "9.9.9.9", limite: lim });
    if (r.status !== 429) mal(`tras agotar los intentos una IP recibe ${r.status}, se esperaba 429`);
    revisarCabeceras(r, "respuesta 429");
    if (r.headers.get("Retry-After") !== "60") mal("la respuesta 429 no lleva Retry-After");
    if ((await pedir(usuarios, { cred: "limite:otra-clave-9", ip: "8.8.8.8", limite: lim })).status !== 200) mal("el límite de una IP bloquea a otra");
    // Uso normal: las credenciales ya comprobadas no gastan intentos (una página carga muchos archivos).
    const lim2 = limitador(3);
    for (let i = 0; i < 10; i++) {
      const s = (await pedir(usuarios, { cred: "ANA:clave-larga-1", ip: "7.7.7.7", limite: lim2 })).status;
      if (s !== 200) { mal(`uso normal: la petición ${i + 1} da ${s} (las credenciales comprobadas no deben contar)`); break; }
    }
    if ((lim2.cuenta.get("7.7.7.7") || 0) > 1) mal(`uso normal: ${lim2.cuenta.get("7.7.7.7")} intentos gastados, se esperaba 1`);
    // Al cambiar el secreto USUARIOS (p. ej. quitar a alguien), sus credenciales recordadas dejan de valer.
    if ((await pedir("limite:otra-clave-9", { cred: "ANA:clave-larga-1" })).status !== 401) mal("un usuario quitado de USUARIOS sigue entrando");
  }

  // wrangler.jsonc declara el binding del límite de intentos.
  const wr = JSON.parse(fs.readFileSync(path.join(RAIZ, "wrangler.jsonc"), "utf8").replace(/^\s*\/\/.*$/gm, ""));
  if (!(wr.ratelimits || []).some(b => b.name === "LIMITE_INTENTOS" && b.simple?.limit > 0)) mal("wrangler.jsonc no declara el binding LIMITE_INTENTOS");

  // La herramienta del administrador genera líneas que el worker acepta.
  const h = await ctx.nuevaPagina({}, "generar_usuario");
  await h.goto(URL_LOCAL.replace("index.html", "herramientas/generar_usuario.html"));
  await h.fill("#usuario", "Marta"); await h.fill("#clave", "corta"); await h.click("#generar");
  if (!(await h.textContent("#error"))) mal("generar_usuario: acepta una contraseña de menos de 12 caracteres");
  await h.click("#aleatoria");
  const clave = await h.inputValue("#clave");
  await h.click("#generar"); await h.waitForFunction(() => document.getElementById("linea").value);
  const linea = await h.inputValue("#linea");
  if (linea.includes(clave)) mal("generar_usuario: la línea contiene la contraseña");
  if ((await pedir(linea, { cred: "marta:" + clave })).status !== 200) mal("generar_usuario: el worker no acepta la línea generada");
  if ((await pedir(linea, { cred: "marta:" + clave + "x" })).status !== 401) mal("generar_usuario: el worker acepta otra contraseña");
  await h.context().close();
};
