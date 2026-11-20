// Juegos (js/juegos.js): datos de Parejas y Ordena los pasos, generadores del Reto rápido y de Conversiones, y una partida
// de cada juego en el navegador (móvil). Comprueba también que los juegos NO tocan el progreso y que guardan el récord.
const { URL_LOCAL, cerrarNovedades } = require("./comun");

module.exports = async ctx => {
  const mal = e => ctx.problemas.push("juegos: " + e);
  const m = await ctx.nuevaPagina({ viewport: { width: 390, height: 844 } }, "juegos");
  await m.goto(URL_LOCAL); await m.click("#l-invitado"); await m.waitForSelector(".barra-prog");
  await cerrarNovedades(m);

  // Datos y generadores (sin jugar).
  const problemas = await m.evaluate(() => {
    const e = [], idsPasos = new Set(), limpio = t => t.replace(/<[^>]+>/g, "");
    for (const mod of MODULOS) {
      const textos = new Set();
      for (const ud of UNIDADES.filter(u => u.modulo === mod.id)) {
        const pares = ud.parejas || [];
        if (pares.length && pares.length < N_PAREJAS) e.push(`${ud.id}: «parejas» necesita al menos ${N_PAREJAS} pares`);
        for (const par of pares) {
          if (!Array.isArray(par) || par.length !== 2 || !par[0] || !par[1]) { e.push(`${ud.id}: pareja mal formada ${JSON.stringify(par)}`); continue; }
          for (const t of par) {
            if (textos.has(limpio(t))) e.push(`${ud.id}: texto de carta repetido en la asignatura: «${t}»`);
            textos.add(limpio(t));
            if (limpio(t).length > 40) e.push(`${ud.id}: carta demasiado larga para el móvil: «${t}»`);
          }
        }
        for (const p of ud.pasos || []) {
          if (!/^[a-z]+\d+-p\d+$/.test(p.id) || idsPasos.has(p.id)) e.push(`${ud.id}: id de pasos no válido o repetido: ${p.id}`);
          idsPasos.add(p.id);
          if (!p.titulo || !Array.isArray(p.pasos) || p.pasos.length < 3) e.push(`${ud.id}/${p.id}: hacen falta título y al menos 3 pasos`);
          else if (new Set(p.pasos).size !== p.pasos.length) e.push(`${ud.id}/${p.id}: pasos repetidos`);
        }
      }
      for (const j of JUEGOS) if (!disponible(j.id, mod.id)) e.push(`${mod.id}: el juego ${j.id} no tiene contenido`);
    }
    // Cada generador, 300 veces: 3–4 opciones distintas, la correcta en rango y textos sin NaN/undefined.
    const revisar = (nombre, gen) => {
      for (let i = 0; i < 300; i++) {
        const { q } = gen(), txt = q.enunciado + q.explicacion + q.opciones.join("|");
        if (q.opciones.length < 3 || new Set(q.opciones).size !== q.opciones.length) { e.push(`${nombre}: opciones repetidas o insuficientes ${JSON.stringify(q.opciones)}`); break; }
        if (!(q.correcta >= 0 && q.correcta < q.opciones.length)) { e.push(`${nombre}: correcta fuera de rango`); break; }
        if (/NaN|undefined|Infinity/.test(txt)) { e.push(`${nombre}: texto con NaN/undefined: ${txt}`); break; }
      }
    };
    for (const f of [retoRegimen, retoContinuidad, retoHidrostatica, retoAsociacion, retoOhm, retoPotencia, retoMolaridad, retoDilucion, retoEquivalencia]) revisar(f.name, f);
    for (const mod of Object.keys(CONVERSIONES)) revisar("conversiones " + mod, () => generarConversion(mod));
    // Comprobaciones de valores concretos.
    if (fmtC(3.6e6) !== "3,6·10⁶" || fmtC(1.8e-5) !== "1,8·10⁻⁵" || fmtC(250000) !== "250.000") e.push(`fmtC: ${fmtC(3.6e6)}, ${fmtC(1.8e-5)}, ${fmtC(250000)}`);
    for (let i = 0; i < 200; i++) { // el régimen marcado como correcto coincide con el Re de los datos
      const { q } = retoRegimen(), re = +q.explicacion.match(/<b>([\d.,]+)<\/b>/)[1].replace(/\./g, "").replace(",", ".");
      if (q.correcta !== (re < 2000 ? 0 : re <= 4000 ? 1 : 2)) { e.push(`retoRegimen: Re ${re} marcado como ${q.opciones[q.correcta]}`); break; }
    }
    return e;
  });
  problemas.forEach(mal);

  // Menú: «Juegos» va justo antes de «Ajustes».
  await m.click('a[data-nav="juegos"]'); await m.waitForSelector('a.card[href="#/juegos/contrarreloj"]');
  if ((await m.$$("main a.card")).length !== 6) mal("la portada no muestra los 6 juegos");
  const desborda = () => m.evaluate(() => document.documentElement.scrollWidth > innerWidth);

  // Contrarreloj de TSF: 3 aciertos, 1 fallo (con corrección y −5 s) y fin.
  const correcta = () => m.evaluate(() => String(__actual.q.correcta));
  const acertar = async () => {
    const n = await m.evaluate(() => __juego.n);
    await m.click(`#j-zona .opcion[data-k="${await correcta()}"]`);
    await m.waitForFunction(n => __juego.n > n || __juego.terminada, n, { timeout: 3000 });
  };
  const fallar = async () => { await m.click(`#j-zona .opcion:not([data-k="${await correcta()}"])`); await m.waitForSelector("#fb .feedback.ko #sig"); };
  await m.click('a.card[href="#/juegos/contrarreloj"]'); await m.click('a.card[href="#/juegos/contrarreloj/tsf"]');
  await m.check('input[name="ambito"][value="tsf-ud5"]'); await m.click("#j-empezar");
  for (let i = 0; i < 3; i++) await acertar();
  const resto = await m.evaluate(() => __juego.resto);
  await fallar();
  if (await m.evaluate(r => __juego.resto > r - 4900, resto)) mal("Contrarreloj: el fallo no resta 5 s");
  if (!(await m.$("#fb .explicacion"))) mal("Contrarreloj: el fallo no muestra la explicación");
  await m.click("#sig"); await m.evaluate(() => terminarRonda(__juego)); await m.waitForSelector("#j-final");
  if (!(await m.textContent("#j-final h2")).includes("3 aciertos")) mal("Contrarreloj: el resultado no da 3 aciertos");
  if ((await m.evaluate(() => leerRecords()["contrarreloj:tsf-ud5"])) !== 3) mal("Contrarreloj: no guarda el récord");

  // Supervivencia de MEI: con 3 fallos se acaba.
  await m.goto(`${URL_LOCAL}#/juegos/supervivencia/mei`); await m.click("#j-empezar");
  await acertar();
  for (let i = 0; i < 3; i++) { await fallar(); await m.click("#sig"); }
  await m.waitForSelector("#j-final");
  if (!(await m.textContent("#j-final h2")).includes("Sin vidas")) mal("Supervivencia: no termina al perder las 3 vidas");

  // Reto rápido de cada asignatura: 10 aciertos de 10. Conversiones: 5 aciertos.
  for (const mod of ["tsf", "mei", "fpm"]) {
    await m.goto(`${URL_LOCAL}#/juegos/reto/${mod}`); await m.click("#j-empezar");
    for (let i = 0; i < 10; i++) await acertar();
    await m.waitForSelector("#j-final");
    if (!(await m.textContent("#j-final h2")).includes("10 aciertos de 10")) mal(`Reto ${mod}: no da 10 de 10`);
    if (await desborda()) mal(`Reto ${mod}: la página se desborda a lo ancho`);
    await m.goto(`${URL_LOCAL}#/juegos/conversiones/${mod}`); await m.click("#j-empezar");
    for (let i = 0; i < 5; i++) await acertar();
    await m.evaluate(() => terminarRonda(__juego)); await m.waitForSelector("#j-final");
    if (!(await m.textContent("#j-final h2")).includes("5 aciertos")) mal(`Conversiones ${mod}: no da 5 aciertos`);
  }

  // Parejas (unidad TSF UD5, a 320 px): un intento fallido y luego todas → 7 intentos.
  await m.setViewportSize({ width: 320, height: 700 });
  await m.goto(`${URL_LOCAL}#/juegos/parejas/tsf`); await m.check('input[name="ambito"][value="tsf-ud5"]'); await m.click("#j-empezar");
  if (await desborda()) mal("Parejas: el tablero se sale de un móvil de 320 px");
  const cartas = await m.evaluate(() => __juego.cartas.map(c => c.par));
  const otra = cartas.findIndex(p => p !== cartas[0]);
  await m.click('.carta[data-i="0"]'); await m.click(`.carta[data-i="${otra}"]`);
  await m.waitForFunction(() => !document.querySelector(".carta.vuelta:not(.hecha)"), null, { timeout: 3000 });
  for (const par of new Set(cartas)) for (const i of cartas.flatMap((p, k) => p === par ? [k] : [])) await m.click(`.carta[data-i="${i}"]`);
  await m.waitForSelector("#j-final");
  if ((await m.evaluate(() => leerRecords()["parejas:tsf-ud5"])) !== 7) mal("Parejas: el récord no es 7 intentos");

  // Ordena los pasos: cada procedimiento con un fallo al principio.
  await m.setViewportSize({ width: 390, height: 844 });
  for (const mod of ["tsf", "mei", "fpm"]) {
    await m.goto(`${URL_LOCAL}#/juegos/pasos/${mod}`); await m.waitForSelector("[data-proc]");
    for (const id of await m.$$eval("[data-proc]", bs => bs.map(b => b.dataset.proc))) {
      if (await m.$("#j-final")) await m.click(`#j-final a[href="#/juegos/pasos/${mod}"]`); // «Cambiar» vuelve a la lista
      await m.click(`[data-proc="${id}"]`);
      await m.click('#j-pasos .opcion:not([data-k="0"])');
      for (;;) {
        const k = await m.evaluate(() => __juego.terminada ? -1 : __juego.siguiente < __juego.total ? __juego.siguiente : -1);
        if (k < 0) break;
        await m.click(`#j-pasos .opcion[data-k="${k}"]`);
      }
      await m.waitForSelector("#j-final");
      if ((await m.evaluate(id => leerRecords()["pasos:" + id], id)) !== 1) mal(`Pasos ${id}: el récord no es 1 fallo`);
    }
  }

  // Salir a mitad de juego para el reloj; y los juegos no han tocado el progreso de preguntas.
  await m.goto(`${URL_LOCAL}#/juegos/contrarreloj/fpm`); await m.click("#j-empezar"); await m.click('a[data-nav="ajustes"]');
  await m.waitForSelector('input[name="tema"]');
  if (await m.evaluate(() => relojJuego !== null || partida !== null)) mal("al salir de un juego no se para el reloj");
  if (await m.evaluate(() => Object.keys(cargar()).length)) mal("los juegos han guardado respuestas en el progreso (no deben contar)");
  ctx.resumen.push("  juegos: 6 juegos jugados en el navegador");
  await m.context().close();
};
