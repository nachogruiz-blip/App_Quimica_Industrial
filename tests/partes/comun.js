// Utilidades compartidas por las partes de tests/comprobar.js.
const path = require("path");

const RAIZ = path.resolve(__dirname, "..", "..");
const URL_LOCAL = "file://" + path.join(RAIZ, "index.html");

/**
 * Sustituye Math.random de la página por un generador con semilla (mulberry32). La semilla se mezcla con la URL de
 * carga para que cada página tenga su propia secuencia, pero repetible con la misma SEMILLA.
 */
const azarConSemilla = semilla => `(() => {
  let h = ${semilla >>> 0};
  for (const c of location.href) h = Math.imul(h ^ c.charCodeAt(0), 2654435761) >>> 0;
  Math.random = () => {
    h = (h + 0x6D2B79F5) >>> 0;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
})();`;

async function nuevoContexto(navegador, semilla, opciones) {
  const c = await navegador.newContext(opciones);
  await c.addInitScript({ content: azarConSemilla(semilla) });
  return c;
}

/** Carga worker.mjs (módulo ES) desde CommonJS. */
const cargarWorker = () => import("file://" + path.join(RAIZ, "worker.mjs"));

/** Cierra el recuadro de novedades si está abierto. */
async function cerrarNovedades(p) { if (await p.$("#novedades-ok")) await p.click("#novedades-ok"); }

/** Responde a la pregunta en pantalla con la respuesta correcta (o con «1» si `mal`). */
async function responder(p, mal = false) {
  const q = await p.evaluate(() => ({ tipo: __actual.q.tipo, correcta: __actual.q.correcta,
    sol: __actual.q.tipo === "numerica" ? __actual.q.resolver(__actual.v) : null }));
  if (q.tipo === "numerica") { await p.fill("#resp", mal ? "1" : String(q.sol).replace(".", ",")); await p.click("#f-num button"); }
  else await p.click(mal ? ".opcion" : `.opcion[data-k="${q.correcta}"]`);
}

module.exports = { RAIZ, URL_LOCAL, nuevoContexto, cargarWorker, cerrarNovedades, responder };
