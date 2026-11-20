// Móvil: menú de 4 secciones abajo, Test por temas, Examen con cronómetro, diálogo al abandonar una ronda, Ajustes.
const { URL_LOCAL, cerrarNovedades, responder } = require("./comun");

module.exports = async ctx => {
  const m = await ctx.nuevaPagina({ viewport: { width: 390, height: 844 } }, "móvil");
  const mal = e => ctx.problemas.push(e);
  await m.goto(URL_LOCAL); await m.click("#l-invitado"); await m.waitForSelector(".barra-prog");
  await cerrarNovedades(m);

  const nav = await m.$$eval(".nav-principal a", as => as.map(a => a.lastChild.textContent.trim()));
  if (nav.join(",") !== "Estudio,Examen,Test,Ajustes") mal("navegación: pestañas «" + nav.join(",") + "», se esperaban Estudio, Examen, Test y Ajustes");
  const abajo = await m.$eval(".nav-principal", n => getComputedStyle(n).position === "fixed" && Math.abs(n.getBoundingClientRect().bottom - innerHeight) < 2);
  if (!abajo) mal("navegación: en el móvil la barra no está fija abajo");
  if (await m.evaluate(() => document.documentElement.scrollWidth > innerWidth)) mal("móvil: la página se desborda a lo ancho");

  // Test de un tema concreto: solo el apartado 2, todas sus preguntas.
  await m.click('a[data-nav="test"]'); await m.click('a.card[href="#/test/tsf"]'); await m.check('input[value="temas"]');
  await m.click(".tema summary");
  for (const c of await m.$$('input[name="sec"]')) if ((await c.getAttribute("value")) !== "tsf-ud5#2") await c.uncheck();
  await m.check('.segmentado input[value="0"]', { force: true }); await m.click("#empezar");
  const secciones = new Set();
  for (;;) {
    secciones.add(await m.evaluate(() => __actual.q.seccion));
    await responder(m, true);
    const ultima = (await m.textContent("#sig")).includes("resultado"); await m.click("#sig"); if (ultima) break;
  }
  if ([...secciones].join() !== "2") mal("Test por temas: salen preguntas de los apartados " + [...secciones]);
  if (!(await m.$("#otra"))) mal("Test: falta «Otra ronda» en el resultado");

  // Examen: cronómetro y sin corrección por pregunta.
  await m.click('a[data-nav="examen"]'); await m.click('a.card[href="#/examen/tsf"]'); await m.click("#empezar");
  if (!(await m.$("#reloj"))) mal("Examen: no se ve el cronómetro");
  await responder(m, true);
  if (await m.$("#fb .feedback")) mal("Examen: corrige antes de terminar");

  // Abandonar una ronda empezada: diálogo propio; «Seguir» se queda en la ronda, «Dejar la ronda» sale.
  await m.click('a[data-nav="ajustes"]');
  if (!(await m.$("dialog#confirmar[open]"))) mal("ronda: al salir de una ronda empezada no aparece el diálogo de confirmación");
  else {
    await m.click("#confirmar-no");
    await m.waitForSelector("dialog#confirmar", { state: "detached", timeout: 2000 }).catch(() => mal("ronda: el diálogo no se cierra con «Seguir»"));
    if (!(await m.$("#reloj"))) mal("ronda: «Seguir» abandona la ronda");
    await m.click('a[data-nav="ajustes"]'); await m.click("#confirmar-si");
  }
  await m.waitForSelector('input[name="tema"]');

  // Ajustes: modo noche, exportar/importar, versión, borrar progreso con confirmación.
  await m.check('input[name="tema"][value="dark"]', { force: true });
  if ((await m.evaluate(() => document.documentElement.dataset.theme)) !== "dark") mal("Ajustes: no cambia a modo noche");
  if (!(await m.$("#exportar")) || !(await m.$("#importar"))) mal("Ajustes: faltan exportar/importar progreso");
  if ((await m.textContent("#version")) !== (await m.evaluate(() => NOVEDADES[0].id))) mal("Ajustes: la versión no es la última novedad");
  const respondidas = () => m.evaluate(() => Object.keys(cargar()).length);
  if (!(await respondidas())) mal("ronda: no se guardó el progreso");
  const cerrado = () => m.waitForSelector("dialog#confirmar", { state: "detached", timeout: 2000 });
  await m.click("#reset"); await m.click("#confirmar-no"); await cerrado();
  if (!(await respondidas())) mal("Ajustes: «Cancelar» en borrar progreso lo borra igualmente");
  await m.click("#reset"); await m.click("#confirmar-si"); await cerrado();
  if (await respondidas()) mal("Ajustes: borrar progreso no lo borra");
  await m.context().close();
};
