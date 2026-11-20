// Transporte de sólidos y fluidos (0190) · UD7 Transporte de gases industriales.
// Fuente: apuntes «U.D 7 Gases industriales» y presentación de recursos adicionales (repo privado de materiales).
// Contenido redactado de nuevo. La sección 6 (cálculos de compresión) es ampliación de teoría general: no está en los apuntes.
registrarUD({
  id: "tsf-ud7",
  modulo: "tsf",
  codigo: "UD7",
  titulo: "Gases industriales",
  descripcion: "Tipos de compresión, compresores alternativos, rotativos y dinámicos, eyectores, ventiladores y soplantes",
  guia: [
    {
      titulo: "1. Compresión de gases",
      apuntes: "Apuntes UD7, apartados 1 y 2 (págs. 1–2)",
      html: `
        <p>Un <b>compresor</b> aporta energía a un fluido compresible (gas o vapor) y lo descarga a una presión P₂ mayor
        que la de admisión P₁. La energía la da un motor eléctrico o una turbina de vapor.</p>
        <ul>
          <li><b>Compresión isotérmica</b>: la temperatura no cambia (hay que ir retirando el calor). Es la que menos trabajo necesita.</li>
          <li><b>Compresión adiabática</b>: el gas no intercambia calor con el exterior y se calienta. Es ideal: en la
            práctica solo se aproxima.</li>
          <li><b>Compresión politrópica</b>: la compresión real, entre las dos anteriores.</li>
        </ul>
        <h4>Diagrama del indicador (P–V) de un compresor alternativo</h4>
        <p>Si se ignoran las pequeñas oscilaciones de presión en las válvulas, el ciclo queda en cuatro líneas:</p>
        <ul>
          <li><b>4–1 aspiración</b>, a la presión de admisión constante.</li>
          <li><b>1–2 compresión</b>.</li>
          <li><b>2–3 descarga</b>, a la presión de descarga constante.</li>
          <li><b>3–4 reexpansión</b> del gas que queda en el espacio muerto.</li>
        </ul>`
    },
    {
      titulo: "2. Compresores alternativos",
      apuntes: "Apuntes UD7, apartado 3 y 3.1 (págs. 3–4); recursos adicionales, diapositiva 2",
      html: `
        <p>Los compresores se dividen en dos grupos: de <b>desplazamiento positivo</b> (flujo intermitente: alternativos y
        rotativos) y <b>dinámicos</b> (flujo continuo: centrífugos y axiales).</p>
        <p>En el <b>alternativo</b> (de pistón) una cantidad de gas queda encerrada en el cilindro y el pistón la comprime
        hasta que su presión abre la válvula de descarga.</p>
        <ul>
          <li><b>Simple efecto</b>: solo trabaja una cara del pistón.</li>
          <li><b>Doble efecto</b>: trabajan las dos caras, como dos cilindros de simple efecto en paralelo en una misma carcasa.</li>
        </ul>
        <h4>Ciclo de trabajo</h4>
        <ol>
          <li><b>Admisión</b>: se abre la válvula de admisión (antes hay que vencer su inercia con una pequeña depresión) y entra gas.</li>
          <li><b>Compresión</b>: con las dos válvulas cerradas, el pistón comprime el gas.</li>
          <li><b>Expulsión</b>: al alcanzar la presión de apertura se abre la válvula de descarga y el pistón barre el gas.</li>
          <li><b>Retroceso</b>: el pistón vuelve, pero no entra gas nuevo hasta que se reexpande el que quedó en el
            <b>espacio muerto</b> y la presión baja lo suficiente.</li>
        </ol>`
    },
    {
      titulo: "3. Compresores rotativos",
      apuntes: "Apuntes UD7, apartados 3.2 a 3.2.3 (págs. 5–6); recursos adicionales, diapositivas 3–5",
      html: `
        <p>El papel del pistón lo hace un <b>rotor</b> que gira de forma continua. Combinan la cámara que crece y luego se
        reduce del alternativo con la sencillez del giro. <b>No tienen válvulas</b> de admisión ni de impulsión y son muy
        sensibles a la entrada de líquido, por eso llevan una botella de aspiración. Al subir la contrapresión aumentan las
        fugas internas y el caudal cae.</p>
        <table class="tabla">
          <tr><th>Tipo</th><th>Cómo funciona</th><th>Uso</th></tr>
          <tr><td>Tornillo (hélice)</td><td>Dos tornillos, macho y hembra, giran en sentidos contrarios; el gas avanza en
            línea recta por cámaras cada vez más pequeñas</td><td>Aire comprimido industrial</td></tr>
          <tr><td>Lóbulos (émbolos rotativos)</td><td>Dos rotores de 2 o 3 lóbulos sincronizados desplazan el gas; la
            presión la impone la contrapresión de salida</td><td>Soplantes de baja presión (menos de unos 2 bar):
            transporte neumático, cementeras</td></tr>
          <tr><td>Paletas o pistón líquido</td><td>Rotor excéntrico con paletas; el gas entre dos paletas se comprime al
            reducirse el espacio. La versión de pistón líquido usa agua que la fuerza centrífuga lanza contra la carcasa</td>
            <td>No comprime hasta alcanzar la velocidad de régimen</td></tr>
        </table>`
    },
    {
      titulo: "4. Compresores dinámicos y eyectores",
      apuntes: "Apuntes UD7, apartados 3.2.4 y 3.2.5 (págs. 7–8); recursos adicionales, diapositivas 6–7",
      html: `
        <p>Los <b>centrífugos</b> funcionan como las bombas centrífugas: el rodete da energía cinética al gas y el difusor
        o voluta la convierte en presión. Rinden mejor con <b>gases de mayor masa molecular</b>, porque la fuerza
        centrífuga es proporcional a la masa de las moléculas.</p>
        <ul>
          <li><b>Radiales</b>: el gas sale hacia fuera desde el centro, girando 90°.</li>
          <li><b>Axiales</b>: el gas avanza paralelo al eje.</li>
          <li><b>Mixtos</b>: combinan los dos.</li>
        </ul>
        <p>No tienen carrera de admisión ni de reexpansión: el gas entra a v₁ y P₁ y sale más despacio (v₂ &lt; v₁) y a más presión (P₂ &gt; P₁).</p>
        <h4>Eyectores</h4>
        <p>Un <b>fluido motriz</b> a gran velocidad arrastra al gas que se quiere comprimir y crea vacío en la aspiración.
        No tienen piezas móviles. Partes: <b>tobera</b> (acelera el fluido motriz), <b>cámara de succión</b> (se mezcla con el
        gas aspirado) y <b>difusor</b> (frena la mezcla y la velocidad se convierte en presión). El fluido motriz más usado
        es el <b>vapor de agua seco</b>: barato y fácil de recuperar con condensadores.</p>`
    },
    {
      titulo: "5. Ventiladores y soplantes",
      apuntes: "Apuntes UD7, apartado 4 (págs. 8–10); recursos adicionales, diapositivas 8–11",
      html: `
        <p>Ventiladores, soplantes y compresores suben la presión de un gas; se diferencian en la presión a la que trabajan.
        En orden creciente: <b>ventiladores &lt; soplantes &lt; compresores</b>. Los apuntes dan como referencia:
        ventiladores del orden de 1–2 atm, soplantes de 2 a 4 atm y compresores por encima de 4 atm.</p>
        <h4>Ventiladores</h4>
        <p>Mueven <b>grandes caudales a baja presión</b>, sin compresión apreciable: torres de refrigeración, ventilación y
        climatización, secaderos, extracción de humos. Pueden ser <b>axiales</b> (aspas sobre un eje paralelo al flujo, como
        un ventilador doméstico) o <b>centrífugos</b> (como una bomba centrífuga, eje perpendicular al flujo).</p>
        <h4>Soplantes («compresores de baja presión», hasta unas 4 atm)</h4>
        <ul>
          <li><b>De desplazamiento positivo</b> (lóbulos, tornillo, paletas): volumen constante; el caudal solo se regula
            con la velocidad de giro o recirculando gas.</li>
          <li><b>Centrífugas</b> o turbosoplantes: como las bombas centrífugas, a gran velocidad de giro.</li>
          <li><b>Axiales</b>: varias coronas de paletas móviles y fijas; caudales muy altos a baja presión (altos hornos, túneles de viento).</li>
          <li><b>De anillo líquido</b>: el líquido comprime el gas y lo refrigera; son muy buenas <b>bombas de vacío</b>.</li>
        </ul>`
    },
    {
      titulo: "6. Cálculos básicos de compresión (ampliación)",
      apuntes: "No está en los apuntes de la UD7: ampliación de teoría general para practicar",
      html: `
        <p>Estas fórmulas no aparecen en los apuntes, pero ayudan a entender las diferencias entre los tipos de compresión.
        Siempre con <b>presiones y temperaturas absolutas</b> (T en K = °C + 273).</p>
        <ul>
          <li><b>Relación de compresión</b>: r = P₂/P₁ (absolutas). Si la descarga se da en presión manométrica, súmale la atmosférica.</li>
          <li><b>Trabajo isotérmico</b> para comprimir un volumen V₁ aspirado a P₁: W = P₁·V₁·ln(P₂/P₁).</li>
          <li><b>Temperatura tras una compresión adiabática</b>: T₂ = T₁·(P₂/P₁)<sup>(γ−1)/γ</sup>, con γ = 1,4 para el aire.</li>
        </ul>
        <p class="clave"><b>Idea clave:</b> en la compresión adiabática el gas se calienta mucho; por eso los compresores de
        varias etapas enfrían el gas entre etapas, acercándose a la isotérmica y ahorrando trabajo.</p>`
    }
  ],

  preguntas: [
    // ---------- Conceptuales ----------
    { id: "tsf7-1", tipo: "test", seccion: 1,
      enunciado: "¿Cómo se llama la compresión en la que el gas no intercambia calor con el exterior?",
      opciones: ["Adiabática", "Isotérmica", "Politrópica", "Isobárica"],
      correcta: 0,
      explicacion: "Adiabática: sin aporte ni eliminación de calor (sistema perfectamente aislado). Es una idealización; la real es la politrópica." },
    { id: "tsf7-2", tipo: "test", seccion: 1,
      enunciado: "La compresión de un gas en condiciones reales (no ideales) se llama…",
      opciones: ["Politrópica", "Isotérmica", "Adiabática", "Isocórica"],
      correcta: 0,
      explicacion: "La isotérmica y la adiabática son casos ideales; la compresión real queda entre ambas y se llama politrópica." },
    { id: "tsf7-3", tipo: "test", seccion: 1,
      enunciado: "En el diagrama convencional del indicador de un compresor alternativo, ¿qué representa la línea 3–4?",
      opciones: ["La reexpansión del gas que queda en el espacio muerto", "La aspiración a presión constante",
        "La descarga a presión constante", "La compresión"],
      correcta: 0,
      explicacion: "4–1 aspiración, 1–2 compresión, 2–3 descarga y 3–4 reexpansión del gas atrapado en el espacio muerto." },
    { id: "tsf7-4", tipo: "test", seccion: 2,
      enunciado: "Un compresor alternativo de doble efecto…",
      opciones: ["Comprime con las dos caras del pistón, como dos de simple efecto en paralelo", "Tiene dos etapas de compresión en serie",
        "Usa dos rotores que giran en sentido contrario", "Comprime dos gases distintos a la vez"],
      correcta: 0,
      explicacion: "En el de simple efecto solo trabaja una cara del pistón; en el de doble efecto, las dos, dentro de la misma carcasa." },
    { id: "tsf7-5", tipo: "vf", seccion: 2,
      enunciado: "Al terminar la descarga de un compresor alternativo, el cilindro queda totalmente vacío de gas.",
      correcta: false,
      explicacion: "Siempre queda gas en el espacio muerto. Al retroceder el pistón, ese gas se reexpande antes de que pueda entrar gas nuevo." },
    { id: "tsf7-6", tipo: "test", seccion: 3,
      enunciado: "Los compresores rotativos de lóbulos se usan sobre todo como…",
      opciones: ["Soplantes de baja presión, por ejemplo para transporte neumático", "Compresores de muy alta presión",
        "Bombas de líquidos viscosos", "Turbinas para generar electricidad"],
      correcta: 0,
      explicacion: "Los lóbulos solo desplazan el gas; la presión la marca la contrapresión de salida. Trabajan a presiones bajas (menos de unos 2 bar)." },
    { id: "tsf7-7", tipo: "vf", seccion: 3,
      enunciado: "Los compresores rotativos tienen válvulas de admisión y de impulsión, igual que los alternativos.",
      correcta: false,
      explicacion: "Los rotativos no tienen válvulas: el giro del rotor abre y cierra las cámaras. Por eso, al subir la contrapresión, aumentan las fugas hacia la aspiración." },
    { id: "tsf7-8", tipo: "test", seccion: 3,
      enunciado: "Los compresores rotativos llevan una botella de aspiración porque son muy sensibles a…",
      opciones: ["La entrada de líquido (golpes de líquido)", "El polvo del aire", "Las temperaturas bajas", "Los cambios de caudal"],
      correcta: 0,
      explicacion: "Un líquido no se puede comprimir: si entra en las cámaras puede dañar el rotor. La botella de aspiración lo retiene." },
    { id: "tsf7-9", tipo: "test", seccion: 4,
      enunciado: "¿Con qué gases rinden mejor los compresores centrífugos?",
      opciones: ["Con gases de mayor masa molecular", "Con gases muy ligeros, como el hidrógeno", "Con mezclas de gas y líquido", "Con gases a muy baja temperatura"],
      correcta: 0,
      explicacion: "La fuerza centrífuga que comunica el rodete es proporcional a la masa de las moléculas: con gases pesados se consigue más presión." },
    { id: "tsf7-10", tipo: "test", seccion: 4,
      enunciado: "¿Cuáles son las partes principales de un eyector?",
      opciones: ["Tobera, cámara de succión y difusor", "Pistón, cilindro y válvulas", "Rodete y voluta", "Tornillos macho y hembra"],
      correcta: 0,
      explicacion: "La tobera acelera el fluido motriz, en la cámara de succión arrastra al gas y en el difusor la velocidad se convierte en presión. No tiene piezas móviles." },
    { id: "tsf7-11", tipo: "vf", seccion: 4,
      enunciado: "El fluido motriz más usado en los eyectores es el vapor de agua.",
      correcta: true,
      explicacion: "Es barato, se recupera fácilmente con condensadores y es compatible con casi todos los gases. Se usa vapor seco para un buen rendimiento." },
    { id: "tsf7-12", tipo: "test", seccion: 5,
      enunciado: "Ordena de menor a mayor presión de trabajo:",
      opciones: ["Ventiladores < soplantes < compresores", "Soplantes < ventiladores < compresores",
        "Compresores < soplantes < ventiladores", "Ventiladores < compresores < soplantes"],
      correcta: 0,
      explicacion: "Los ventiladores mueven mucho caudal casi sin comprimir; las soplantes son «compresores de baja presión»; los compresores trabajan a las presiones más altas." },
    { id: "tsf7-13", tipo: "vf", seccion: 5,
      enunciado: "Las soplantes de anillo líquido también funcionan muy bien como bombas de vacío.",
      correcta: true,
      explicacion: "Pueden bajar mucho la presión de un recipiente en una sola etapa; además el líquido refrigera el gas durante la compresión." },

    // ---------- Numéricas (ampliación, sección 6) ----------
    { id: "tsf7-n1", tipo: "numerica", seccion: 6,
      variables: { pman: [2, 10, 0.5] },
      enunciado: "Un compresor aspira aire a presión atmosférica (101,3 kPa) y lo descarga a {pman} bar manométricos. ¿Cuál es la relación de compresión?",
      resolver: v => (v.pman * 100 + 101.3) / 101.3,
      unidad: "", tolerancia: 0.02,
      explicacion: v => `P₂ absoluta = ${fmt(v.pman * 100)} + 101,3 = ${fmt(v.pman * 100 + 101.3)} kPa.<br>r = P₂/P₁ = ${fmt(v.pman * 100 + 101.3)}/101,3 = <b>${fmt((v.pman * 100 + 101.3) / 101.3)}</b>.` },
    { id: "tsf7-n2", tipo: "numerica", seccion: 6,
      variables: { T1: [10, 40, 1], r: [2, 8, 0.5] },
      enunciado: "Se comprime aire (γ = 1,4) de forma adiabática desde {T1} °C con una relación de compresión de {r}. ¿A qué temperatura sale, en °C?",
      resolver: v => (v.T1 + 273) * v.r ** (0.4 / 1.4) - 273,
      unidad: "°C", tolerancia: 0.02, toleranciaAbs: 1,
      explicacion: v => { const T2 = (v.T1 + 273) * v.r ** (0.4 / 1.4);
        return `T₁ = ${v.T1} + 273 = ${v.T1 + 273} K; (γ−1)/γ = 0,4/1,4 = ${fmt(0.4 / 1.4)}.<br>T₂ = ${v.T1 + 273}·${fmt(v.r)}^${fmt(0.4 / 1.4)} = ${fmt(T2)} K = <b>${fmt(T2 - 273)} °C</b>.`; } },
    { id: "tsf7-n3", tipo: "numerica", seccion: 6,
      variables: { V: [1, 20, 0.5], P2: [2, 10, 0.5] },
      enunciado: "¿Qué trabajo mínimo (compresión isotérmica) hace falta para comprimir {V} m³ de aire aspirados a 101,3 kPa hasta {P2} bar absolutos? Da el resultado en kJ.",
      resolver: v => 101.3 * v.V * Math.log(v.P2 * 100 / 101.3),
      unidad: "kJ", tolerancia: 0.02,
      explicacion: v => { const r = v.P2 * 100 / 101.3;
        return `P₂/P₁ = ${fmt(v.P2 * 100)}/101,3 = ${fmt(r)}.<br>W = P₁·V₁·ln(P₂/P₁) = 101,3 kPa·${fmt(v.V)} m³·ln(${fmt(r)}) = <b>${fmt(101.3 * v.V * Math.log(r))} kJ</b> (kPa·m³ = kJ).`; } }
  ]
});
