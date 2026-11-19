// UD de DEMOSTRACIÓN: muestra el formato. Se borrará cuando estén UD4, UD5 y UD7.
registrarUD({
  id: "demo",
  codigo: "UD0",
  titulo: "Demostración del formato",
  descripcion: "Ejemplo de guía y de los tres tipos de pregunta.",
  guia: [
    {
      titulo: "1. Balance de materia",
      html: `
        <p>En un proceso en estado estacionario, sin reacción química:</p>
        <div class="formula">Entrada = Salida</div>
        <p class="clave"><b>Idea clave:</b> elige una base de cálculo (p. ej. 100 kg/h) antes de empezar.</p>`
    },
    {
      titulo: "2. Calor sensible",
      html: `
        <div class="formula">Q = m · c<sub>p</sub> · ΔT</div>
        <p>Con c<sub>p</sub>(agua) ≈ 4,18 kJ/(kg·K).</p>`
    }
  ],
  preguntas: [
    {
      id: "demo-1", tipo: "test", seccion: 1,
      enunciado: "En estado estacionario y sin reacción, un balance de materia global indica que…",
      opciones: ["Entrada = Salida", "Entrada = Salida + Acumulación negativa", "Salida = 0", "Entrada > Salida siempre"],
      correcta: 0,
      explicacion: "Sin acumulación (estacionario) ni generación/consumo (sin reacción), todo lo que entra sale."
    },
    {
      id: "demo-2", tipo: "vf", seccion: 2,
      enunciado: "El calor sensible depende de la variación de temperatura.",
      correcta: true,
      explicacion: "Q = m·cp·ΔT: es proporcional a ΔT. El calor latente, en cambio, se intercambia a T constante."
    },
    {
      id: "demo-3", tipo: "numerica", seccion: 2,
      // Valores aleatorios en [min, max] con 'paso'; se sustituyen en {nombre}.
      variables: { m: [10, 50, 5], T1: [15, 25, 1], T2: [60, 90, 5] },
      enunciado: "Se calientan {m} kg de agua desde {T1} °C hasta {T2} °C. ¿Qué calor hace falta? (cp = 4,18 kJ/kg·K)",
      resolver: v => v.m * 4.18 * (v.T2 - v.T1),
      unidad: "kJ",
      tolerancia: 0.02, // 2 % relativo
      explicacion: v => `Q = m·cp·ΔT = ${v.m} · 4,18 · (${v.T2} − ${v.T1}) = <b>${fmt(v.m * 4.18 * (v.T2 - v.T1))} kJ</b>`
    }
  ]
});
