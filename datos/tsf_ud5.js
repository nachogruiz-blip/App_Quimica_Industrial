// Transporte de sólidos y fluidos (0190) · UD5 Flujo de fluidos.
// Fuente: apuntes «U.D 5 Flujo de fluidos» y «Ejercicios U.D 5» (repo privado de materiales).
// Contenido redactado de nuevo; convenciones de los apuntes: g = 9,8 m/s², Re crítico 2000/4000, factor «4f» (= Darcy).
registrarUD({
  id: "tsf-ud5",
  modulo: "tsf",
  codigo: "UD5",
  titulo: "Flujo de fluidos",
  descripcion: "Régimen laminar/turbulento, Reynolds, Bernoulli generalizada, pérdidas de carga",
  guia: [
    {
      titulo: "1. Líneas de corriente y tipos de flujo",
      html: `
        <p>Cada partícula de un fluido que circula por una conducción sigue una trayectoria: su <b>línea de corriente</b>
        (o línea de flujo). El conjunto de líneas de corriente que rodean una pequeña superficie forma un <b>tubo de flujo</b>.</p>
        <ul>
          <li><b>Flujo laminar</b>: el fluido avanza en capas que se deslizan unas sobre otras sin mezclarse; el flujo es estable.</li>
          <li><b>Flujo turbulento</b>: con velocidades altas o cambios bruscos de geometría (codos, estrechamientos, obstáculos)
          el movimiento se vuelve caótico, con remolinos que mezclan las capas.</li>
        </ul>
        <p>En un fluido real, por la viscosidad, la velocidad es <b>máxima en el eje</b> de la tubería y mínima junto a las paredes.</p>`
    },
    {
      titulo: "2. Experiencia de Reynolds y número de Reynolds",
      html: `
        <p><b>Experiencia de Reynolds (1883)</b>: se inyecta colorante en agua que circula por un tubo de vidrio y se va abriendo
        la válvula. A baja velocidad el colorante forma un hilo fino (laminar); al superar una <b>velocidad crítica</b>
        el hilo empieza a ondular (transición); a velocidades mayores el colorante se mezcla en todo el tubo (turbulento).</p>
        <p class="clave"><b>Idea clave:</b> por debajo de la velocidad crítica la pérdida de presión es proporcional a <b>v</b>;
        por encima, es proporcional a <b>v²</b>.</p>
        <p>El <b>número de Reynolds</b> es adimensional y compara las fuerzas de inercia con las viscosas:</p>
        <div class="formula">Re = ρ · v · D / μ = v · D / ν</div>
        <ul>
          <li>ρ densidad (kg/m³) · v velocidad media = Q/A (m/s) · D diámetro (m) · μ viscosidad dinámica (Pa·s)</li>
          <li>ν = μ/ρ viscosidad cinemática (m²/s)</li>
        </ul>
        <table class="tabla">
          <tr><th>Re</th><th>Régimen</th><th>Características</th></tr>
          <tr><td>&lt; 2000</td><td>Laminar</td><td>Capas ordenadas; pérdidas ∝ v; no depende de la rugosidad</td></tr>
          <tr><td>2000 – 4000</td><td>Transición</td><td>Inestable</td></tr>
          <tr><td>&gt; 4000</td><td>Turbulento</td><td>Remolinos; pérdidas ∝ v², mucho mayores</td></tr>
        </table>
        <p><b>Velocidad crítica</b> (Re = 2000): <span class="formula" style="display:inline-block">v<sub>c</sub> = 2000 · μ / (ρ · D)</span></p>
        <p><b>Conducciones no circulares</b>: se usa el <b>diámetro hidráulico</b></p>
        <div class="formula">D<sub>H</sub> = 4 · A / P<sub>m</sub></div>
        <p>(A sección de paso, P<sub>m</sub> perímetro mojado). Rectángulo a×b lleno: D<sub>H</sub> = 2ab/(a+b).</p>
        <details><summary>Conversiones de unidades que aparecen en los problemas</summary>
          <ul>
            <li>1 cP (centipoise) = 10⁻³ Pa·s · 1 P (poise) = 0,1 Pa·s</li>
            <li>1 St (stokes) = 10⁻⁴ m²/s · 1 cSt = 10⁻⁶ m²/s (viscosidad cinemática)</li>
            <li>1 g/cm³ = 1000 kg/m³ · 1 pulgada (in) = 2,54 cm</li>
            <li>1 L/min = 1/60 000 m³/s · 1 m³/h = 1/3600 m³/s · km/h ÷ 3,6 = m/s</li>
            <li>Si te dan caudal másico: Q = ṁ/ρ</li>
          </ul>
        </details>
        <p class="clave"><b>Ojo:</b> un flujo puede parecer ordenado a simple vista y ser turbulento: lo que manda es el valor de Re.</p>`
    },
    {
      titulo: "3. Ecuación de Bernoulli generalizada",
      html: `
        <p>Es el balance de energía mecánica entre dos secciones, añadiendo la energía que aporta una bomba (w) y la que se pierde
        por rozamiento (h<sub>f</sub>). Todos los términos en <b>metros de columna de fluido</b>:</p>
        <div class="formula">h₁ + P₁/(ρg) + v₁²/(2g) + w = h₂ + P₂/(ρg) + v₂²/(2g) + h<sub>f</sub></div>
        <ul>
          <li>h: altura geométrica · P/(ρg): altura de presión · v²/(2g): altura cinética</li>
          <li>Válida para flujo permanente, fluido incompresible y energía interna constante.</li>
          <li>Superficie libre de un depósito grande: v ≈ 0. Abierto a la atmósfera: P = P<sub>atm</sub>.</li>
        </ul>
        <p><b>Potencia comunicada al fluido</b> (W):</p>
        <div class="formula">P = Q · ρ · g · w</div>
        <p><b>Rendimiento</b>: η = P<sub>teórica</sub> / P<sub>real</sub> · 100. La potencia que consume la bomba es
        P<sub>real</sub> = P<sub>teórica</sub>/η (siempre mayor). Si hay rendimiento mecánico e hidráulico, el global es su producto.</p>
        <p class="clave"><b>Idea clave:</b> si al despejar w sale negativo, el fluido circula solo (no hace falta bomba).</p>`
    },
    {
      titulo: "4. Pérdidas de carga. Ecuación de Darcy",
      html: `
        <p>El rozamiento convierte energía mecánica en calor y se traduce en una <b>caída de presión</b>. Tipos:</p>
        <ul>
          <li><b>Primarias</b>: en los tramos rectos (rozamiento con la pared y entre capas o partículas del fluido).</li>
          <li><b>Secundarias o menores</b>: en accesorios (válvulas, codos, tes, estrechamientos…). Despreciables en oleoductos
          largos, pero pueden ser las dominantes en instalaciones cortas con muchos accesorios.</li>
        </ul>
        <p><b>Ecuación de Darcy-Weisbach</b> (vale para laminar y turbulento):</p>
        <div class="formula">h<sub>f</sub> = 4f · (L/D) · v²/(2g)</div>
        <p>Las pérdidas crecen con L y con v, y disminuyen con D.</p>
        <h4>Régimen laminar: Hagen-Poiseuille</h4>
        <div class="formula">h<sub>f</sub> = 32 · μ · L · v / (ρ · g · D²)</div>
        <p>Fluido newtoniano, incompresible, flujo laminar estacionario. Pérdidas ∝ v y <b>sin influencia de la rugosidad</b>.
        Igualando con Darcy:</p>
        <div class="formula">4f = 64 / Re</div>`
    },
    {
      titulo: "5. Régimen turbulento: rugosidad y diagrama de Moody",
      html: `
        <p>No hay modelo teórico: el factor de fricción se obtiene de datos experimentales y depende de dos números adimensionales:</p>
        <div class="formula">4f = f(Re, ε/D)</div>
        <p><b>Rugosidad absoluta ε</b>: tamaño medio de las irregularidades de la pared (unidades de longitud). La
        <b>rugosidad relativa ε/D</b> es adimensional: ε y D en las mismas unidades.</p>
        <table class="tabla">
          <tr><th>Material (nuevo)</th><th>ε (mm)</th></tr>
          <tr><td>Vidrio, plástico</td><td>≈ 0</td></tr>
          <tr><td>Tubo estirado, latón, cobre</td><td>0,0015</td></tr>
          <tr><td>Acero comercial / soldado, hierro forjado</td><td>0,046</td></tr>
          <tr><td>Hierro fundido asfaltado</td><td>0,12</td></tr>
          <tr><td>Hierro galvanizado</td><td>0,15</td></tr>
          <tr><td>Hierro fundido</td><td>0,25</td></tr>
          <tr><td>Hormigón</td><td>0,3 – 3</td></tr>
        </table>
        <p class="sub">Valores habituales de tablas técnicas. Con el uso (corrosión, incrustaciones) la rugosidad aumenta.</p>
        <p><b>Ecuación de Colebrook</b> (4·10³ &lt; Re &lt; 10⁷), implícita, se resuelve iterando:</p>
        <div class="formula">1/√(4f) = −2 · log[ (ε/D)/3,7 + 2,51/(Re·√(4f)) ]</div>
        <p>En clase se usa el <b>diagrama de Moody</b> (4f frente a Re en escala logarítmica, una curva por cada ε/D):</p>
        <ul>
          <li>A Re fijo, 4f <b>aumenta</b> al aumentar ε/D.</li>
          <li>A ε/D fija, 4f <b>disminuye</b> al aumentar Re.</li>
          <li>A Re muy alto (turbulencia completa) 4f solo depende de ε/D.</li>
        </ul>
        <p class="clave"><b>Darcy vs Fanning:</b> f<sub>Darcy</sub> = 4 · f<sub>Fanning</sub>. En los apuntes se escribe
        h<sub>f</sub> = 4f(L/D)(v²/2g), es decir, «4f» es el factor de Darcy que se lee en Moody. Comprueba siempre qué factor usa el diagrama.</p>
        <p class="sub">En esta app, cuando hace falta 4f en turbulento se calcula con Colebrook; tu lectura en Moody puede diferir
        unos puntos porcentuales y se acepta un margen del 10 %.</p>`
    },
    {
      titulo: "6. Pérdidas secundarias: longitud equivalente",
      html: `
        <p>Cada accesorio (válvula, codo, te, entrada desde depósito, estrechamiento o ensanchamiento…) se sustituye por la
        <b>longitud de tubería recta del mismo diámetro</b> que produciría la misma pérdida: su <b>longitud equivalente</b> L<sub>eq</sub>
        (se obtiene de tablas o nomogramas).</p>
        <div class="formula">L = L₀ + ΣL<sub>eq</sub> &nbsp;→&nbsp; h<sub>f</sub> = 4f · (L/D) · v²/(2g)</div>
        <p>L₀ es la longitud real de los tramos rectos. Si hay tramos de distinto diámetro, se calcula cada tramo por separado
        (v, Re y 4f propios) y se suman las pérdidas.</p>`
    },
    {
      titulo: "7. Método para resolver problemas",
      html: `
        <ol>
          <li>Pasa todos los datos al SI (cP, St, g/cm³, pulgadas, L/min…).</li>
          <li>Velocidad: <b>v = Q / A</b>, con A = π·D²/4.</li>
          <li><b>Re = ρvD/μ</b> → régimen.</li>
          <li>Factor de fricción: laminar 4f = 64/Re; turbulento: ε/D (tabla) → Moody (o Colebrook).</li>
          <li>Longitud total L = L₀ + ΣL<sub>eq</sub> → <b>h<sub>f</sub></b> con Darcy.</li>
          <li>Elige las secciones 1 y 2 (superficies libres, salida, punto pedido) y aplica <b>Bernoulli generalizada</b>.</li>
          <li>Despeja la incógnita (w, P₂, Δh…). Si es una bomba: <b>P = Q·ρ·g·w</b> y divide entre el rendimiento.</li>
        </ol>
        <p class="clave"><b>Errores típicos:</b> usar el diámetro en cm o pulgadas; olvidar los accesorios en L; confundir
        Darcy y Fanning; olvidar v²/(2g) a la salida cuando el fluido sale a chorro.</p>`
    },
    {
      titulo: "8. Formulario",
      html: `
        <table class="tabla">
          <tr><td>Velocidad media</td><td>v = Q/A = 4Q/(πD²)</td></tr>
          <tr><td>Reynolds</td><td>Re = ρvD/μ = vD/ν</td></tr>
          <tr><td>Velocidad crítica</td><td>v<sub>c</sub> = 2000μ/(ρD)</td></tr>
          <tr><td>Diámetro hidráulico</td><td>D<sub>H</sub> = 4A/P<sub>m</sub></td></tr>
          <tr><td>Bernoulli generalizada</td><td>h₁ + P₁/ρg + v₁²/2g + w = h₂ + P₂/ρg + v₂²/2g + h<sub>f</sub></td></tr>
          <tr><td>Potencia</td><td>P = Q·ρ·g·w ; P<sub>real</sub> = P/η</td></tr>
          <tr><td>Darcy / Fanning</td><td>h<sub>f</sub> = 4f(L/D)(v²/2g)</td></tr>
          <tr><td>Hagen-Poiseuille</td><td>h<sub>f</sub> = 32μLv/(ρgD²)</td></tr>
          <tr><td>Laminar</td><td>4f = 64/Re</td></tr>
          <tr><td>Turbulento</td><td>4f = f(Re, ε/D): Moody o Colebrook</td></tr>
          <tr><td>Longitud total</td><td>L = L₀ + ΣL<sub>eq</sub></td></tr>
          <tr><td>Caída de presión</td><td>ΔP = ρ·g·h<sub>f</sub></td></tr>
        </table>`
    }
  ],

  preguntas: [
    // ---------- Conceptuales: test ----------
    { id: "tsf5-1", tipo: "test", seccion: 1,
      enunciado: "¿Qué es una línea de corriente?",
      opciones: ["La trayectoria que sigue una partícula del fluido al circular", "El borde interior de la tubería",
        "La línea que une puntos de igual presión", "El eje de simetría de la conducción"],
      correcta: 0,
      explicacion: "Cada partícula describe una trayectoria elemental: esa es su línea de corriente o de flujo. Varias líneas que rodean un área forman un tubo de flujo." },
    { id: "tsf5-2", tipo: "test", seccion: 1,
      enunciado: "En un fluido real circulando por una tubería, ¿dónde es mayor la velocidad?",
      opciones: ["En el eje de la tubería", "Junto a la pared", "Es igual en toda la sección", "Depende solo de la rugosidad"],
      correcta: 0,
      explicacion: "La viscosidad frena al fluido junto a la pared; la velocidad es máxima en el centro." },
    { id: "tsf5-3", tipo: "test", seccion: 2,
      enunciado: "El número de Reynolds relaciona…",
      opciones: ["Fuerzas de inercia y fuerzas viscosas", "Presión y velocidad", "Energía potencial y cinética", "Rugosidad y diámetro"],
      correcta: 0,
      explicacion: "Re = ρvD/μ: el numerador representa la inercia y el denominador la viscosidad. Re alto → domina la inercia → turbulencia." },
    { id: "tsf5-4", tipo: "test", seccion: 2,
      enunciado: "Un fluido circula con Re = 3000. Según los apuntes, el régimen es…",
      opciones: ["De transición", "Laminar", "Turbulento", "Crítico estacionario"],
      correcta: 0,
      explicacion: "Laminar si Re < 2000, turbulento si Re > 4000; entre ambos valores, transición." },
    { id: "tsf5-5", tipo: "test", seccion: 2,
      enunciado: "Si aumentamos la viscosidad del fluido manteniendo todo lo demás igual…",
      opciones: ["Re disminuye y es más fácil el régimen laminar", "Re aumenta y aparece turbulencia",
        "Re no cambia", "Aumenta la rugosidad relativa"],
      correcta: 0,
      explicacion: "μ está en el denominador de Re. Más viscosidad amortigua los remolinos y favorece el flujo laminar." },
    { id: "tsf5-6", tipo: "test", seccion: 2,
      enunciado: "En la experiencia de Reynolds, por encima de la velocidad crítica la pérdida de presión es proporcional a…",
      opciones: ["v²", "v", "√v", "No depende de v"],
      correcta: 0,
      explicacion: "Por debajo de la velocidad crítica (laminar) ΔP ∝ v; por encima (turbulento) ΔP ∝ v²." },
    { id: "tsf5-7", tipo: "test", seccion: 2,
      enunciado: "Para calcular Re en una conducción de sección no circular se usa…",
      opciones: ["El diámetro hidráulico D_H = 4A/Pm", "El lado mayor de la sección", "El perímetro mojado", "El radio de la sección equivalente en área"],
      correcta: 0,
      explicacion: "D_H = 4 · radio hidráulico = 4 · (sección de paso / perímetro mojado). Para un tubo circular lleno, D_H = D." },
    { id: "tsf5-8", tipo: "test", seccion: 3,
      enunciado: "En la ecuación de Bernoulli generalizada, ¿qué representa w?",
      opciones: ["La energía aportada por una bomba, en metros de fluido", "Las pérdidas por rozamiento",
        "La velocidad del fluido", "El trabajo realizado por el fluido sobre una turbina, en vatios"],
      correcta: 0,
      explicacion: "w es la altura que la bomba comunica al fluido (m). Las pérdidas son h_f." },
    { id: "tsf5-9", tipo: "test", seccion: 3,
      enunciado: "Una bomba tiene rendimiento del 75 %. La potencia que consume respecto a la que recibe el fluido es…",
      opciones: ["Mayor: P_real = P_teórica / 0,75", "Menor: P_real = 0,75 · P_teórica", "Igual", "No se puede saber"],
      correcta: 0,
      explicacion: "η = P_teórica / P_real. Parte de la energía consumida se pierde, así que la bomba consume más de lo que entrega." },
    { id: "tsf5-10", tipo: "test", seccion: 4,
      enunciado: "Las pérdidas de carga producidas por válvulas, codos y tes se llaman…",
      opciones: ["Secundarias o menores", "Primarias", "Laminares", "Estáticas"],
      correcta: 0,
      explicacion: "Primarias: tramos rectos. Secundarias (menores): accesorios. En instalaciones cortas pueden superar a las primarias." },
    { id: "tsf5-11", tipo: "test", seccion: 4,
      enunciado: "Según Darcy, si se duplica el diámetro de la tubería con la misma velocidad y el mismo 4f, la pérdida de carga…",
      opciones: ["Se reduce a la mitad", "Se duplica", "Se reduce a la cuarta parte", "No cambia"],
      correcta: 0,
      explicacion: "h_f = 4f(L/D)(v²/2g): es inversamente proporcional a D a igualdad del resto." },
    { id: "tsf5-12", tipo: "test", seccion: 4,
      enunciado: "En régimen laminar, el factor de fricción vale…",
      opciones: ["4f = 64/Re", "4f = 16/Re", "4f = 0,02 siempre", "Se lee en Moody según ε/D"],
      correcta: 0,
      explicacion: "Igualando Darcy con Hagen-Poiseuille sale 4f = 64/Re. No depende de la rugosidad." },
    { id: "tsf5-13", tipo: "test", seccion: 5,
      enunciado: "En régimen turbulento, el factor de fricción depende de…",
      opciones: ["Re y la rugosidad relativa ε/D", "Solo de Re", "Solo de la longitud de la tubería", "Solo del caudal"],
      correcta: 0,
      explicacion: "4f = f(Re, ε/D). En turbulencia completa (Re muy alto) solo depende de ε/D." },
    { id: "tsf5-14", tipo: "test", seccion: 5,
      enunciado: "En el diagrama de Moody, para una rugosidad relativa fija, al aumentar Re el factor de fricción…",
      opciones: ["Disminuye (hasta hacerse constante a Re muy alto)", "Aumenta", "Se mantiene constante siempre", "Se hace 64/Re"],
      correcta: 0,
      explicacion: "Las curvas bajan al aumentar Re y se aplanan en la zona de turbulencia completa." },
    { id: "tsf5-15", tipo: "test", seccion: 5,
      enunciado: "¿Qué relación hay entre el factor de Darcy y el de Fanning?",
      opciones: ["f_Darcy = 4 · f_Fanning", "f_Fanning = 4 · f_Darcy", "Son iguales", "f_Darcy = 64 · f_Fanning"],
      correcta: 0,
      explicacion: "f_D = 4 f_F. En los apuntes, el «4f» de h_f = 4f(L/D)(v²/2g) es el factor de Darcy." },
    { id: "tsf5-16", tipo: "test", seccion: 6,
      enunciado: "El método de la longitud equivalente consiste en…",
      opciones: ["Sustituir cada accesorio por la longitud de tubería recta que produce la misma pérdida",
        "Sumar la longitud física de los accesorios a la tubería", "Ignorar los accesorios si hay más de 10",
        "Usar un diámetro mayor en los tramos con accesorios"],
      correcta: 0,
      explicacion: "L = L₀ + ΣL_eq; luego se aplica Darcy/Fanning con esa longitud total." },
    { id: "tsf5-17", tipo: "test", seccion: 5,
      enunciado: "¿Cuál de estos materiales tiene MENOR rugosidad absoluta?",
      opciones: ["Cobre / tubo estirado", "Acero comercial", "Hierro galvanizado", "Hormigón"],
      correcta: 0,
      explicacion: "Tubo estirado/cobre ≈ 0,0015 mm; acero comercial 0,046 mm; galvanizado 0,15 mm; hormigón 0,3–3 mm." },

    // ---------- Verdadero / falso ----------
    { id: "tsf5-18", tipo: "vf", seccion: 4,
      enunciado: "En régimen laminar, la pérdida de carga no depende de la rugosidad de la tubería.",
      correcta: true,
      explicacion: "Hagen-Poiseuille (h_f = 32μLv/ρgD²) no contiene ε. En laminar 4f = 64/Re." },
    { id: "tsf5-19", tipo: "vf", seccion: 2,
      enunciado: "Si a simple vista un flujo parece ordenado, es seguro que es laminar.",
      correcta: false,
      explicacion: "Puede ser turbulento sin remolinos visibles. Lo que decide es el valor de Re." },
    { id: "tsf5-20", tipo: "vf", seccion: 2,
      enunciado: "El número de Reynolds tiene unidades de m/s.",
      correcta: false,
      explicacion: "Es adimensional: se puede calcular en cualquier sistema mientras todas las magnitudes estén en el mismo." },
    { id: "tsf5-21", tipo: "vf", seccion: 3,
      enunciado: "La ecuación de Bernoulli generalizada expresa todos sus términos en metros de columna de fluido.",
      correcta: true,
      explicacion: "Alturas geométrica, de presión (P/ρg), cinética (v²/2g), de bomba (w) y pérdidas (h_f), todas en m." },
    { id: "tsf5-22", tipo: "vf", seccion: 5,
      enunciado: "Las rugosidades de las tablas corresponden a tubería nueva; con los años de servicio la rugosidad suele aumentar.",
      correcta: true,
      explicacion: "La corrosión y las incrustaciones aumentan las irregularidades de la pared." },
    { id: "tsf5-23", tipo: "vf", seccion: 5,
      enunciado: "La ecuación de Colebrook permite despejar directamente el factor de fricción.",
      correcta: false,
      explicacion: "Es implícita (4f aparece a ambos lados): se resuelve iterando o se usa el diagrama de Moody." },
    { id: "tsf5-24", tipo: "vf", seccion: 4,
      enunciado: "En oleoductos de muchos kilómetros, las pérdidas secundarias suelen ser despreciables frente a las primarias.",
      correcta: true,
      explicacion: "Con longitudes rectas enormes, los accesorios aportan poco. En instalaciones cortas puede ocurrir lo contrario." },
    { id: "tsf5-25", tipo: "vf", seccion: 3,
      enunciado: "Si al aplicar Bernoulli entre dos depósitos el valor de w sale negativo, hace falta una bomba más potente.",
      correcta: false,
      explicacion: "w < 0 significa que el desnivel basta para vencer las pérdidas: el fluido circula solo, sin bomba." },

    // ---------- Numéricas ----------
    { id: "tsf5-n1", tipo: "numerica", seccion: 2,
      variables: { rho: [800, 1200, 50], v: [0.5, 3, 0.1], Dcm: [2, 10, 1], mu: [0.001, 0.09, 0.001] },
      enunciado: "Un líquido (ρ = {rho} kg/m³, μ = {mu} Pa·s) circula a {v} m/s por una tubería de {Dcm} cm de diámetro. Calcula el número de Reynolds.",
      resolver: v => reynolds(v.rho, v.v, v.Dcm / 100, v.mu),
      unidad: "", tolerancia: 0.02,
      explicacion: v => { const Re = reynolds(v.rho, v.v, v.Dcm / 100, v.mu);
        return `D = ${fmt(v.Dcm / 100)} m. Re = ρvD/μ = ${fmt(v.rho)}·${fmt(v.v)}·${fmt(v.Dcm / 100)}/${fmt(v.mu)} = <b>${fmt(Re)}</b> → régimen ${regimen(Re)}.`; } },
    { id: "tsf5-n2", tipo: "numerica", seccion: 2,
      variables: { dens: [0.7, 1.3, 0.01], cP: [1, 50, 1], v: [0.5, 2.5, 0.1], pulg: [1, 10, 1] },
      enunciado: "Un fluido de densidad {dens} g/cm³ y viscosidad {cP} cP circula a {v} m/s por una tubería de {pulg} in de diámetro. ¿Cuánto vale Re?",
      resolver: v => reynolds(v.dens * 1000, v.v, v.pulg * 0.0254, v.cP / 1000),
      unidad: "", tolerancia: 0.02,
      explicacion: v => { const D = v.pulg * 0.0254, Re = reynolds(v.dens * 1000, v.v, D, v.cP / 1000);
        return `Al SI: ρ = ${fmt(v.dens * 1000)} kg/m³; μ = ${fmt(v.cP / 1000)} Pa·s; D = ${v.pulg}·0,0254 = ${fmt(D)} m.<br>Re = ${fmt(v.dens * 1000)}·${fmt(v.v)}·${fmt(D)}/${fmt(v.cP / 1000)} = <b>${fmt(Re)}</b> (${regimen(Re)}).`; } },
    { id: "tsf5-n3", tipo: "numerica", seccion: 2,
      variables: { QLmin: [10, 200, 5], Dcm: [1.5, 6, 0.5] },
      enunciado: "Circulan {QLmin} L/min de agua (ρ = 1000 kg/m³, μ = 10⁻³ Pa·s) por un tubo de {Dcm} cm de diámetro interno. Calcula Re.",
      resolver: v => { const D = v.Dcm / 100; return reynolds(1000, v.QLmin / 60000 / area(D), D, 1e-3); },
      unidad: "", tolerancia: 0.02,
      explicacion: v => { const D = v.Dcm / 100, Q = v.QLmin / 60000, vel = Q / area(D), Re = reynolds(1000, vel, D, 1e-3);
        return `Q = ${v.QLmin}/60000 = ${fmt(Q)} m³/s; A = π·${fmt(D)}²/4 = ${fmt(area(D))} m²; v = Q/A = ${fmt(vel)} m/s.<br>Re = 1000·${fmt(vel)}·${fmt(D)}/0,001 = <b>${fmt(Re)}</b> (${regimen(Re)}).`; } },
    { id: "tsf5-n4", tipo: "numerica", seccion: 2,
      variables: { rho: [800, 1200, 50], cP: [1, 100, 1], Dcm: [1, 10, 0.5] },
      enunciado: "¿Cuál es la velocidad crítica (Re = 2000) de un líquido con ρ = {rho} kg/m³ y μ = {cP} cP en una tubería de {Dcm} cm?",
      resolver: v => 2000 * (v.cP / 1000) / (v.rho * v.Dcm / 100),
      unidad: "m/s", tolerancia: 0.02,
      explicacion: v => `v_c = 2000·μ/(ρ·D) = 2000·${fmt(v.cP / 1000)}/(${v.rho}·${fmt(v.Dcm / 100)}) = <b>${fmt(2000 * (v.cP / 1000) / (v.rho * v.Dcm / 100))} m/s</b>` },
    { id: "tsf5-n5", tipo: "numerica", seccion: 2,
      variables: { a: [10, 60, 5], b: [10, 40, 5] },
      enunciado: "Un conducto rectangular de {a} cm × {b} cm circula lleno. Calcula su diámetro hidráulico.",
      resolver: v => 2 * v.a * v.b / (v.a + v.b),
      unidad: "cm", tolerancia: 0.02,
      explicacion: v => `D_H = 4A/P_m = 4·(${v.a}·${v.b})/(2·(${v.a}+${v.b})) = 2ab/(a+b) = <b>${fmt(2 * v.a * v.b / (v.a + v.b))} cm</b>` },
    { id: "tsf5-n6", tipo: "numerica", seccion: 2,
      variables: { St: [1, 20, 1], v: [0.5, 3, 0.1], Dcm: [5, 25, 1] },
      enunciado: "Un aceite de viscosidad cinemática {St} St circula a {v} m/s por una tubería de {Dcm} cm. Calcula Re.",
      resolver: v => v.v * (v.Dcm / 100) / (v.St * 1e-4),
      unidad: "", tolerancia: 0.02,
      explicacion: v => { const Re = v.v * (v.Dcm / 100) / (v.St * 1e-4);
        return `ν = ${v.St}·10⁻⁴ m²/s. Re = vD/ν = ${fmt(v.v)}·${fmt(v.Dcm / 100)}/${fmt(v.St * 1e-4)} = <b>${fmt(Re)}</b> (${regimen(Re)}).`; } },
    { id: "tsf5-n7", tipo: "numerica", seccion: 4,
      variables: { Re: [200, 1900, 50] },
      enunciado: "Un fluido circula en régimen laminar con Re = {Re}. ¿Cuánto vale el factor de fricción 4f?",
      resolver: v => 64 / v.Re,
      unidad: "", tolerancia: 0.02,
      explicacion: v => `Laminar: 4f = 64/Re = 64/${v.Re} = <b>${fmt(64 / v.Re)}</b>` },
    { id: "tsf5-n8", tipo: "numerica", seccion: 4,
      variables: { mu: [0.05, 0.5, 0.05], L: [10, 200, 10], v: [0.2, 1.5, 0.1], Dcm: [3, 10, 1], rho: [850, 950, 10] },
      enunciado: "Un aceite (ρ = {rho} kg/m³, μ = {mu} Pa·s) circula en régimen laminar a {v} m/s por {L} m de tubería de {Dcm} cm. Calcula la pérdida de carga con Hagen-Poiseuille.",
      resolver: v => 32 * v.mu * v.L * v.v / (v.rho * G * (v.Dcm / 100) ** 2),
      unidad: "m", tolerancia: 0.02,
      explicacion: v => { const D = v.Dcm / 100, h = 32 * v.mu * v.L * v.v / (v.rho * G * D * D);
        return `h_f = 32μLv/(ρgD²) = 32·${fmt(v.mu)}·${v.L}·${fmt(v.v)}/(${v.rho}·9,8·${fmt(D)}²) = <b>${fmt(h)} m</b> (Re = ${fmt(reynolds(v.rho, v.v, D, v.mu))}, laminar).`; } },
    { id: "tsf5-n9", tipo: "numerica", seccion: 4,
      variables: { f4: [0.015, 0.04, 0.001], L: [20, 500, 10], Dcm: [2, 15, 1], v: [0.5, 3, 0.1] },
      enunciado: "Agua circula a {v} m/s por {L} m de tubería de {Dcm} cm. Del diagrama de Moody se lee 4f = {f4}. Calcula la pérdida de carga h_f.",
      resolver: v => perdidaCarga(v.f4, v.L, v.Dcm / 100, v.v),
      unidad: "m", tolerancia: 0.02,
      explicacion: v => `h_f = 4f·(L/D)·v²/(2g) = ${fmt(v.f4)}·(${v.L}/${fmt(v.Dcm / 100)})·${fmt(v.v)}²/(2·9,8) = <b>${fmt(perdidaCarga(v.f4, v.L, v.Dcm / 100, v.v))} m</b>` },
    { id: "tsf5-n10", tipo: "numerica", seccion: 3,
      variables: { QLmin: [50, 500, 10], w: [5, 60, 1], rho: [800, 1200, 50] },
      enunciado: "Una bomba comunica w = {w} m a un caudal de {QLmin} L/min de un líquido de densidad {rho} kg/m³. ¿Qué potencia recibe el fluido?",
      resolver: v => v.QLmin / 60000 * v.rho * G * v.w,
      unidad: "W", tolerancia: 0.02,
      explicacion: v => `Q = ${fmt(v.QLmin / 60000)} m³/s. P = Q·ρ·g·w = ${fmt(v.QLmin / 60000)}·${v.rho}·9,8·${v.w} = <b>${fmt(v.QLmin / 60000 * v.rho * G * v.w)} W</b>` },
    { id: "tsf5-n11", tipo: "numerica", seccion: 3,
      variables: { Pt: [0.5, 20, 0.5], eta: [50, 90, 5] },
      enunciado: "Una bomba debe comunicar {Pt} kW al fluido y su rendimiento global es del {eta} %. ¿Qué potencia consume?",
      resolver: v => v.Pt / (v.eta / 100),
      unidad: "kW", tolerancia: 0.02,
      explicacion: v => `P_real = P_teórica/η = ${fmt(v.Pt)}/${fmt(v.eta / 100)} = <b>${fmt(v.Pt / (v.eta / 100))} kW</b>` },
    { id: "tsf5-n12", tipo: "numerica", seccion: 3,
      variables: { P1: [150, 400, 10], dz: [2, 15, 1], hf: [1, 10, 0.5], rho: [800, 1000, 50] },
      enunciado: "Por una tubería de diámetro constante circula un líquido (ρ = {rho} kg/m³). En el punto 1 la presión es {P1} kPa; el punto 2 está {dz} m más alto y entre ambos se pierden {hf} m por rozamiento. ¿Presión en el punto 2?",
      resolver: v => v.P1 - v.rho * G * (v.dz + v.hf) / 1000,
      unidad: "kPa", tolerancia: 0.02,
      explicacion: v => `Mismo diámetro → v₁ = v₂. Bernoulli: P₂ = P₁ − ρg(Δh + h_f) = ${v.P1} − ${v.rho}·9,8·(${v.dz} + ${fmt(v.hf)})/1000 = <b>${fmt(v.P1 - v.rho * G * (v.dz + v.hf) / 1000)} kPa</b>` },
    { id: "tsf5-n13", tipo: "numerica", seccion: 7,
      variables: { QLmin: [60, 150, 10], dz: [5, 20, 1], L0: [20, 80, 5], Leq: [3, 15, 1] },
      enunciado: "Se bombea agua (ρ = 1000 kg/m³, μ = 10⁻³ Pa·s) desde un lago a un depósito {dz} m más alto, con un caudal de {QLmin} L/min, por tubería de acero comercial (ε = 0,046 mm) de 2,43 cm de diámetro interno. Tramo recto: {L0} m; accesorios: {Leq} m de longitud equivalente. Calcula la potencia que la bomba comunica al agua (desprecia la altura cinética a la llegada si quieres; el margen admitido es del 10 %).",
      resolver: v => { const D = 0.0243, Q = v.QLmin / 60000, vel = Q / area(D), Re = reynolds(1000, vel, D, 1e-3);
        const hf = perdidaCarga(cuatroF(Re, 0.046e-3 / D), v.L0 + v.Leq, D, vel); return Q * 1000 * G * (v.dz + hf + vel * vel / (2 * G)); },
      unidad: "W", tolerancia: 0.10,
      explicacion: v => { const D = 0.0243, Q = v.QLmin / 60000, vel = Q / area(D), Re = reynolds(1000, vel, D, 1e-3), rr = 0.046e-3 / D;
        const f4 = cuatroF(Re, rr), L = v.L0 + v.Leq, hf = perdidaCarga(f4, L, D, vel), w = v.dz + hf + vel * vel / (2 * G);
        return `1) v = Q/A = ${fmt(Q)}/${fmt(area(D))} = ${fmt(vel)} m/s.<br>2) Re = 1000·${fmt(vel)}·0,0243/0,001 = ${fmt(Re)} → turbulento.<br>
          3) ε/D = 0,046/24,3 = ${fmt(rr)} → Moody/Colebrook: 4f ≈ ${fmt(f4, 3)}.<br>4) L = ${v.L0} + ${v.Leq} = ${L} m → h_f = ${fmt(f4, 3)}·(${L}/0,0243)·${fmt(vel)}²/19,6 = ${fmt(hf)} m.<br>
          5) Bernoulli (superficie del lago → llegada): w = Δh + h_f + v²/2g = ${v.dz} + ${fmt(hf)} + ${fmt(vel * vel / (2 * G))} = ${fmt(w)} m.<br>
          6) P = Q·ρ·g·w = <b>${fmt(Q * 1000 * G * w)} W</b>. (Problema tipo del ejercicio 4 de la relación.)`; } },
    { id: "tsf5-n14", tipo: "numerica", seccion: 5,
      variables: { v: [1, 3, 0.1], Dcm: [5, 20, 1], L: [100, 1000, 50] },
      enunciado: "Agua (ρ = 1000 kg/m³, μ = 10⁻³ Pa·s) circula a {v} m/s por {L} m de tubería de hierro galvanizado (ε = 0,15 mm) de {Dcm} cm de diámetro. Calcula la pérdida de carga (margen del 10 % por la lectura de Moody).",
      resolver: v => { const D = v.Dcm / 100, Re = reynolds(1000, v.v, D, 1e-3); return perdidaCarga(cuatroF(Re, 0.15e-3 / D), v.L, D, v.v); },
      unidad: "m", tolerancia: 0.10,
      explicacion: v => { const D = v.Dcm / 100, Re = reynolds(1000, v.v, D, 1e-3), rr = 0.15e-3 / D, f4 = cuatroF(Re, rr);
        return `Re = 1000·${fmt(v.v)}·${fmt(D)}/0,001 = ${fmt(Re)} (turbulento). ε/D = 0,15/${fmt(v.Dcm * 10)} = ${fmt(rr)} → 4f ≈ ${fmt(f4, 3)}.<br>
          h_f = ${fmt(f4, 3)}·(${v.L}/${fmt(D)})·${fmt(v.v)}²/19,6 = <b>${fmt(perdidaCarga(f4, v.L, D, v.v))} m</b>`; } },
    { id: "tsf5-n15", tipo: "numerica", seccion: 7,
      variables: { dz: [10, 40, 2], L: [300, 1500, 100], Qm3h: [20, 60, 2] },
      enunciado: "Un embalse alimenta por gravedad un depósito abierto situado {dz} m más abajo, mediante {L} m de tubería recta de acero comercial (ε = 0,046 mm) de 8 cm de diámetro. Se necesitan {Qm3h} m³/h de agua (μ = 10⁻³ Pa·s). Calcula w = h_f + v²/2g − Δh: si sale positivo hace falta una bomba que aporte esa altura (margen 10 %; responde con signo).",
      resolver: v => { const D = 0.08, vel = v.Qm3h / 3600 / area(D), Re = reynolds(1000, vel, D, 1e-3);
        return perdidaCarga(cuatroF(Re, 0.046e-3 / D), v.L, D, vel) + vel * vel / (2 * G) - v.dz; },
      unidad: "m", tolerancia: 0.10, toleranciaAbs: 1,
      explicacion: v => { const D = 0.08, vel = v.Qm3h / 3600 / area(D), Re = reynolds(1000, vel, D, 1e-3), f4 = cuatroF(Re, 0.046e-3 / D);
        const hf = perdidaCarga(f4, v.L, D, vel), w = hf + vel * vel / (2 * G) - v.dz;
        return `v = ${fmt(vel)} m/s; Re = ${fmt(Re)}; ε/D = ${fmt(0.046e-3 / D)} → 4f ≈ ${fmt(f4, 3)}; h_f = ${fmt(hf)} m.<br>
          w = ${fmt(hf)} + ${fmt(vel * vel / (2 * G))} − ${v.dz} = <b>${fmt(w)} m</b> → ${w > 0 ? "<b>sí</b> hace falta bomba" : "<b>no</b> hace falta bomba (el desnivel basta)"}.
          (Problema tipo del ejercicio 7.)`; } }
  ]
});
