// Comprobación automática de la app: node tests/comprobar.js
// Requiere Playwright con Chromium (preinstalado en el entorno de Claude Code; si no: npm i -D playwright && npx playwright install chromium).
// 1) Valida el formato de todas las preguntas y muestrea 200 veces cada numérica.
// 2) Responde en el navegador todas las preguntas de cada UD con la solución correcta y exige 100 % de aciertos.
const path = require("path");
const { chromium } = require("playwright");
const URL = "file://" + path.resolve(__dirname, "..", "index.html");

(async () => {
  const navegador = await chromium.launch();
  const p = await navegador.newPage();
  const errores = [];
  p.on("pageerror", e => errores.push(e.message));
  p.on("console", m => m.type() === "error" && errores.push(m.text()));
  await p.goto(URL);

  const problemas = await p.evaluate(() => {
    const mal = [], ids = new Set();
    for (const ud of UNIDADES) {
      if (!MODULOS.some(m => m.id === ud.modulo)) mal.push(`${ud.id}: módulo desconocido ${ud.modulo}`);
      for (const q of ud.preguntas) {
        const t = `${ud.id}/${q.id}`;
        if (ids.has(q.id)) mal.push(`${t}: id duplicado`); ids.add(q.id);
        if (!q.enunciado || !q.explicacion) mal.push(`${t}: falta enunciado o explicación`);
        if (q.seccion && !ud.guia[q.seccion - 1]) mal.push(`${t}: sección ${q.seccion} no existe`);
        if (q.tipo === "test" && !(q.correcta >= 0 && q.correcta < q.opciones.length)) mal.push(`${t}: correcta fuera de rango`);
        if (q.tipo === "vf" && typeof q.correcta !== "boolean") mal.push(`${t}: correcta no booleana`);
        if (q.tipo === "numerica") for (let i = 0; i < 200; i++) {
          const v = {};
          for (const [k, [a, b, s]] of Object.entries(q.variables)) v[k] = a + s * Math.floor(Math.random() * (Math.round((b - a) / s) + 1));
          const sol = q.resolver(v), e = typeof q.explicacion === "function" ? q.explicacion(v) : q.explicacion;
          if (!isFinite(sol)) { mal.push(`${t}: solución no finita con ${JSON.stringify(v)}`); break; }
          if (/NaN|undefined|Infinity/.test(e)) { mal.push(`${t}: explicación con NaN/undefined`); break; }
          if (q.enunciado.replace(/\{(\w+)\}/g, (_, k) => k in v ? "" : "¿?").includes("¿?")) { mal.push(`${t}: variable del enunciado sin definir`); break; }
        }
      }
    }
    return mal;
  });

  const resumen = [];
  const uds = await p.evaluate(() => UNIDADES.map(u => [u.id, u.preguntas.length]));
  for (const [id, n] of uds) {
    // Modo práctica toma hasta 20 preguntas al azar: repetimos rondas hasta cubrirlas todas.
    const vistas = new Set();
    for (let ronda = 0; ronda < 30 && vistas.size < n; ronda++) {
      await p.goto(`${URL}#/ud/${id}/practicar?r=${ronda}`);
      await p.waitForSelector(".card b");
      for (;;) {
        const { q, v } = await p.evaluate(() => ({ q: { id: __actual.q.id, tipo: __actual.q.tipo, correcta: __actual.q.correcta,
          sol: __actual.q.tipo === "numerica" ? __actual.q.resolver(__actual.v) : null } }));
        vistas.add(q.id);
        if (q.tipo === "numerica") { await p.fill("#resp", String(q.sol).replace(".", ",")); await p.click("#f-num button"); }
        else await p.click(`.opcion[data-k="${q.correcta}"]`);
        const fb = await p.textContent("#fb");
        if (!fb.includes("Correcto") || fb.includes("Incorrecto")) problemas.push(`${id}/${q.id}: la respuesta correcta se marcó como fallo`);
        const ultima = (await p.textContent("#sig")).includes("resultado");
        await p.click("#sig");
        if (ultima) break;
      }
    }
    resumen.push(`${id}: ${vistas.size}/${n} preguntas respondidas en el navegador`);
  }
  for (const vista of ["guia", "examen", "fallos"]) { await p.goto(`${URL}#/ud/${uds[0][0]}/${vista}`); await p.waitForTimeout(100); }
  await p.goto(URL);

  await navegador.close();
  console.log(resumen.join("\n"));
  const todo = [...problemas, ...errores.map(e => "consola: " + e)];
  if (todo.length) { console.error("❌ Problemas:\n" + todo.join("\n")); process.exit(1); }
  console.log("✅ Todo correcto");
})();
