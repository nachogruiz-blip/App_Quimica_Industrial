// Transporte de sólidos y fluidos (0190) · UD3 Estática de fluidos.
// Fuente: «Ejercicios U.D 3 Estática de fluidos» (repo privado de materiales). No hay apuntes de teoría de esta unidad:
// la guía resume la teoría general necesaria para esos ejercicios, redactada de nuevo, con la notación de clase (g = 9,8 m/s²).
registrarUD({
  id: "tsf-ud3",
  modulo: "tsf",
  codigo: "UD3",
  titulo: "Estática de fluidos",
  descripcion: "Presión y sus unidades, presión hidrostática, manómetros, prensa hidráulica y flotación",
  ejercicios: "Relación de ejercicios de la UD3",
  guia: [
    {
      titulo: "1. Presión y unidades",
      apuntes: "No hay apuntes de teoría de la UD3: practica con la relación de ejercicios, problemas 1–3",
      html: `
        <p>La <b>presión</b> es la fuerza perpendicular que se ejerce por unidad de superficie:</p>
        <div class="formula">P = F / S</div>
        <p>En el SI se mide en <b>pascales</b> (1 Pa = 1 N/m²). Es una unidad muy pequeña, por eso en la industria se
        usan otras. Conviene saber pasar de unas a otras:</p>
        <table class="tabla">
          <tr><th>Unidad</th><th>Equivalencia</th></tr>
          <tr><td>atmósfera (atm)</td><td>1 atm = 101 325 Pa = 760 mmHg = 760 torr</td></tr>
          <tr><td>bar</td><td>1 bar = 100 000 Pa (1 atm ≈ 1,013 bar)</td></tr>
          <tr><td>milibar (mbar)</td><td>1 mbar = 100 Pa</td></tr>
          <tr><td>mmHg y torr</td><td>1 mmHg = 1 torr ≈ 133,3 Pa</td></tr>
          <tr><td>kp/cm²</td><td>1 kp/cm² = 9,8 N / 10⁻⁴ m² = 98 000 Pa</td></tr>
        </table>
        <p>Una presión dada como <b>altura de columna</b> de un líquido se pasa a pascales con P = ρ·g·h. Por ejemplo, una
        columna de mercurio (ρ = 13 600 kg/m³) de 0,76 m da 13 600·9,8·0,76 ≈ 101 300 Pa.</p>
        <p class="clave"><b>Idea clave:</b> pasa siempre a Pa (o a m de columna del fluido) antes de operar, y fíjate en
        si la presión es absoluta o manométrica.</p>`
    },
    {
      titulo: "2. Presión hidrostática",
      apuntes: "No hay apuntes de teoría de la UD3: relación de ejercicios, problemas 4–7 y 9",
      html: `
        <p>Dentro de un líquido en reposo, la presión crece con la profundidad <b>h</b> medida desde la superficie libre:</p>
        <div class="formula">P = P₀ + ρ · g · h</div>
        <ul>
          <li><b>Presión manométrica</b> (o relativa): la que se debe solo al líquido, ρ·g·h. Es lo que marca un manómetro.</li>
          <li><b>Presión absoluta</b>: la manométrica más la atmosférica, P<sub>abs</sub> = P<sub>atm</sub> + ρ·g·h.</li>
        </ul>
        <p>La presión en el fondo depende de la <b>altura</b> y de la <b>densidad</b> del líquido, no de la forma del
        recipiente ni de la cantidad de líquido (paradoja hidrostática).</p>
        <p>Con varias capas de líquidos que no se mezclan, se suman las contribuciones: P = ρ₁·g·h₁ + ρ₂·g·h₂ + …</p>
        <p>La <b>fuerza</b> sobre una superficie plana horizontal (un tapón, una escotilla) es F = P·S, con S en m².</p>`
    },
    {
      titulo: "3. Vasos comunicantes y manómetros",
      apuntes: "No hay apuntes de teoría de la UD3: relación de ejercicios, problemas 14–19",
      html: `
        <p>En un mismo líquido en reposo y continuo, <b>todos los puntos a la misma altura tienen la misma presión</b>.
        Es la base de los vasos comunicantes y de los manómetros.</p>
        <h4>Tubo en U con dos líquidos que no se mezclan</h4>
        <p>Se igualan las presiones al nivel de la superficie de separación:</p>
        <div class="formula">ρ₁ · h₁ = ρ₂ · h₂</div>
        <p>El líquido menos denso forma la columna más alta. Ejemplo: 1 cm de desnivel de mercurio equilibra 13,6 cm de agua.</p>
        <h4>Manómetro de tubo en U abierto</h4>
        <ul>
          <li>Si el líquido manométrico baja en la rama del gas: P<sub>gas</sub> = P<sub>atm</sub> + ρ<sub>m</sub>·g·Δh (sobrepresión).</li>
          <li>Si sube en la rama del gas (se está haciendo vacío): P<sub>gas</sub> = P<sub>atm</sub> − ρ<sub>m</sub>·g·Δh.</li>
        </ul>
        <p class="clave"><b>Idea clave:</b> con mercurio y la presión atmosférica en mmHg, basta con sumar o restar Δh en mm.</p>`
    },
    {
      titulo: "4. Principio de Pascal y prensa hidráulica",
      apuntes: "No hay apuntes de teoría de la UD3: relación de ejercicios, problemas 26–29",
      html: `
        <p><b>Principio de Pascal</b>: una presión aplicada a un líquido encerrado se transmite con el mismo valor a todos
        sus puntos y a las paredes del recipiente.</p>
        <p>En una <b>prensa hidráulica</b> los dos émbolos soportan la misma presión, así que la fuerza se multiplica en la
        proporción de las superficies:</p>
        <div class="formula">F₁ / S₁ = F₂ / S₂ &nbsp;→&nbsp; F₁ = F₂ · (S₁ / S₂) = F₂ · (r₁ / r₂)²</div>
        <p>Si se dan radios o diámetros, la relación de superficies es el <b>cuadrado</b> de la relación de radios.
        El émbolo grande recibe más fuerza, pero la presión es la misma en ambos.</p>`
    },
    {
      titulo: "5. Principio de Arquímedes y flotación",
      apuntes: "No hay apuntes de teoría de la UD3: relación de ejercicios, problemas 8, 10–13 y 20–25",
      html: `
        <p><b>Principio de Arquímedes</b>: todo cuerpo sumergido total o parcialmente en un fluido recibe un empuje
        vertical hacia arriba igual al peso del fluido que desaloja:</p>
        <div class="formula">E = ρ<sub>fluido</sub> · g · V<sub>sumergido</sub></div>
        <ul>
          <li><b>Peso aparente</b> (lo que marca un dinamómetro o la tensión de un cable con el cuerpo sumergido):
            P<sub>ap</sub> = P − E = (ρ<sub>cuerpo</sub> − ρ<sub>fluido</sub>)·g·V.</li>
          <li><b>Densidad a partir del peso perdido</b>: si un cuerpo pesa P en el aire y pierde E al sumergirlo en agua,
            ρ<sub>cuerpo</sub> = ρ<sub>agua</sub> · P / E.</li>
          <li><b>Flotación</b>: un cuerpo flota si su densidad media es menor que la del líquido. En equilibrio, la fracción
            sumergida es V<sub>sum</sub>/V = ρ<sub>cuerpo</sub>/ρ<sub>líquido</sub>.</li>
        </ul>
        <p class="clave"><b>Idea clave:</b> el empuje depende del volumen sumergido y de la densidad del <b>fluido</b>, no de
        la del cuerpo.</p>`
    },
    {
      titulo: "6. Formulario",
      apuntes: "Resumen de las fórmulas que usa la relación de ejercicios de la UD3",
      html: `
        <table class="tabla">
          <tr><td>Presión</td><td>P = F/S</td></tr>
          <tr><td>Hidrostática</td><td>P = ρ·g·h ; P<sub>abs</sub> = P<sub>atm</sub> + ρ·g·h</td></tr>
          <tr><td>Equivalencias</td><td>1 atm = 101 325 Pa = 760 mmHg ; 1 bar = 10⁵ Pa</td></tr>
          <tr><td>Tubo en U</td><td>ρ₁·h₁ = ρ₂·h₂</td></tr>
          <tr><td>Manómetro abierto</td><td>P<sub>gas</sub> = P<sub>atm</sub> ± ρ<sub>m</sub>·g·Δh</td></tr>
          <tr><td>Prensa hidráulica</td><td>F₁/S₁ = F₂/S₂</td></tr>
          <tr><td>Empuje</td><td>E = ρ<sub>f</sub>·g·V<sub>sum</sub></td></tr>
          <tr><td>Peso aparente</td><td>P<sub>ap</sub> = P − E</td></tr>
          <tr><td>Flotación</td><td>V<sub>sum</sub>/V = ρ<sub>c</sub>/ρ<sub>l</sub></td></tr>
        </table>`
    }
  ],

  // Minijuegos (js/juegos.js): Parejas (fórmula o concepto ↔ su pareja; textos cortos y distintos) y Ordena los pasos.
  parejas: [
    ["P = F/S", "Definición de presión"],
    ["1 atm", "760 mmHg"],
    ["1 bar", "100 000 Pa"],
    ["1 mmHg", "≈ 133,3 Pa"],
    ["P = ρ·g·h", "Presión hidrostática"],
    ["P<sub>abs</sub>", "P<sub>atm</sub> + ρ·g·h"],
    ["ρ₁·h₁ = ρ₂·h₂", "Tubo en U con dos líquidos"],
    ["F₁/S₁ = F₂/S₂", "Prensa hidráulica"],
    ["E = ρ<sub>f</sub>·g·V<sub>sum</sub>", "Empuje de Arquímedes"],
    ["P − E", "Peso aparente"],
    ["V<sub>sum</sub>/V = ρ<sub>c</sub>/ρ<sub>l</sub>", "Fracción sumergida al flotar"]
  ],
  pasos: [
    { id: "tsf3-p1", titulo: "Fuerza en una prensa hidráulica", pasos: [
      "Calcular la superficie de cada émbolo",
      "Presión en el émbolo pequeño: P = F₁/S₁",
      "Esa misma presión llega al émbolo grande (Pascal)",
      "Fuerza en el émbolo grande: F₂ = P·S₂"
    ] }
  ],
  preguntas: [
    // ---------- Conceptuales ----------
    { id: "tsf3-1", tipo: "test", seccion: 1,
      enunciado: "¿Cuál de estas equivalencias de 1 atm es correcta?",
      opciones: ["101 325 Pa y 760 mmHg", "100 000 Pa y 760 mmHg", "101 325 Pa y 1000 mmHg", "1000 mbar exactos"],
      correcta: 0,
      explicacion: "1 atm = 101 325 Pa = 760 mmHg = 1013,25 mbar. El que vale exactamente 100 000 Pa (1000 mbar) es el bar." },
    { id: "tsf3-2", tipo: "test", seccion: 2,
      enunciado: "La presión que ejerce un líquido en reposo sobre el fondo de un depósito depende de…",
      opciones: ["La altura de líquido y su densidad", "El volumen total de líquido", "La forma del recipiente", "El área del fondo"],
      correcta: 0,
      explicacion: "P = ρ·g·h: solo influyen la densidad y la altura de líquido sobre el punto. Dos depósitos de formas distintas con la misma altura del mismo líquido tienen la misma presión en el fondo." },
    { id: "tsf3-3", tipo: "vf", seccion: 2,
      enunciado: "La presión manométrica es la presión absoluta menos la presión atmosférica.",
      correcta: true,
      explicacion: "P_abs = P_atm + P_man. El manómetro mide la diferencia con la atmósfera; para la absoluta hay que sumarle la presión atmosférica." },
    { id: "tsf3-4", tipo: "test", seccion: 3,
      enunciado: "Un tubo en U contiene mercurio y, en una rama, agua encima. En equilibrio, medidas desde la superficie de separación, ¿qué columna es más alta?",
      opciones: ["La de agua, porque es menos densa", "La de mercurio", "Las dos son iguales", "Depende del diámetro de cada rama"],
      correcta: 0,
      explicacion: "Se cumple ρ_agua·h_agua = ρ_Hg·h_Hg. Como el agua es 13,6 veces menos densa, su columna es 13,6 veces más alta. El diámetro no influye." },
    { id: "tsf3-5", tipo: "vf", seccion: 4,
      enunciado: "En una prensa hidráulica, el émbolo grande soporta más fuerza y también más presión que el pequeño.",
      correcta: false,
      explicacion: "Por el principio de Pascal la presión es la misma en los dos émbolos. Lo que cambia es la fuerza, proporcional a la superficie: F₂ = F₁·S₂/S₁." },
    { id: "tsf3-6", tipo: "test", seccion: 5,
      enunciado: "El empuje que recibe un cuerpo sumergido es igual a…",
      opciones: ["El peso del fluido que desaloja", "El peso del propio cuerpo", "La masa del cuerpo", "La densidad del cuerpo por su volumen"],
      correcta: 0,
      explicacion: "Principio de Arquímedes: E = ρ_fluido·g·V_sumergido, el peso del fluido desalojado. Solo coincide con el peso del cuerpo cuando este flota en equilibrio." },

    // ---------- Numéricas ----------
    { id: "tsf3-n1", tipo: "numerica", seccion: 1,
      variables: { mm: [600, 800, 5] },
      enunciado: "Un gas está a una presión de {mm} mm de columna de mercurio (ρ_Hg = 13,6 g/cm³). ¿Cuánto es en pascales?",
      resolver: v => 13600 * G * v.mm / 1000,
      unidad: "Pa", tolerancia: 0.02,
      explicacion: v => `P = ρ·g·h = 13 600·9,8·${fmt(v.mm / 1000)} = <b>${fmt(13600 * G * v.mm / 1000)} Pa</b> (h = ${v.mm} mm = ${fmt(v.mm / 1000)} m).` },
    { id: "tsf3-n2", tipo: "numerica", seccion: 2,
      variables: { rho: [0.7, 1.3, 0.05], h: [0.5, 20, 0.5] },
      enunciado: "¿Qué presión manométrica hay a {h} m de profundidad en un líquido de densidad {rho} g/cm³? Da el resultado en kPa.",
      resolver: v => v.rho * 1000 * G * v.h / 1000,
      unidad: "kPa", tolerancia: 0.02,
      explicacion: v => `ρ = ${fmt(v.rho * 1000)} kg/m³. P = ρ·g·h = ${fmt(v.rho * 1000)}·9,8·${fmt(v.h)} = ${fmt(v.rho * 1000 * G * v.h)} Pa = <b>${fmt(v.rho * G * v.h)} kPa</b>.` },
    { id: "tsf3-n3", tipo: "numerica", seccion: 2,
      variables: { h: [10, 200, 5] },
      enunciado: "Un submarino baja a {h} m de profundidad en agua de mar (ρ = 1030 kg/m³). ¿Qué presión absoluta soporta su casco? Toma P_atm = 101 325 Pa y da el resultado en kPa.",
      resolver: v => (101325 + 1030 * G * v.h) / 1000,
      unidad: "kPa", tolerancia: 0.02,
      explicacion: v => `P_man = ρ·g·h = 1030·9,8·${v.h} = ${fmt(1030 * G * v.h)} Pa.<br>P_abs = 101 325 + ${fmt(1030 * G * v.h)} = ${fmt(101325 + 1030 * G * v.h)} Pa = <b>${fmt((101325 + 1030 * G * v.h) / 1000)} kPa</b>.` },
    { id: "tsf3-n4", tipo: "numerica", seccion: 2,
      variables: { rho: [0.7, 1.2, 0.05], h: [20, 150, 5], D: [2, 10, 1] },
      enunciado: "Un depósito contiene un líquido de densidad {rho} g/cm³ hasta {h} cm de altura. En el fondo hay un tapón circular de {D} cm de diámetro. ¿Qué fuerza ejerce el líquido sobre el tapón?",
      resolver: v => v.rho * 1000 * G * (v.h / 100) * area(v.D / 100),
      unidad: "N", tolerancia: 0.02,
      explicacion: v => { const P = v.rho * 1000 * G * v.h / 100, S = area(v.D / 100);
        return `P = ρ·g·h = ${fmt(v.rho * 1000)}·9,8·${fmt(v.h / 100)} = ${fmt(P)} Pa.<br>S = π·${fmt(v.D / 100)}²/4 = ${fmt(S)} m².<br>F = P·S = <b>${fmt(P * S)} N</b>.`; } },
    { id: "tsf3-n5", tipo: "numerica", seccion: 3,
      variables: { patm: [700, 770, 5], dh: [5, 40, 1] },
      enunciado: "Un manómetro de mercurio abierto, conectado a un depósito de gas, marca un desnivel de {dh} cm (el mercurio baja en la rama del gas). La presión atmosférica es {patm} mmHg. ¿Cuál es la presión absoluta del gas en kPa? (1 atm = 760 mmHg = 101 325 Pa)",
      resolver: v => (v.patm + v.dh * 10) * 101325 / 760 / 1000,
      unidad: "kPa", tolerancia: 0.02,
      explicacion: v => { const mm = v.patm + v.dh * 10;
        return `Sobrepresión: P_gas = P_atm + Δh = ${v.patm} + ${v.dh * 10} = ${mm} mmHg.<br>${mm}·101 325/760 = ${fmt(mm * 101325 / 760)} Pa = <b>${fmt(mm * 101325 / 760 / 1000)} kPa</b>.`; } },
    { id: "tsf3-n6", tipo: "numerica", seccion: 3,
      variables: { dh: [0.5, 5, 0.1], ro: [0.7, 0.95, 0.05] },
      enunciado: "En un tubo en U con mercurio (13,6 g/cm³) los niveles de mercurio difieren {dh} cm porque en una rama hay agua. ¿Qué altura de aceite (ρ = {ro} g/cm³) hay que echar en la otra rama para igualar los niveles de mercurio?",
      resolver: v => 13.6 * v.dh / v.ro,
      unidad: "cm", tolerancia: 0.02,
      explicacion: v => { const hw = 13.6 * v.dh;
        return `Agua que equilibra el desnivel: ρ_agua·h_agua = ρ_Hg·Δh → h_agua = 13,6·${fmt(v.dh)} = ${fmt(hw)} cm.<br>Con el mercurio igualado, el aceite debe compensar esa agua: ρ_aceite·h_aceite = ρ_agua·h_agua → h_aceite = ${fmt(hw)}/${fmt(v.ro)} = <b>${fmt(hw / v.ro)} cm</b>.`; } },
    { id: "tsf3-n7", tipo: "numerica", seccion: 4,
      variables: { m: [50, 2000, 10], R: [20, 60, 5], r: [2, 10, 1] },
      enunciado: "Una prensa hidráulica tiene un émbolo grande de {R} cm de radio y uno pequeño de {r} cm. ¿Qué fuerza hay que aplicar en el pequeño para levantar {m} kg colocados en el grande?",
      resolver: v => v.m * G * (v.r / v.R) ** 2,
      unidad: "N", tolerancia: 0.02,
      explicacion: v => `Peso: F₂ = m·g = ${v.m}·9,8 = ${fmt(v.m * G)} N.<br>F₁ = F₂·(r₁/r₂)² = ${fmt(v.m * G)}·(${v.r}/${v.R})² = <b>${fmt(v.m * G * (v.r / v.R) ** 2)} N</b>.` },
    { id: "tsf3-n8", tipo: "numerica", seccion: 5,
      variables: { rc: [2, 8, 0.1], rl: [0.8, 1.3, 0.05], V: [0.5, 5, 0.1] },
      enunciado: "Un cuerpo de {V} L y densidad {rc} g/cm³ cuelga de un cable totalmente sumergido en un líquido de densidad {rl} g/cm³. ¿Qué tensión soporta el cable (peso aparente)?",
      resolver: v => (v.rc - v.rl) * 1000 * G * v.V / 1000,
      unidad: "N", tolerancia: 0.02,
      explicacion: v => { const P = v.rc * G * v.V, E = v.rl * G * v.V;
        return `V = ${fmt(v.V / 1000)} m³. Peso: P = ${fmt(v.rc * 1000)}·9,8·${fmt(v.V / 1000)} = ${fmt(P)} N.<br>Empuje: E = ${fmt(v.rl * 1000)}·9,8·${fmt(v.V / 1000)} = ${fmt(E)} N.<br>T = P − E = <b>${fmt(P - E)} N</b>.`; } },
    { id: "tsf3-n9", tipo: "numerica", seccion: 5,
      variables: { W: [100, 200, 5], E: [25, 45, 1] },
      enunciado: "Una piedra pesa {W} kp en el aire y, sumergida del todo en agua, su peso aparente es {E} kp menor. ¿Cuál es su densidad en g/cm³?",
      resolver: v => v.W / v.E,
      unidad: "g/cm³", tolerancia: 0.02,
      explicacion: v => `El peso perdido es el empuje: E = ${v.E} kp = peso del agua desalojada → V = ${v.E} L.<br>ρ = ρ_agua·P/E = 1·${v.W}/${v.E} = <b>${fmt(v.W / v.E)} g/cm³</b>.` },
    { id: "tsf3-n10", tipo: "numerica", seccion: 5,
      variables: { rc: [0.3, 0.95, 0.01], rl: [1, 1.3, 0.01] },
      enunciado: "Un cuerpo de densidad {rc} g/cm³ flota en un líquido de densidad {rl} g/cm³. ¿Qué porcentaje de su volumen queda sumergido?",
      resolver: v => 100 * v.rc / v.rl,
      unidad: "%", tolerancia: 0.02,
      explicacion: v => `En equilibrio, peso = empuje: ρ_c·V = ρ_l·V_sum → V_sum/V = ${fmt(v.rc)}/${fmt(v.rl)} = ${fmt(v.rc / v.rl)} → <b>${fmt(100 * v.rc / v.rl)} %</b>.` },
    { id: "tsf3-n11", tipo: "numerica", seccion: 5,
      variables: { a: [5, 30, 1], rho: [0.4, 0.95, 0.05] },
      enunciado: "Un cubo de madera de {a} cm de arista y densidad {rho} g/cm³ flota en agua con dos caras horizontales. ¿Cuántos centímetros de su altura quedan fuera del agua?",
      resolver: v => v.a * (1 - v.rho),
      unidad: "cm", tolerancia: 0.02, toleranciaAbs: 0.05,
      explicacion: v => `Altura sumergida: h = a·ρ_madera/ρ_agua = ${v.a}·${fmt(v.rho)} = ${fmt(v.a * v.rho)} cm.<br>Fuera del agua: ${v.a} − ${fmt(v.a * v.rho)} = <b>${fmt(v.a * (1 - v.rho))} cm</b>.` }
  ]
});
