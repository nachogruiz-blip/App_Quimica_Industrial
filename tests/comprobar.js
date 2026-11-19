// Comprobación automática de la app: node tests/comprobar.js
// Requiere Playwright con Chromium (preinstalado en el entorno de Claude Code; si no: npm i -D playwright && npx playwright install chromium).
// 1) Login local (crear usuario, contraseña incorrecta, invitado, importar progreso) y recuadro de novedades.
// 2) Formato de preguntas y novedades; muestrea 200 veces cada numérica.
// 3) Responde en el navegador todas las preguntas de cada UD (exige 100 % de aciertos y el desplegable «Explicación»).
// 4) Navegación en móvil (Estudio, Examen, Test, Ajustes), Test por temas, Examen con cronómetro, modo noche.
// 5) Modo Cloudflare (una sola pantalla de acceso) y control de acceso de worker.mjs.
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

  // Login local: crear usuario, contraseña incorrecta, salir, invitado, volver a entrar (deja la sesión abierta para el resto).
  const fallosLogin = [];
  const login = async (u, c) => { await p.fill("#l-usuario", u); await p.fill("#l-clave", c); await p.click("#l-entrar");
    await p.waitForFunction(() => document.querySelector(".barra-prog") || document.getElementById("l-error")?.textContent); };
  if (!(await p.$("#f-login"))) fallosLogin.push("sin sesión no aparece el login");
  await login("prueba", "clave-1");
  if (!(await p.$(".card .barra-prog"))) fallosLogin.push("no entra tras crear usuario");
  const cerrarNovedades = async () => { if (await p.$("#novedades-ok")) await p.click("#novedades-ok"); };
  if (!(await p.$("#novedades"))) fallosLogin.push("al entrar por primera vez no salen las novedades");
  await cerrarNovedades();
  await p.reload(); await p.waitForSelector(".barra-prog");
  if (await p.$("#novedades")) fallosLogin.push("las novedades vuelven a salir después de cerrarlas");
  if (!(await p.textContent("#usuario-barra")).includes("prueba")) fallosLogin.push("la barra no muestra el usuario");
  await p.evaluate(() => { const ud = UNIDADES[0]; guardar({ [ud.preguntas[0].id]: { a: 1, f: 0, ultimo: true } }); });
  await p.click("#salir");
  await login("prueba", "mala");
  if (!(await p.textContent("#l-error")).includes("incorrectos")) fallosLogin.push("acepta una contraseña incorrecta");
  await p.click("#l-invitado"); await p.waitForSelector(".barra-prog"); await cerrarNovedades();
  if ((await p.evaluate(() => Object.keys(cargar()).length)) !== 0) fallosLogin.push("el invitado ve el progreso de otro usuario");
  await p.click("#salir");
  await login("Prueba", "clave-1");
  if ((await p.evaluate(() => Object.keys(cargar()).length)) !== 1) fallosLogin.push("al volver a entrar no recupera su progreso");
  if (await p.$("#novedades")) fallosLogin.push("salen novedades ya vistas por este usuario");
  await p.goto(URL + "#/ud/tsf-ud5/guia?s=3"); await p.waitForSelector("#sec-3");
  if (!(await p.$eval("#sec-3", e => e.open)) || (await p.$eval("#sec-1", e => e.open))) fallosLogin.push("la guía no abre la sección pedida (?s=3)");
  const mezcla = await p.evaluate(() => JSON.stringify(mezclarProgreso({ x: { a: 1, f: 0, ultimo: true } },
    { x: { a: 2, f: 1, ultimo: false }, y: { a: "<img>", f: 0 }, z: { a: 0, f: 1, ultimo: false } })));
  if (mezcla !== JSON.stringify({ x: { a: 2, f: 1, ultimo: false }, z: { a: 0, f: 1, ultimo: false } })) fallosLogin.push("importar progreso mezcla mal: " + mezcla);
  await p.evaluate(() => guardar({}));

  const problemas = await p.evaluate(() => {
    const mal = [], ids = new Set();
    const nov = window.NOVEDADES || [];
    if (!nov.length) mal.push("novedades: la lista está vacía");
    nov.forEach((n, i) => {
      if (!/^\d{4}-\d{2}-\d{2}(-\d+)?$/.test(n.id) || !n.titulo || !Array.isArray(n.puntos) || !n.puntos.length) mal.push(`novedades: entrada ${i} mal formada`);
      if (i && !(n.id < nov[i - 1].id)) mal.push(`novedades: «${n.id}» debe ir detrás (la más reciente primero, ids únicos)`);
    });
    for (const ud of UNIDADES) {
      if (!MODULOS.some(m => m.id === ud.modulo)) mal.push(`${ud.id}: módulo desconocido ${ud.modulo}`);
      ud.guia.forEach((s, i) => { if (!s.apuntes) mal.push(`${ud.id}: la sección ${i + 1} de la guía no tiene «apuntes»`); });
      for (const q of ud.preguntas) {
        const t = `${ud.id}/${q.id}`;
        if (ids.has(q.id)) mal.push(`${t}: id duplicado`); ids.add(q.id);
        if (!q.enunciado || !q.explicacion) mal.push(`${t}: falta enunciado o explicación`);
        if (!ud.guia[q.seccion - 1]) mal.push(`${t}: falta «seccion» o no existe la sección ${q.seccion}`);
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
    // Lectura de respuestas numéricas (coma decimal, punto de miles como lo muestra fmt)
    const casos = [["45.000", 45000], ["45000", 45000], ["1.234,5", 1234.5], ["0,025", 0.025], ["0.025", 0.025], ["-3,5", -3.5], ["2e-3", 0.002], ["1.500", 1.5]];
    for (const [txt, val] of casos) if (!leerNumero(txt).some(x => Math.abs(x - val) < 1e-12)) mal.push(`leerNumero("${txt}") no da ${val}`);
    for (const txt of ["", "abc", "12abc"]) if (leerNumero(txt).length) mal.push(`leerNumero("${txt}") debería rechazarse`);
    return mal;
  });
  problemas.push(...fallosLogin.map(e => "login: " + e));

  // Seguridad: sin PDFs en git, sin recursos externos ni código dinámico (la app es estática y pública).
  const fs = require("fs"), { execSync } = require("child_process");
  const raiz = path.resolve(__dirname, "..");
  try {
    const rastreados = execSync("git ls-files", { cwd: raiz }).toString().split("\n");
    for (const f of rastreados) if (/\.(pdf|docx?|pptx?|odt)$/i.test(f) || f.startsWith("materiales/")) problemas.push(`seguridad: material original en git: ${f}`);
  } catch { /* sin git: se omite */ }
  const fuentes = ["index.html", ...["js", "datos", "css"].flatMap(d => fs.readdirSync(path.join(raiz, d)).map(f => `${d}/${f}`))];
  for (const f of fuentes) {
    const txt = fs.readFileSync(path.join(raiz, f), "utf8");
    if (/<(script|link|img|iframe)[^>]+(src|href)=["']?(https?:)?\/\//i.test(txt)) problemas.push(`seguridad: ${f} carga un recurso externo`);
    if (/\beval\(|new Function\(|document\.write\(/.test(txt)) problemas.push(`seguridad: ${f} usa eval/Function/document.write`);
    if (/(api[_-]?key|token|password|secret)\s*[:=]\s*["'][^"']{8,}/i.test(txt)) problemas.push(`seguridad: ${f} parece contener una credencial`);
  }

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
        if (!(await p.$("#fb details.explicacion .donde a[target=_blank]"))) problemas.push(`${id}/${q.id}: falta el desplegable «Explicación» con dónde estudiarlo`);
        const ultima = (await p.textContent("#sig")).includes("resultado");
        await p.click("#sig");
        if (ultima) break;
      }
    }
    resumen.push(`${id}: ${vistas.size}/${n} preguntas respondidas en el navegador`);
  }
  for (const vista of ["guia", "examen", "fallos"]) { await p.goto(`${URL}#/ud/${uds[0][0]}/${vista}`); await p.waitForTimeout(100); }
  await p.goto(URL);

  // Navegación: 4 secciones (barra inferior en el móvil), elegir asignatura y temas en Test/Examen, Ajustes con tema.
  {
    const c = await navegador.newContext({ viewport: { width: 390, height: 844 } }), m = await c.newPage();
    m.on("pageerror", e => errores.push("móvil: " + e.message));
    m.on("dialog", d => d.accept());
    const responderAlgo = () => m.click(".opcion", { timeout: 500 }).catch(async () => { await m.fill("#resp", "1"); await m.click("#f-num button"); });
    await m.goto(URL); await m.click("#l-invitado"); await m.waitForSelector(".barra-prog");
    if (await m.$("#novedades-ok")) await m.click("#novedades-ok");
    const nav = await m.$$eval(".nav-principal a", as => as.map(a => a.lastChild.textContent.trim()));
    if (nav.join(",") !== "Estudio,Examen,Test,Ajustes") problemas.push("navegación: pestañas «" + nav.join(",") + "», se esperaban Estudio, Examen, Test y Ajustes");
    const abajo = await m.$eval(".nav-principal", n => getComputedStyle(n).position === "fixed" && Math.abs(n.getBoundingClientRect().bottom - innerHeight) < 2);
    if (!abajo) problemas.push("navegación: en el móvil la barra no está fija abajo");
    if (await m.evaluate(() => document.documentElement.scrollWidth > innerWidth)) problemas.push("móvil: la página se desborda a lo ancho");
    // Test de un tema concreto: solo el apartado 2, todas sus preguntas
    await m.click('a[data-nav="test"]'); await m.click('a.card[href="#/test/tsf"]'); await m.check('input[value="temas"]');
    await m.click(".tema summary");
    for (const c2 of await m.$$('input[name="sec"]')) if ((await c2.getAttribute("value")) !== "tsf-ud5#2") await c2.uncheck();
    await m.check('.segmentado input[value="0"]', { force: true }); await m.click("#empezar");
    const secciones = new Set();
    for (;;) {
      secciones.add(await m.evaluate(() => __actual.q.seccion));
      await responderAlgo();
      const ultima = (await m.textContent("#sig")).includes("resultado"); await m.click("#sig"); if (ultima) break;
    }
    if ([...secciones].join() !== "2") problemas.push("Test por temas: salen preguntas de los apartados " + [...secciones]);
    if (!(await m.$("#otra"))) problemas.push("Test: falta «Otra ronda» en el resultado");
    // Examen: cronómetro y sin corrección por pregunta
    await m.click('a[data-nav="examen"]'); await m.click('a.card[href="#/examen/tsf"]'); await m.click("#empezar");
    if (!(await m.$("#reloj"))) problemas.push("Examen: no se ve el cronómetro");
    await responderAlgo();
    if (await m.$("#fb .feedback")) problemas.push("Examen: corrige antes de terminar");
    // Ajustes: modo noche, exportar/importar
    await m.click('a[data-nav="ajustes"]'); await m.check('input[name="tema"][value="dark"]', { force: true });
    if ((await m.evaluate(() => document.documentElement.dataset.theme)) !== "dark") problemas.push("Ajustes: no cambia a modo noche");
    if (!(await m.$("#exportar")) || !(await m.$("#importar"))) problemas.push("Ajustes: faltan exportar/importar progreso");
    await c.close();
  }

  // Modo Cloudflare: el worker ya pidió la contraseña; la app usa ese usuario sin segundo login (simulado con page.route).
  {
    const c = await navegador.newContext(), q = await c.newPage(), fs2 = require("fs");
    q.on("pageerror", e => errores.push("modo Cloudflare: " + e.message));
    await q.route("http://app.test/**", ruta => {
      const ruta2 = new globalThis.URL(ruta.request().url()).pathname;
      if (ruta2 === "/__usuario") return ruta.fulfill({ json: { usuario: "Nacho" } });
      const f = path.join(__dirname, "..", ruta2 === "/" ? "index.html" : ruta2);
      return fs2.existsSync(f) ? ruta.fulfill({ path: f }) : ruta.fulfill({ status: 404 });
    });
    await q.goto("http://app.test/"); await q.waitForSelector(".barra-prog, #f-login");
    if (await q.$("#f-login")) problemas.push("modo Cloudflare: pide un segundo login");
    const barra = await q.textContent("#usuario-barra");
    if (!barra.includes("Nacho") || (await q.$("#salir"))) problemas.push("modo Cloudflare: la barra debe mostrar el usuario y no «Salir»");
    if (!(await q.$("#novedades"))) problemas.push("modo Cloudflare: no salen las novedades al entrar");
    // Instalar como app: manifest enlazado (solo en http) con iconos que existen
    if (!(await q.$('link[rel="manifest"]'))) problemas.push("instalar: en Cloudflare falta el enlace al manifest");
    try {
      const man = JSON.parse(fs2.readFileSync(path.join(__dirname, "..", "manifest.webmanifest"), "utf8"));
      for (const t of ["192x192", "512x512"]) if (!man.icons.some(i => i.sizes === t)) problemas.push(`instalar: falta icono ${t}`);
      for (const i of man.icons) if (!fs2.existsSync(path.join(__dirname, "..", i.src))) problemas.push(`instalar: no existe ${i.src}`);
      for (const i of man.icons) if (!(await import("file://" + path.resolve(__dirname, "..", "worker.mjs"))).PUBLICOS.has("/" + i.src)) problemas.push(`instalar: ${i.src} no está en PUBLICOS de worker.mjs`);
      if (!man.name || !man.start_url || man.display !== "standalone") problemas.push("instalar: manifest incompleto");
    } catch (e) { problemas.push("instalar: manifest.webmanifest no es JSON válido: " + e.message); }
    await c.close();
  }
  await navegador.close();

  // Control de acceso en Cloudflare (worker.mjs): sin usuarios → 503; sin clave o clave mala → 401; clave buena → la app.
  const w = await import("file://" + path.resolve(__dirname, "..", "worker.mjs"));
  const pedir = async (usuarios, cred) => (await w.default.fetch(new Request("https://x/", { headers: cred ?
    { Authorization: "Basic " + Buffer.from(cred).toString("base64") } : {} }), { USUARIOS: usuarios, ASSETS: { fetch: async () => new Response("app") } })).status;
  const casosW = [["", "ana:x", 503], ["ana:clave-1", null, 401], ["ana:clave-1", "ana:mala", 401], ["ana:clave-1", "pepe:clave-1", 401],
    ["ana:clave-1", "ana:clave-1", 200], ["ana:a:b ñ, Luis:z", "LUIS:z", 200], ["ana:a:b ñ, Luis:z", "ana:a:b ñ", 200]];
  const pedirRuta = async (usuarios, ruta, metodo = "GET") => (await w.default.fetch(new Request("https://x" + ruta, { method: metodo }),
    { USUARIOS: usuarios, ASSETS: { fetch: async () => new Response("x") } })).status;
  for (const [u, ruta, metodo, esperado] of [["ana:1", "/manifest.webmanifest", "GET", 200], ["ana:1", "/iconos/icono-192.png", "GET", 200],
    ["ana:1", "/iconos/../index.html", "GET", 401], ["ana:1", "/iconos/", "GET", 401], ["ana:1", "/datos/tsf_ud5.js", "GET", 401],
    ["ana:1", "/manifest.webmanifest", "POST", 401], ["", "/manifest.webmanifest", "GET", 503]]) {
    const r = await pedirRuta(u, ruta, metodo); if (r !== esperado) problemas.push(`acceso: ${metodo} ${ruta} sin contraseña da ${r}, se esperaba ${esperado}`);
  }
  for (const [u, c, esperado] of casosW) { const r = await pedir(u, c); if (r !== esperado) problemas.push(`acceso: USUARIOS=«${u}» y ${c} da ${r}, se esperaba ${esperado}`); }
  for (const f of ["worker.mjs", "docs", "tests", "*.md", ".git"]) if (!fs.readFileSync(path.join(raiz, ".assetsignore"), "utf8").split("\n").includes(f)) problemas.push(`seguridad: .assetsignore no excluye ${f}`);
  console.log(resumen.join("\n"));
  const todo = [...problemas, ...errores.map(e => "consola: " + e)];
  if (todo.length) { console.error("❌ Problemas:\n" + todo.join("\n")); process.exit(1); }
  console.log("✅ Todo correcto");
})();
