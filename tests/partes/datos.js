// Formato de las novedades y de las preguntas de cada UD; muestrea 200 veces cada numérica; lector de números.
module.exports = async ctx => {
  const problemas = await ctx.p.evaluate(() => {
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
          if (/NaN|undefined|Infinity/.test(e)) { mal.push(`${t}: explicación con NaN/undefined con ${JSON.stringify(v)}`); break; }
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
  ctx.problemas.push(...problemas.map(e => "datos: " + e));
};
