// Responde en el navegador TODAS las preguntas de cada UD con la respuesta correcta: deben marcarse como acierto y
// llevar el desplegable «Explicación» con «Dónde estudiarlo».
const { URL_LOCAL, responder } = require("./comun");

module.exports = async ctx => {
  const p = ctx.p;
  const uds = await p.evaluate(() => UNIDADES.map(u => [u.id, u.preguntas.length]));
  for (const [id, n] of uds) {
    // El modo práctica toma hasta 20 preguntas al azar: se repiten rondas hasta cubrirlas todas.
    const vistas = new Set();
    for (let ronda = 0; ronda < 100 && vistas.size < n; ronda++) {
      await p.goto(`${URL_LOCAL}#/ud/${id}/practicar?r=${ronda}`);
      await p.waitForSelector(".card b");
      for (;;) {
        const qid = await p.evaluate(() => __actual.q.id);
        vistas.add(qid);
        await responder(p);
        const fb = await p.textContent("#fb");
        if (!fb.includes("Correcto") || fb.includes("Incorrecto")) ctx.problemas.push(`${id}/${qid}: la respuesta correcta se marcó como fallo`);
        if (!(await p.$("#fb details.explicacion .donde a[target=_blank]"))) ctx.problemas.push(`${id}/${qid}: falta el desplegable «Explicación» con dónde estudiarlo`);
        const ultima = (await p.textContent("#sig")).includes("resultado");
        await p.click("#sig");
        if (ultima) break;
      }
    }
    if (vistas.size < n) ctx.problemas.push(`${id}: solo se han podido responder ${vistas.size}/${n} preguntas`);
    ctx.resumen.push(`  ${id}: ${vistas.size}/${n} preguntas respondidas en el navegador`);
  }
  // Rutas antiguas de una unidad: deben cargar sin errores.
  for (const vista of ["guia", "examen", "fallos"]) { await p.goto(`${URL_LOCAL}#/ud/${uds[0][0]}/${vista}`); await p.waitForTimeout(100); }
  await p.goto(URL_LOCAL);
};
