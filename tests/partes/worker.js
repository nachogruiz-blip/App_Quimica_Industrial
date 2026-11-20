// Control de acceso en Cloudflare (worker.mjs): sin usuarios → 503; sin clave o clave mala → 401; clave buena → la app.
// Solo el manifest y los iconos (rutas exactas, GET/HEAD) se sirven sin contraseña. Todas las respuestas llevan cabeceras.
const { cargarWorker } = require("./comun");

module.exports = async ctx => {
  const w = await cargarWorker(), mal = e => ctx.problemas.push("acceso: " + e);
  const assets = { fetch: async () => new Response("app") };
  const pedir = (usuarios, { cred = null, ruta = "/", metodo = "GET" } = {}) => w.default.fetch(new Request("https://x" + ruta, {
    method: metodo, headers: cred ? { Authorization: "Basic " + Buffer.from(cred).toString("base64") } : {} }), { USUARIOS: usuarios, ASSETS: assets });
  const revisarCabeceras = (r, caso) => {
    for (const [k, v] of Object.entries(w.SEGURIDAD)) if (k !== "Cache-Control" && r.headers.get(k) !== v) mal(`${caso}: falta la cabecera ${k}`);
  };

  for (const [u, cred, esperado] of [["", "ana:x", 503], ["ana:clave-1", null, 401], ["ana:clave-1", "ana:mala", 401],
    ["ana:clave-1", "pepe:clave-1", 401], ["ana:clave-1", "ana:clave-1", 200], ["ana:a:b ñ, Luis:z", "LUIS:z", 200], ["ana:a:b ñ, Luis:z", "ana:a:b ñ", 200]]) {
    const r = await pedir(u, { cred });
    if (r.status !== esperado) mal(`USUARIOS=«${u}» y ${cred} da ${r.status}, se esperaba ${esperado}`);
    revisarCabeceras(r, `respuesta ${r.status}`);
  }
  for (const [u, ruta, metodo, esperado] of [["ana:1", "/manifest.webmanifest", "GET", 200], ["ana:1", "/iconos/icono-192.png", "GET", 200],
    ["ana:1", "/iconos/../index.html", "GET", 401], ["ana:1", "/iconos/", "GET", 401], ["ana:1", "/datos/tsf_ud5.js", "GET", 401],
    ["ana:1", "/manifest.webmanifest", "POST", 401], ["", "/manifest.webmanifest", "GET", 503]]) {
    const r = await pedir(u, { ruta, metodo });
    if (r.status !== esperado) mal(`${metodo} ${ruta} sin contraseña da ${r.status}, se esperaba ${esperado}`);
    revisarCabeceras(r, `${metodo} ${ruta}`);
  }
  const yo = await pedir("ana:clave-1", { cred: "ana:clave-1", ruta: "/__usuario" });
  if ((await yo.json()).usuario !== "ana") mal("/__usuario no devuelve el usuario que ha entrado");
  if (/unsafe-inline|unsafe-eval/.test(w.SEGURIDAD["Content-Security-Policy"])) mal("la CSP no debe permitir 'unsafe-inline' ni 'unsafe-eval'");
};
