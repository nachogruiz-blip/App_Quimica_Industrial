// Transporte de sólidos y fluidos (0190) · UD4 Dinámica de fluidos.
// Fuente: «Ejercicios U.D 4 Dinámica de fluidos» (repo privado de materiales). No hay apuntes de teoría de esta unidad:
// la guía resume la teoría general (fluido ideal) que usan esos ejercicios, redactada de nuevo, con la notación de la UD5
// (alturas: h + P/ρg + v²/2g; g = 9,8 m/s²).
registrarUD({
  id: "tsf-ud4",
  modulo: "tsf",
  codigo: "UD4",
  titulo: "Dinámica de fluidos",
  descripcion: "Caudal y continuidad, Bernoulli para fluidos ideales, Torricelli y tubo de Venturi",
  ejercicios: "Relación de ejercicios de la UD4",
  guia: [
    {
      titulo: "1. Caudal y ecuación de continuidad",
      apuntes: "No hay apuntes de teoría de la UD4: practica con la relación de ejercicios, problemas 1–5",
      html: `
        <p>El <b>caudal volumétrico</b> es el volumen que atraviesa una sección por unidad de tiempo; el <b>caudal
        másico</b>, la masa:</p>
        <div class="formula">Q = v · A &nbsp;&nbsp;&nbsp; ṁ = ρ · Q</div>
        <p>Para un fluido incompresible en régimen estacionario, lo que entra por una sección sale por la otra
        (<b>ecuación de continuidad</b>):</p>
        <div class="formula">A₁ · v₁ = A₂ · v₂ &nbsp;→&nbsp; v₂ = v₁ · (D₁ / D₂)²</div>
        <ul>
          <li>Si el diámetro se reduce a la mitad, la sección se divide entre 4 y la velocidad se multiplica por 4.</li>
          <li>Si una tubería se ramifica, el caudal se reparte: Q = Q₁ + Q₂ + …</li>
          <li>Unidades: 1 L/s = 10⁻³ m³/s; 1 L/min = 1/60 000 m³/s.</li>
        </ul>`
    },
    {
      titulo: "2. Ecuación de Bernoulli (fluido ideal)",
      apuntes: "No hay apuntes de teoría de la UD4: relación de ejercicios, problemas 6–11 y 16–19",
      html: `
        <p>En un fluido ideal (sin viscosidad ni pérdidas, incompresible y en régimen estacionario) la energía por unidad
        de peso se conserva a lo largo de una línea de corriente:</p>
        <div class="formula">h₁ + P₁/(ρg) + v₁²/(2g) = h₂ + P₂/(ρg) + v₂²/(2g)</div>
        <p>Cada término es una <b>altura</b> (m): geométrica, de presión y de velocidad. Multiplicando por ρ·g se escribe en
        presiones: P + ρ·g·h + ½·ρ·v² = constante.</p>
        <p class="clave"><b>Idea clave:</b> en un tubo horizontal, donde el fluido va más deprisa la presión es menor
        (por eso baja la presión en un estrechamiento). Es la versión sin pérdidas ni bomba de la Bernoulli generalizada de la UD5.</p>
        <p>Pasos: elige dos puntos donde conozcas casi todo (superficie libre, salida a la atmósfera…), toma un nivel de
        referencia para h, usa presiones del mismo tipo (todas absolutas o todas manométricas) y saca las velocidades por
        continuidad.</p>`
    },
    {
      titulo: "3. Teorema de Torricelli",
      apuntes: "No hay apuntes de teoría de la UD4: relación de ejercicios, problemas 6b, 7, 17 y 20",
      html: `
        <p>Un líquido que sale por un orificio situado a una profundidad h bajo la superficie libre de un depósito grande
        y abierto (velocidad de la superficie despreciable) sale con la velocidad de un cuerpo que cae libremente desde h:</p>
        <div class="formula">v = √(2 · g · h)</div>
        <ul>
          <li>Si el depósito está presurizado con una sobrepresión ΔP, se suma su altura equivalente: v = √(2g·(h + ΔP/(ρg))).</li>
          <li>Caudal de salida: Q = A<sub>orificio</sub> · v.</li>
          <li>Un chorro vertical que sale a velocidad v sube hasta h = v²/(2g); para llegar a una altura H hace falta v = √(2gH).</li>
        </ul>`
    },
    {
      titulo: "4. Tubo de Venturi",
      apuntes: "No hay apuntes de teoría de la UD4: relación de ejercicios, problemas 12–15",
      html: `
        <p>Un <b>venturímetro</b> mide el caudal con un estrechamiento (garganta). Al acelerarse el fluido en la garganta,
        su presión baja; midiendo la diferencia de presión ΔP = P₁ − P₂ se obtiene la velocidad. Combinando Bernoulli
        (tubo horizontal) y continuidad:</p>
        <div class="formula">v₂ = √( 2·ΔP / ( ρ · (1 − (A₂/A₁)²) ) ) &nbsp;&nbsp; Q = A₂ · v₂</div>
        <p>Si ΔP se lee con un <b>manómetro diferencial de mercurio</b> de desnivel h:</p>
        <div class="formula">ΔP = (ρ<sub>Hg</sub> − ρ) · g · h</div>
        <p class="clave"><b>Idea clave:</b> se resta la densidad del fluido que circula, porque también llena las ramas del
        manómetro por encima del mercurio.</p>`
    },
    {
      titulo: "5. Formulario",
      apuntes: "Resumen de las fórmulas que usa la relación de ejercicios de la UD4",
      html: `
        <table class="tabla">
          <tr><td>Caudal</td><td>Q = v·A ; ṁ = ρ·Q</td></tr>
          <tr><td>Continuidad</td><td>A₁v₁ = A₂v₂ ; Q = ΣQ<sub>i</sub> en ramificaciones</td></tr>
          <tr><td>Bernoulli (ideal)</td><td>h + P/(ρg) + v²/(2g) = constante</td></tr>
          <tr><td>Torricelli</td><td>v = √(2gh)</td></tr>
          <tr><td>Altura de un chorro</td><td>h = v²/(2g)</td></tr>
          <tr><td>Venturi</td><td>v₂ = √(2ΔP/(ρ(1 − (A₂/A₁)²))) ; Q = A₂v₂</td></tr>
          <tr><td>Manómetro diferencial</td><td>ΔP = (ρ<sub>m</sub> − ρ)·g·h</td></tr>
        </table>`
    }
  ],

  preguntas: [
    // ---------- Conceptuales ----------
    { id: "tsf4-1", tipo: "test", seccion: 1,
      enunciado: "Por una tubería circula agua. Si en un tramo el diámetro se reduce a la mitad, la velocidad en ese tramo…",
      opciones: ["Se multiplica por 4", "Se duplica", "Se reduce a la mitad", "No cambia"],
      correcta: 0,
      explicacion: "Continuidad: v₂ = v₁·(D₁/D₂)² = v₁·2² = 4·v₁. La sección depende del cuadrado del diámetro." },
    { id: "tsf4-2", tipo: "test", seccion: 2,
      enunciado: "Según la ecuación de Bernoulli para un fluido ideal, ¿qué se mantiene constante a lo largo de una línea de corriente?",
      opciones: ["La suma de las alturas geométrica, de presión y de velocidad", "El caudal multiplicado por la presión",
        "La presión y la temperatura", "Las pérdidas de carga"],
      correcta: 0,
      explicacion: "h + P/(ρg) + v²/(2g) = constante: la energía por unidad de peso se conserva si no hay pérdidas ni máquinas." },
    { id: "tsf4-3", tipo: "vf", seccion: 2,
      enunciado: "En un tubo horizontal, en el tramo donde el fluido va más rápido la presión es mayor.",
      correcta: false,
      explicacion: "Es al revés: con h constante, si aumenta v²/(2g) tiene que disminuir P/(ρg). En un estrechamiento la presión baja." },
    { id: "tsf4-4", tipo: "test", seccion: 3,
      enunciado: "Un depósito grande y abierto tiene un orificio a una profundidad h. ¿Con qué velocidad sale el líquido (Torricelli)?",
      opciones: ["√(2gh), igual que un cuerpo que cae desde la altura h", "2gh", "gh/2", "Depende de la densidad del líquido"],
      correcta: 0,
      explicacion: "Bernoulli entre la superficie (P_atm, v ≈ 0) y el orificio (P_atm): h = v²/(2g) → v = √(2gh). La densidad se cancela." },
    { id: "tsf4-5", tipo: "vf", seccion: 4,
      enunciado: "En un tubo de Venturi, la presión en la garganta (estrechamiento) es menor que en la entrada.",
      correcta: true,
      explicacion: "En la garganta la sección es menor y la velocidad mayor; por Bernoulli, la presión baja. Esa diferencia de presión es la que se mide." },

    // ---------- Numéricas ----------
    { id: "tsf4-n1", tipo: "numerica", seccion: 1,
      variables: { Q: [1, 20, 0.5], D: [3, 15, 0.5] },
      enunciado: "Se bombean {Q} L/s de aceite por un tubo de {D} cm de diámetro interior. ¿A qué velocidad circula?",
      resolver: v => (v.Q / 1000) / area(v.D / 100),
      unidad: "m/s", tolerancia: 0.02,
      explicacion: v => `Q = ${fmt(v.Q / 1000)} m³/s; A = π·${fmt(v.D / 100)}²/4 = ${fmt(area(v.D / 100))} m².<br>v = Q/A = <b>${fmt((v.Q / 1000) / area(v.D / 100))} m/s</b>.` },
    { id: "tsf4-n2", tipo: "numerica", seccion: 1,
      variables: { v1: [0.5, 2.5, 0.1], D1: [3, 6, 0.5], D2: [1.5, 2.5, 0.5] },
      enunciado: "Por una manguera de {D1} cm de diámetro sale agua a {v1} m/s hacia una boquilla de {D2} cm. ¿A qué velocidad sale el agua por la boquilla?",
      resolver: v => v.v1 * (v.D1 / v.D2) ** 2,
      unidad: "m/s", tolerancia: 0.02,
      explicacion: v => `Continuidad: v₂ = v₁·(D₁/D₂)² = ${fmt(v.v1)}·(${fmt(v.D1)}/${fmt(v.D2)})² = <b>${fmt(v.v1 * (v.D1 / v.D2) ** 2)} m/s</b>.` },
    { id: "tsf4-n3", tipo: "numerica", seccion: 1,
      variables: { rho: [0.8, 1.2, 0.05], vel: [0.3, 3, 0.1], D: [5, 30, 1] },
      enunciado: "Un líquido de densidad {rho} g/cm³ circula a {vel} m/s por una tubería de {D} cm de diámetro interior. Calcula el caudal másico.",
      resolver: v => v.rho * 1000 * v.vel * area(v.D / 100),
      unidad: "kg/s", tolerancia: 0.02,
      explicacion: v => { const Q = v.vel * area(v.D / 100);
        return `Q = v·A = ${fmt(v.vel)}·π·${fmt(v.D / 100)}²/4 = ${fmt(Q)} m³/s.<br>ṁ = ρ·Q = ${fmt(v.rho * 1000)}·${fmt(Q)} = <b>${fmt(v.rho * 1000 * Q)} kg/s</b>.`; } },
    { id: "tsf4-n4", tipo: "numerica", seccion: 2,
      variables: { P1: [150, 400, 10], v1: [0.5, 1.5, 0.1], D1: [4, 8, 1], D2: [3, 4, 0.5] },
      enunciado: "Por un tubo horizontal circula agua. En el punto 1 (diámetro {D1} cm) la velocidad es {v1} m/s y la presión {P1} kPa; en el punto 2 el diámetro es {D2} cm. Calcula la presión en el punto 2 en kPa.",
      resolver: v => { const v2 = v.v1 * (v.D1 / v.D2) ** 2; return v.P1 + 0.5 * 1000 * (v.v1 ** 2 - v2 ** 2) / 1000; },
      unidad: "kPa", tolerancia: 0.02, toleranciaAbs: 0.5,
      explicacion: v => { const v2 = v.v1 * (v.D1 / v.D2) ** 2, P2 = v.P1 + 0.5 * (v.v1 ** 2 - v2 ** 2);
        return `Continuidad: v₂ = ${fmt(v.v1)}·(${v.D1}/${fmt(v.D2)})² = ${fmt(v2)} m/s.<br>Bernoulli (h₁ = h₂): P₂ = P₁ + ½ρ(v₁² − v₂²) = ${v.P1}·10³ + ½·1000·(${fmt(v.v1)}² − ${fmt(v2)}²) = ${fmt(P2 * 1000)} Pa = <b>${fmt(P2)} kPa</b>.`; } },
    { id: "tsf4-n5", tipo: "numerica", seccion: 3,
      variables: { h: [0.5, 8, 0.1], r: [0.5, 5, 0.5] },
      enunciado: "Un depósito grande y abierto tiene un orificio circular de {r} cm de radio situado {h} m por debajo de la superficie del agua. ¿Qué caudal sale, en L/s?",
      resolver: v => Math.PI * (v.r / 100) ** 2 * Math.sqrt(2 * G * v.h) * 1000,
      unidad: "L/s", tolerancia: 0.02,
      explicacion: v => { const vel = Math.sqrt(2 * G * v.h), A = Math.PI * (v.r / 100) ** 2;
        return `Torricelli: v = √(2·9,8·${fmt(v.h)}) = ${fmt(vel)} m/s.<br>A = π·${fmt(v.r / 100)}² = ${fmt(A)} m².<br>Q = A·v = ${fmt(A * vel)} m³/s = <b>${fmt(A * vel * 1000)} L/s</b>.`; } },
    { id: "tsf4-n6", tipo: "numerica", seccion: 3,
      variables: { H: [5, 40, 1] },
      enunciado: "Con una manguera se quiere lanzar un chorro de agua vertical hasta {H} m por encima de la boquilla. ¿Con qué velocidad mínima debe salir el agua?",
      resolver: v => Math.sqrt(2 * G * v.H),
      unidad: "m/s", tolerancia: 0.02,
      explicacion: v => `En el punto más alto v = 0: v²/(2g) = H → v = √(2·9,8·${v.H}) = <b>${fmt(Math.sqrt(2 * G * v.H))} m/s</b>.` },
    { id: "tsf4-n7", tipo: "numerica", seccion: 4,
      variables: { h: [5, 40, 1], D1: [10, 30, 1], D2: [4, 8, 1] },
      enunciado: "Un venturímetro por el que circula agua tiene {D1} cm de diámetro a la entrada y {D2} cm en la garganta. El manómetro diferencial de mercurio (13,6 g/cm³) marca {h} cm. ¿Qué caudal circula, en L/s?",
      resolver: v => { const dP = (13600 - 1000) * G * v.h / 100, r = (v.D2 / v.D1) ** 2;
        return area(v.D2 / 100) * Math.sqrt(2 * dP / (1000 * (1 - r * r))) * 1000; },
      unidad: "L/s", tolerancia: 0.02,
      explicacion: v => { const dP = (13600 - 1000) * G * v.h / 100, r = (v.D2 / v.D1) ** 2, v2 = Math.sqrt(2 * dP / (1000 * (1 - r * r))), A2 = area(v.D2 / 100);
        return `ΔP = (13 600 − 1000)·9,8·${fmt(v.h / 100)} = ${fmt(dP)} Pa.<br>A₂/A₁ = (${v.D2}/${v.D1})² = ${fmt(r)}.<br>v₂ = √(2·${fmt(dP)}/(1000·(1 − ${fmt(r)}²))) = ${fmt(v2)} m/s.<br>Q = A₂·v₂ = ${fmt(A2)}·${fmt(v2)} = ${fmt(A2 * v2)} m³/s = <b>${fmt(A2 * v2 * 1000)} L/s</b>.`; } }
  ]
});
