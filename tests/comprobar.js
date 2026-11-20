// Comprobación automática de la app: node tests/comprobar.js
// Requiere Playwright con Chromium (preinstalado en el entorno de Claude Code; en la CI lo instala .github/workflows/).
// Cada parte está en tests/partes/ y añade los fallos a `ctx.problemas`:
//   login        login local, migración de hashes, novedades, importar progreso
//   datos        formato de preguntas y novedades, numéricas (200 muestras), lector de números
//   estructura   archivos: sin PDFs en git, sin recursos externos ni código dinámico, unidades enlazadas en index.html
//   respuestas   responde en el navegador todas las preguntas de cada UD (100 % de aciertos y «Explicación»)
//   navegacion   móvil: menú, Test por temas, Examen con cronómetro, diálogo de abandonar ronda, Ajustes
//   cloudflare   modo Cloudflare con las cabeceras reales del worker (CSP sin 'unsafe-inline'), manifest
//   worker       control de acceso de worker.mjs y cabeceras en todas las respuestas
// El azar de la app (Math.random) sale de una semilla: si algo falla, SEMILLA=<n> node tests/comprobar.js lo repite.
const { chromium } = require("playwright");
const { nuevoContexto } = require("./partes/comun");

const PARTES = ["login", "datos", "estructura", "respuestas", "navegacion", "cloudflare", "worker"];

(async () => {
  const semilla = Number(process.env.SEMILLA) || Math.floor(Math.random() * 1e9);
  const navegador = await chromium.launch();
  const ctx = { navegador, semilla, problemas: [], errores: [], resumen: [] };
  ctx.nuevaPagina = async (opciones = {}, etiqueta = "") => {
    const c = await nuevoContexto(navegador, semilla, opciones), pagina = await c.newPage();
    pagina.on("pageerror", e => ctx.errores.push((etiqueta && etiqueta + ": ") + e.message));
    pagina.on("console", m => m.type() === "error" && ctx.errores.push((etiqueta && etiqueta + ": ") + m.text()));
    return pagina;
  };
  try {
    for (const parte of PARTES) {
      const antes = ctx.problemas.length;
      try { await require(`./partes/${parte}`)(ctx); }
      catch (e) { ctx.problemas.push(`${parte}: la comprobación se interrumpió: ${e.stack || e}`); }
      ctx.resumen.push(`${ctx.problemas.length === antes ? "✔" : "✘"} ${parte}`);
    }
  } finally { await navegador.close(); }

  console.log(ctx.resumen.join("\n"));
  const todo = [...ctx.problemas, ...ctx.errores.map(e => "consola: " + e)];
  if (todo.length) {
    console.error(`❌ Problemas (semilla ${semilla}; repítelo con SEMILLA=${semilla} node tests/comprobar.js):\n` + todo.join("\n"));
    process.exit(1);
  }
  console.log(`✅ Todo correcto (semilla ${semilla})`);
})();
