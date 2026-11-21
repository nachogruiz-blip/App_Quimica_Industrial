// Modo Cloudflare simulado con page.route: el worker ya pidió la contraseña y la app usa ese usuario sin segundo login.
// Se sirven los archivos con las cabeceras reales del worker (CSP incluida): un estilo o script en línea daría error.
const fs = require("fs"), path = require("path");
const { RAIZ, cargarWorker } = require("./comun");

module.exports = async ctx => {
  const { SEGURIDAD, PUBLICOS } = await cargarWorker();
  const mal = e => ctx.problemas.push(e);
  const q = await ctx.nuevaPagina({}, "modo Cloudflare");
  let salidas = 0;
  // Función y no patrón: la petición de cerrar sesión lleva credenciales en la URL (https://__salir:…@app.test/__salir).
  await q.route(url => url.hostname === "app.test", ruta => {
    const camino = new URL(ruta.request().url()).pathname;
    if (camino === "/__salir") { salidas++; return ruta.fulfill({ body: "Sesión cerrada.", headers: SEGURIDAD }); }
    if (camino === "/__usuario") return ruta.fulfill({ json: { usuario: "Nacho" }, headers: SEGURIDAD });
    const f = path.join(RAIZ, camino === "/" ? "index.html" : camino);
    return fs.existsSync(f) ? ruta.fulfill({ path: f, headers: SEGURIDAD }) : ruta.fulfill({ status: 404, headers: SEGURIDAD });
  });
  await q.goto("https://app.test/"); await q.waitForSelector(".barra-prog, #f-login");
  if (await q.$("#f-login")) mal("modo Cloudflare: pide un segundo login");
  const barra = await q.textContent("#usuario-barra");
  if (!barra.includes("Nacho") || !(await q.$("#salir"))) mal("modo Cloudflare: la barra debe mostrar el usuario y «Salir»");
  if (!(await q.$("#novedades"))) mal("modo Cloudflare: no salen las novedades al entrar");
  await q.click("#novedades-ok");

  // Barras de progreso con la CSP activa: la anchura se aplica desde JS (data-pct).
  await q.evaluate(() => { guardar({ [UNIDADES[0].preguntas[0].id]: { a: 1, f: 0, ultimo: true } }); router(); });
  await q.waitForFunction(() => document.querySelector(".barra-prog>div")?.style.width);
  const ancho = await q.$eval(".barra-prog>div", d => d.style.width);
  if (!/^[1-9]\d*%$/.test(ancho)) mal(`CSP: la barra de progreso no tiene anchura (${ancho})`);
  for (const ruta of ["#/ud/tsf-ud5/guia?s=2", "#/test/tsf", "#/ajustes", "#/novedades", "#/juegos", "#/juegos/pasos/tsf"]) { await q.goto("https://app.test/" + ruta); await q.waitForTimeout(100); }
  // Juegos con la CSP: la barra de tiempo se mueve (style.width desde JS) y las cartas se pueden girar.
  await q.goto("https://app.test/#/juegos/contrarreloj/tsf"); await q.click("#j-empezar"); await q.waitForTimeout(400);
  if (!/^\d+(\.\d+)?%$/.test(await q.$eval("#j-tiempo", d => d.style.width))) mal("CSP: la barra de tiempo de los juegos no tiene anchura");
  await q.goto("https://app.test/#/juegos/parejas/mei"); await q.click("#j-empezar"); await q.click('.carta[data-i="0"]');
  if (!(await q.$eval('.carta[data-i="0"] .cara', c => getComputedStyle(c).display !== "none"))) mal("CSP: la carta no se gira en Parejas");

  // Cerrar sesión en Ajustes: pide /__salir (el navegador olvida la contraseña) y recarga para que el worker la pida.
  await q.goto("https://app.test/#/ajustes"); await q.waitForSelector("#aj-salir");
  await Promise.all([q.waitForURL("https://app.test/", { timeout: 5000 }).catch(() => {}), q.click("#aj-salir")]);
  if (salidas !== 1 || q.url() !== "https://app.test/") mal(`modo Cloudflare: «Cerrar sesión» no pasa por /__salir ni recarga (${salidas}, ${q.url()})`);

  // Instalar como app: manifest enlazado (solo en http) con iconos que existen y se sirven sin contraseña.
  if (!(await q.$('link[rel="manifest"]'))) mal("instalar: en Cloudflare falta el enlace al manifest");
  try {
    const man = JSON.parse(fs.readFileSync(path.join(RAIZ, "manifest.webmanifest"), "utf8"));
    for (const t of ["192x192", "512x512"]) if (!man.icons.some(i => i.sizes === t)) mal(`instalar: falta icono ${t}`);
    for (const i of man.icons) {
      if (!fs.existsSync(path.join(RAIZ, i.src))) mal(`instalar: no existe ${i.src}`);
      if (!PUBLICOS.has("/" + i.src)) mal(`instalar: ${i.src} no está en PUBLICOS de worker.mjs`);
    }
    if (!man.name || !man.start_url || man.display !== "standalone") mal("instalar: manifest incompleto");
  } catch (e) { mal("instalar: manifest.webmanifest no es JSON válido: " + e.message); }
  await q.context().close();
};
