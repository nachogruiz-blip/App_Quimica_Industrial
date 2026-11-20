// Transporte de sólidos y fluidos (0190) · UD6 Elementos de impulsión y transporte de líquidos.
// Fuente: «Ejercicios U.D 6 Elementos de impulsión» (repo privado de materiales: NPSH y cavitación). No hay apuntes de
// teoría de esta unidad: la guía resume la teoría general, redactada de nuevo, con la notación de clase (g = 9,8 m/s²).
registrarUD({
  id: "tsf-ud6",
  modulo: "tsf",
  codigo: "UD6",
  titulo: "Elementos de impulsión",
  descripcion: "Bombas centrífugas y de desplazamiento positivo, cavitación y NPSH",
  ejercicios: "Relación de ejercicios de la UD6",
  guia: [
    {
      titulo: "1. Tipos de bombas",
      apuntes: "No está en los materiales de clase disponibles: teoría general de bombas",
      html: `
        <p>Las bombas aportan energía a un líquido para moverlo o subir su presión. Hay dos grandes familias:</p>
        <h4>Centrífugas (dinámicas)</h4>
        <ul>
          <li><b>Principio</b>: un rodete da velocidad al líquido y la voluta la transforma en presión.</li>
          <li><b>Caudal</b>: baja si aumenta la presión que tiene que vencer.</li>
          <li><b>Uso típico</b>: caudales grandes, líquidos poco viscosos.</li>
          <li><b>Cuidado</b>: cebado (no aspiran aire) y cavitación.</li>
        </ul>
        <h4>De desplazamiento positivo</h4>
        <ul>
          <li><b>Principio</b>: un volumen de líquido queda encerrado y se empuja (pistón, engranajes, lóbulos, tornillo, membrana).</li>
          <li><b>Caudal</b>: casi constante aunque cambie la presión de impulsión.</li>
          <li><b>Uso típico</b>: dosificación, líquidos viscosos, presiones altas.</li>
          <li><b>Cuidado</b>: nunca cerrar la impulsión; necesitan válvula de seguridad.</li>
        </ul>
        <p>La potencia que hay que dar al líquido es la de la UD5: P = Q·ρ·g·w, y la del motor P/η.</p>`
    },
    {
      titulo: "2. Cavitación y NPSH",
      apuntes: "No hay apuntes de teoría de la UD6: relación de ejercicios, problemas 1–3",
      html: `
        <p>Si en la aspiración de una bomba la presión del líquido baja por debajo de su <b>presión de vapor</b>, se forman
        burbujas de vapor que luego colapsan violentamente al llegar a zonas de más presión: es la <b>cavitación</b>.
        Produce ruido, vibraciones, caída del caudal y erosión del rodete.</p>
        <p>Para evitarla se compara la energía disponible en la aspiración por encima de la presión de vapor (<b>NPSH
        disponible</b>, depende de la instalación) con la que necesita la bomba (<b>NPSH requerido</b>, lo da el
        fabricante en una curva):</p>
        <div class="formula">NPSH<sub>d</sub> = (P<sub>sup</sub> − P<sub>v</sub>) / (ρ·g) ± z − h<sub>f,asp</sub></div>
        <ul>
          <li>P<sub>sup</sub>: presión absoluta sobre la superficie del líquido (la atmosférica si el depósito está abierto).</li>
          <li>P<sub>v</sub>: presión de vapor del líquido a la temperatura de trabajo (tablas).</li>
          <li>z: desnivel entre la superficie y la bomba: <b>−z</b> si la bomba está por encima (aspiración), <b>+z</b> si
            está por debajo (carga).</li>
          <li>h<sub>f,asp</sub>: pérdidas de carga en la tubería de aspiración (UD5).</li>
        </ul>
        <p class="clave"><b>Condición:</b> NPSH<sub>d</sub> &gt; NPSH<sub>r</sub>, con margen de seguridad (por ejemplo
        0,5–1 m). Empeoran la situación: líquido más caliente (sube P<sub>v</sub>), bomba más alta, más pérdidas en la
        aspiración, más caudal y menor presión atmosférica (altitud).</p>`
    },
    {
      titulo: "3. Formulario",
      apuntes: "Resumen de las fórmulas que usa la relación de ejercicios de la UD6",
      html: `
        <table class="tabla">
          <tr><td>NPSH disponible</td><td>NPSH<sub>d</sub> = (P<sub>sup</sub> − P<sub>v</sub>)/(ρg) ± z − h<sub>f,asp</sub></td></tr>
          <tr><td>Sin cavitación</td><td>NPSH<sub>d</sub> &gt; NPSH<sub>r</sub> (+ margen)</td></tr>
          <tr><td>Altura máxima de aspiración</td><td>z<sub>máx</sub> = (P<sub>sup</sub> − P<sub>v</sub>)/(ρg) − h<sub>f,asp</sub> − NPSH<sub>r</sub></td></tr>
          <tr><td>Potencia</td><td>P = Q·ρ·g·w ; P<sub>motor</sub> = P/η</td></tr>
        </table>`
    }
  ],

  preguntas: [
    // ---------- Conceptuales ----------
    { id: "tsf6-1", tipo: "test", seccion: 2,
      enunciado: "¿Qué es la cavitación en una bomba?",
      opciones: ["La formación y el colapso de burbujas de vapor porque la presión baja por debajo de la presión de vapor",
        "La entrada de aire por el cierre de la bomba", "El golpe de ariete al cerrar una válvula", "Una fuga de líquido por la carcasa"],
      correcta: 0,
      explicacion: "Si en la aspiración P < P_v, el líquido hierve localmente; las burbujas colapsan al llegar a zonas de mayor presión y erosionan el rodete." },
    { id: "tsf6-2", tipo: "test", seccion: 2,
      enunciado: "¿Qué condición hay que cumplir para que una bomba no cavite?",
      opciones: ["NPSH disponible mayor que el NPSH requerido", "NPSH requerido mayor que el disponible",
        "Que la bomba esté lo más alta posible sobre el depósito", "Que el caudal sea el máximo de la curva"],
      correcta: 0,
      explicacion: "El NPSH disponible (instalación) debe superar al requerido (bomba), con un margen de seguridad." },
    { id: "tsf6-3", tipo: "vf", seccion: 2,
      enunciado: "Si el líquido que se bombea se calienta, el NPSH disponible aumenta.",
      correcta: false,
      explicacion: "Al subir la temperatura aumenta la presión de vapor P_v y disminuye (P_sup − P_v)/(ρg): el NPSH disponible baja y hay más riesgo de cavitación." },
    { id: "tsf6-4", tipo: "test", seccion: 1,
      enunciado: "¿Qué tipo de bomba da un caudal casi constante aunque aumente la presión que tiene que vencer?",
      opciones: ["De desplazamiento positivo", "Centrífuga", "Axial", "Ninguna: el caudal siempre baja mucho"],
      correcta: 0,
      explicacion: "En las de desplazamiento positivo cada ciclo empuja un volumen fijo, así que el caudal depende de la velocidad y casi no de la presión. Por eso no se debe cerrar su impulsión sin válvula de seguridad." },

    // ---------- Numéricas ----------
    { id: "tsf6-n1", tipo: "numerica", seccion: 2,
      variables: { patm: [95, 103, 0.5], pv: [2, 20, 0.5], z: [0.5, 4, 0.1], hf: [0.1, 1.5, 0.05] },
      enunciado: "Una bomba aspira agua (ρ = 1000 kg/m³, presión de vapor {pv} kPa) de un depósito abierto cuyo nivel está {z} m por debajo de ella. Las pérdidas en la aspiración son {hf} m y la presión atmosférica {patm} kPa. Calcula el NPSH disponible.",
      resolver: v => (v.patm - v.pv) * 1000 / (1000 * G) - v.z - v.hf,
      unidad: "m", tolerancia: 0.02, toleranciaAbs: 0.05,
      explicacion: v => { const a = (v.patm - v.pv) * 1000 / (1000 * G);
        return `(P_atm − P_v)/(ρg) = (${fmt(v.patm)} − ${fmt(v.pv)})·10³/(1000·9,8) = ${fmt(a)} m.<br>La bomba está por encima: NPSH_d = ${fmt(a)} − ${fmt(v.z)} − ${fmt(v.hf)} = <b>${fmt(a - v.z - v.hf)} m</b>.`; } },
    { id: "tsf6-n2", tipo: "numerica", seccion: 2,
      variables: { rho: [0.65, 0.95, 0.01], pv: [10, 70, 1], z: [0.5, 3, 0.1], hf: [0.2, 1.5, 0.1] },
      enunciado: "Un hidrocarburo (ρ = {rho} g/cm³, presión de vapor {pv} kPa) llega a la bomba desde un depósito abierto cuyo nivel está {z} m por encima de ella. Las pérdidas en la aspiración son {hf} m y P_atm = 101,3 kPa. ¿Cuál es el NPSH disponible?",
      resolver: v => (101.3 - v.pv) * 1000 / (v.rho * 1000 * G) + v.z - v.hf,
      unidad: "m", tolerancia: 0.02, toleranciaAbs: 0.05,
      explicacion: v => { const a = (101.3 - v.pv) * 1000 / (v.rho * 1000 * G);
        return `(P_atm − P_v)/(ρg) = (101,3 − ${v.pv})·10³/(${fmt(v.rho * 1000)}·9,8) = ${fmt(a)} m.<br>Bomba en carga (por debajo del nivel): NPSH_d = ${fmt(a)} + ${fmt(v.z)} − ${fmt(v.hf)} = <b>${fmt(a + v.z - v.hf)} m</b>.`; } },
    { id: "tsf6-n3", tipo: "numerica", seccion: 2,
      variables: { pv: [2, 30, 1], hf: [0.2, 1.5, 0.1], npshr: [1.5, 5, 0.5] },
      enunciado: "Una bomba con NPSH requerido de {npshr} m aspira agua (ρ = 1000 kg/m³, P_v = {pv} kPa) de un depósito abierto (P_atm = 101,3 kPa). Las pérdidas en la aspiración son {hf} m. ¿A qué altura máxima sobre el nivel del agua se puede colocar la bomba sin que cavite (sin margen de seguridad)?",
      resolver: v => (101.3 - v.pv) * 1000 / (1000 * G) - v.hf - v.npshr,
      unidad: "m", tolerancia: 0.02, toleranciaAbs: 0.05,
      explicacion: v => { const a = (101.3 - v.pv) * 1000 / (1000 * G);
        return `NPSH_d = (P_atm − P_v)/(ρg) − z − h_f ≥ NPSH_r → z_máx = ${fmt(a)} − ${fmt(v.hf)} − ${fmt(v.npshr)} = <b>${fmt(a - v.hf - v.npshr)} m</b>.<br>Si sale negativo, la bomba tiene que ir por debajo del nivel del depósito (en carga).`; } }
  ]
});
