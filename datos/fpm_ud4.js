// Formulación y preparación de mezclas · UD4.1 Sistemas dispersos homogéneos (disoluciones y valoraciones).
// Fuente: «Ejercicios de disoluciones», «Ejercicios valoraciones» y «Ejercicio Normalización y valoraciones» (repo privado
// de materiales). No hay apuntes de teoría de FPM: la guía es teoría general de química (decisión del usuario), redactada
// de nuevo. Masas molares redondeadas como en los ejercicios de clase.
registrarUD({
  id: "fpm-ud4",
  modulo: "fpm",
  codigo: "UD4.1",
  titulo: "Disoluciones y valoraciones",
  descripcion: "Concentración (%, g/L, M, m, N, fracción molar), preparación, diluciones, mezclas, valoraciones ácido-base y normalización",
  ejercicios: "Relación de ejercicios de disoluciones y de valoraciones de la UD4.1",
  guia: [
    {
      titulo: "1. Disoluciones",
      apuntes: "No hay apuntes de teoría de FPM en los materiales (teoría general). Practica: ejercicios de disoluciones 1–4",
      html: `
        <p>Una <b>disolución</b> es una mezcla <b>homogénea</b> (un sistema disperso homogéneo): a simple vista, y aun al
        microscopio, tiene una sola fase.</p>
        <ul>
          <li><b>Disolvente</b>: el componente que está en mayor proporción (en química industrial, casi siempre agua).</li>
          <li><b>Soluto</b>: el componente o componentes en menor proporción.</li>
          <li><b>Solubilidad</b>: cantidad máxima de soluto que se disuelve en una cantidad dada de disolvente a una
            temperatura. Una disolución <b>saturada</b> ya no admite más soluto a esa temperatura.</li>
        </ul>
        <p class="clave"><b>Idea clave:</b> «concentrada» o «diluida» son términos relativos; para trabajar hay que dar la
        concentración con números y unidades.</p>`
    },
    {
      titulo: "2. Formas de expresar la concentración",
      apuntes: "No hay apuntes de teoría de FPM (teoría general). Practica: ejercicios de disoluciones 1–15 y 24",
      html: `
        <table class="tabla">
          <tr><th>Unidad</th><th>Definición</th></tr>
          <tr><td>% en masa (riqueza)</td><td>g de soluto por cada 100 g de disolución</td></tr>
          <tr><td>g/L</td><td>g de soluto por litro de disolución</td></tr>
          <tr><td>Molaridad (M)</td><td>moles de soluto por litro de disolución</td></tr>
          <tr><td>Molalidad (m)</td><td>moles de soluto por kg de disolvente</td></tr>
          <tr><td>Normalidad (N)</td><td>equivalentes de soluto por litro de disolución</td></tr>
          <tr><td>Fracción molar (χ)</td><td>moles de un componente / moles totales (Σχ = 1)</td></tr>
        </table>
        <ul>
          <li>Moles: n = m/Pm. La <b>densidad</b> (g/mL) es masa de <i>disolución</i> por volumen; no es una concentración.</li>
          <li>De % y densidad a molaridad: <b>M = 10 · % · d / Pm</b> (d en g/mL). Sale de tomar 1 L de disolución: pesa
            1000·d g, de los que %/100 son soluto.</li>
          <li><b>Normalidad</b>: N = M · valencia. Valencia: H⁺ que cede un ácido (HCl 1, H₂SO₄ 2), OH⁻ de una base (NaOH 1,
            Ba(OH)₂ 2) o carga total de los iones de una sal. El peso equivalente es Pm/valencia.</li>
          <li>La molalidad y la fracción molar no dependen de la temperatura (usan masas); la molaridad sí, porque el volumen cambia.</li>
        </ul>`
    },
    {
      titulo: "3. Preparar una disolución",
      apuntes: "No hay apuntes de teoría de FPM (teoría general). Practica: ejercicios de disoluciones 21–23, 25, 26, 28–31; valoraciones 5a",
      html: `
        <h4>A partir de un sólido</h4>
        <div class="formula">m = M · V(L) · Pm</div>
        <ul>
          <li>Si el reactivo es un <b>hidrato</b> (CuSO₄·5H₂O, CaCl₂·6H₂O), usa la masa molar del hidrato completo.</li>
          <li>Si tiene una <b>riqueza</b> menor del 100 %, pesa más: m<sub>pesar</sub> = m / (riqueza/100).</li>
          <li>Se pesa, se disuelve en parte del agua, se pasa al <b>matraz aforado</b> y se enrasa.</li>
        </ul>
        <h4>A partir de un reactivo concentrado (líquido comercial)</h4>
        <div class="formula">V<sub>conc</sub>(mL) = M · V(L) · Pm / (riqueza/100 · d)</div>
        <ul>
          <li>Se mide con <b>pipeta</b>, se añade al matraz con agua y se enrasa. Agua a añadir ≈ volumen final − volumen de ácido
            (aproximación: los volúmenes no son exactamente aditivos).</li>
          <li><b>Seguridad</b>: siempre el <b>ácido sobre el agua</b>, poco a poco, nunca al revés (la dilución del sulfúrico
            desprende mucho calor y puede salpicar).</li>
        </ul>`
    },
    {
      titulo: "4. Diluciones y mezclas",
      apuntes: "No hay apuntes de teoría de FPM (teoría general). Practica: ejercicios de disoluciones 16–20 y 32–34; valoraciones 1, 3 y 4",
      html: `
        <p>Al <b>diluir</b> se añade disolvente: los moles (o equivalentes, o gramos) de soluto no cambian.</p>
        <div class="formula">C₁ · V₁ = C₂ · V₂</div>
        <ul>
          <li>Vale con M, N o g/L, siempre que uses la misma unidad a los dos lados.</li>
          <li><b>Factor de dilución</b> = V<sub>final</sub>/V<sub>tomado</sub>. En <b>diluciones sucesivas</b> los factores se multiplican
            (2 mL → 50 mL y luego 10 mL → 150 mL: 25 · 15 = 375).</li>
          <li>Para volver de una disolución diluida a la original: C<sub>original</sub> = C<sub>diluida</sub> · factor total.</li>
        </ul>
        <p><b>Mezcla</b> de dos disoluciones del mismo soluto: se suman los moles y los volúmenes (suponiendo volúmenes aditivos):</p>
        <div class="formula">C = (C₁V₁ + C₂V₂) / (V₁ + V₂)</div>
        <p><b>Iones</b>: una sal se disocia y cada ion tiene su concentración. En CaCl₂ 0,5 M: [Ca²⁺] = 0,5 M y [Cl⁻] = 1 M.</p>`
    },
    {
      titulo: "5. Valoraciones ácido-base",
      apuntes: "No hay apuntes de teoría de FPM (teoría general). Practica: ejercicios de valoraciones 1–4 y ejercicio de clase 2 (vino)",
      html: `
        <p>Una <b>valoración</b> (volumetría) determina la concentración de una sustancia (<b>analito</b>) haciéndola
        reaccionar con una disolución de concentración conocida (<b>valorante</b>), que se añade con una <b>bureta</b> sobre
        una <b>alícuota</b> (porción medida con pipeta) en un erlenmeyer.</p>
        <ul>
          <li><b>Punto de equivalencia</b>: equivalentes de valorante = equivalentes de analito.</li>
          <li><b>Punto final</b>: cuando cambia de color el <b>indicador</b>. Se elige para que coincida (casi) con el de equivalencia.</li>
          <li><b>Fenolftaleína</b>: incolora en medio ácido y rosa en medio básico (vira hacia pH 8–10).</li>
          <li>Ácido fuerte con base fuerte: en el punto de equivalencia el pH es 7.</li>
        </ul>
        <div class="formula">N<sub>a</sub> · V<sub>a</sub> = N<sub>b</sub> · V<sub>b</sub></div>
        <p>Con molaridades hay que tener en cuenta la estequiometría: H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O, así que
        M<sub>ácido</sub> = M<sub>b</sub>·V<sub>b</sub> / (2·V<sub>a</sub>). Con normalidades no hace falta: la valencia ya está dentro.</p>
        <p class="clave"><b>Idea clave:</b> si la muestra se diluyó antes de valorarla, multiplica al final por el factor de dilución.</p>`
    },
    {
      titulo: "6. Normalización, patrones y errores",
      apuntes: "No hay apuntes de teoría de FPM (teoría general). Practica: valoraciones 5 y ejercicio de clase 1 de normalización",
      html: `
        <p>Una disolución preparada pesando no siempre tiene la concentración que buscamos (concentración <b>nominal</b>).
        <b>Normalizar</b> (estandarizar) es medir su concentración real valorándola frente a un <b>patrón primario</b>.</p>
        <ul>
          <li><b>Patrón primario</b>: sustancia muy pura, estable, no higroscópica y, mejor, de masa molar alta (se pesa con
            menos error). Ejemplos para bases: ftalato ácido de potasio (FAP, 204,23 g/mol) y ácido benzoico (122 g/mol), ambos monopróticos.</li>
          <li>El <b>NaOH no es patrón primario</b>: absorbe agua y CO₂ del aire. Por eso sus disoluciones se normalizan.</li>
          <li><b>Factor</b>: f = N<sub>real</sub> / N<sub>nominal</sub>.</li>
          <li>Conviene que el gasto en la bureta sea grande pero sin rellenarla: con una bureta de 25 mL, unos <b>20 mL</b>. Se
            calcula al revés cuánto patrón pesar o cuánta muestra tomar.</li>
          <li>Se valora por <b>triplicado</b> y se da la media (o la mediana si hay un valor raro).</li>
          <li><b>Error absoluto</b> = |valor medido − valor verdadero|; <b>error relativo</b> = error absoluto / valor verdadero (en %).</li>
        </ul>`
    },
    {
      titulo: "7. Método y formulario",
      apuntes: "Resumen para la relación de ejercicios de disoluciones y de valoraciones de la UD4.1",
      html: `
        <ol>
          <li>Apunta las masas molares y pasa todos los volúmenes a litros.</li>
          <li>Busca qué se conserva: moles (dilución, mezcla) o equivalentes (valoración).</li>
          <li>Si hay densidad y riqueza, toma una base de cálculo cómoda: 1 L o 100 g de disolución.</li>
          <li>Comprueba que el resultado es razonable (un ácido comercial suele estar entre 10 y 18 M).</li>
        </ol>
        <table class="tabla">
          <tr><td>Moles</td><td>n = m/Pm</td></tr>
          <tr><td>Molaridad</td><td>M = n/V(L)</td></tr>
          <tr><td>Molalidad</td><td>m = n/kg de disolvente</td></tr>
          <tr><td>Normalidad</td><td>N = M · valencia</td></tr>
          <tr><td>De % y d a M</td><td>M = 10·%·d/Pm</td></tr>
          <tr><td>Dilución</td><td>C₁V₁ = C₂V₂</td></tr>
          <tr><td>Mezcla</td><td>C = (C₁V₁ + C₂V₂)/(V₁ + V₂)</td></tr>
          <tr><td>Valoración</td><td>N<sub>a</sub>V<sub>a</sub> = N<sub>b</sub>V<sub>b</sub></td></tr>
          <tr><td>Factor</td><td>f = N<sub>real</sub>/N<sub>nominal</sub></td></tr>
          <tr><td>Error relativo</td><td>ε<sub>r</sub> = |x − x<sub>v</sub>|/x<sub>v</sub> · 100</td></tr>
        </table>`
    }
  ],

  preguntas: [
    // ---------- Conceptuales ----------
    { id: "fpm4-1", tipo: "test", seccion: 1,
      enunciado: "En una disolución, ¿qué es el disolvente?",
      opciones: ["El componente que está en mayor proporción", "El componente que está en menor proporción", "Siempre el agua, aunque haya poca", "El componente sólido"],
      correcta: 0,
      explicacion: "El disolvente es el componente mayoritario; el soluto, el minoritario. En las disoluciones acuosas el disolvente es el agua." },
    { id: "fpm4-2", tipo: "test", seccion: 1,
      enunciado: "Una disolución saturada es la que…",
      opciones: ["No admite más soluto disuelto a esa temperatura", "Tiene una concentración muy alta", "Tiene una concentración de 1 M", "Contiene dos disolventes"],
      correcta: 0,
      explicacion: "Ha alcanzado la solubilidad a esa temperatura: si añades más soluto, ya no se disuelve." },
    { id: "fpm4-3", tipo: "vf", seccion: 1,
      enunciado: "Una disolución es un sistema disperso homogéneo.",
      correcta: true,
      explicacion: "Sus componentes están mezclados a nivel molecular o iónico y se ve una sola fase." },
    { id: "fpm4-4", tipo: "test", seccion: 1,
      enunciado: "La solubilidad de una sustancia es…",
      opciones: ["La cantidad máxima que se disuelve en una cantidad de disolvente a una temperatura dada", "La velocidad a la que se disuelve",
        "La concentración de cualquier disolución de esa sustancia", "La masa molar de la sustancia"],
      correcta: 0,
      explicacion: "Depende de la sustancia, del disolvente y de la temperatura. Una disolución a esa concentración está saturada." },
    { id: "fpm4-5", tipo: "test", seccion: 2,
      enunciado: "La molaridad (M) se define como…",
      opciones: ["Moles de soluto por litro de disolución", "Moles de soluto por kilogramo de disolvente", "Gramos de soluto por 100 g de disolución", "Equivalentes de soluto por litro de disolución"],
      correcta: 0,
      explicacion: "M = n_soluto / V_disolución (L). Lo segundo es la molalidad, lo tercero el % en masa y lo cuarto la normalidad." },
    { id: "fpm4-6", tipo: "test", seccion: 2,
      enunciado: "La molalidad (m) se define como…",
      opciones: ["Moles de soluto por kilogramo de disolvente", "Moles de soluto por litro de disolución", "Moles de soluto por kilogramo de disolución", "Gramos de soluto por litro de disolvente"],
      correcta: 0,
      explicacion: "m = n_soluto / kg de disolvente. Ojo: de disolvente, no de disolución." },
    { id: "fpm4-7", tipo: "vf", seccion: 2,
      enunciado: "La molalidad no cambia con la temperatura, pero la molaridad sí.",
      correcta: true,
      explicacion: "La molalidad solo usa masas; la molaridad usa el volumen de disolución, que se dilata o contrae con la temperatura." },
    { id: "fpm4-8", tipo: "test", seccion: 2,
      enunciado: "La normalidad (N) es…",
      opciones: ["Equivalentes de soluto por litro de disolución", "Moles de soluto por litro de disolución", "Moles de soluto por kilogramo de disolvente", "Gramos de soluto por litro de disolución"],
      correcta: 0,
      explicacion: "N = equivalentes/L = M·valencia. Es muy cómoda en valoraciones: N_a·V_a = N_b·V_b." },
    { id: "fpm4-9", tipo: "test", seccion: 2,
      enunciado: "Una disolución de ácido sulfúrico (H₂SO₄) 1 M, ¿qué normalidad tiene?",
      opciones: ["2 N", "1 N", "0,5 N", "4 N"],
      correcta: 0,
      explicacion: "El H₂SO₄ cede 2 H⁺ (valencia 2): N = M·2 = 2 N." },
    { id: "fpm4-10", tipo: "test", seccion: 2,
      enunciado: "Una disolución de NaOH 0,1 M, ¿qué normalidad tiene?",
      opciones: ["0,1 N", "0,2 N", "0,05 N", "1 N"],
      correcta: 0,
      explicacion: "El NaOH aporta un OH⁻ (valencia 1): N = M." },
    { id: "fpm4-11", tipo: "vf", seccion: 2,
      enunciado: "La suma de las fracciones molares de todos los componentes de una disolución vale 1.",
      correcta: true,
      explicacion: "χ_i = n_i/n_total; al sumarlas todas se obtiene n_total/n_total = 1." },
    { id: "fpm4-12", tipo: "test", seccion: 2,
      enunciado: "Se disuelven 15 g de sal en 85 g de agua. ¿Cuál es el % en masa?",
      opciones: ["15 %", "17,6 %", "85 %", "1,5 %"],
      correcta: 0,
      explicacion: "% = m_soluto/m_disolución·100 = 15/(15 + 85)·100 = 15 %. Se divide entre la disolución, no entre el agua (eso daría 17,6)." },
    { id: "fpm4-13", tipo: "test", seccion: 2,
      enunciado: "¿Qué diferencia hay entre la densidad de una disolución y su concentración en g/L?",
      opciones: ["La densidad es masa de disolución por volumen; la concentración en g/L es masa de soluto por volumen",
        "Son lo mismo con distintas unidades", "La densidad solo se usa con sólidos", "La concentración en g/L incluye la masa del disolvente"],
      correcta: 0,
      explicacion: "Las dos son masa/volumen, pero la densidad cuenta toda la disolución y la concentración solo el soluto. Por eso hace falta la riqueza para pasar de una a otra." },
    { id: "fpm4-14", tipo: "test", seccion: 3,
      enunciado: "¿En qué recipiente se prepara una disolución de volumen exacto?",
      opciones: ["Matraz aforado", "Vaso de precipitados", "Probeta", "Erlenmeyer"],
      correcta: 0,
      explicacion: "El matraz aforado tiene una marca (aforo) que da un volumen exacto a la temperatura indicada. Vaso, probeta y erlenmeyer son aproximados." },
    { id: "fpm4-15", tipo: "test", seccion: 3,
      enunciado: "Para medir con exactitud un pequeño volumen de ácido concentrado se usa…",
      opciones: ["Una pipeta (aforada o graduada)", "Un vaso de precipitados", "Un erlenmeyer", "Un embudo"],
      correcta: 0,
      explicacion: "La pipeta mide volúmenes pequeños con precisión. Con ácidos concentrados, siempre con pera o pipeteador, nunca con la boca." },
    { id: "fpm4-16", tipo: "vf", seccion: 3,
      enunciado: "Para diluir ácido sulfúrico concentrado se echa el agua sobre el ácido.",
      correcta: false,
      explicacion: "Al revés: el ácido sobre el agua, poco a poco. La dilución desprende mucho calor y, si se añade agua al ácido, puede hervir y salpicar." },
    { id: "fpm4-17", tipo: "test", seccion: 3,
      enunciado: "Vas a preparar una disolución de sulfato de cobre con el reactivo CuSO₄·5H₂O. ¿Qué masa molar usas para calcular lo que hay que pesar?",
      opciones: ["La del hidrato completo, incluida el agua de cristalización", "La del CuSO₄ sin agua", "La del agua de cristalización", "Da igual, la diferencia es despreciable"],
      correcta: 0,
      explicacion: "Lo que pesas es el hidrato: cada mol de CuSO₄·5H₂O (249,7 g) contiene un mol de CuSO₄ (159,6 g). La diferencia es grande." },
    { id: "fpm4-18", tipo: "test", seccion: 3,
      enunciado: "Necesitas 10 g de un soluto, pero el reactivo tiene una riqueza del 95 %. ¿Qué haces?",
      opciones: ["Pesar más: 10/0,95 = 10,53 g", "Pesar menos: 10·0,95 = 9,5 g", "Pesar 10 g, la riqueza no importa", "Pesar 10 g y añadir un 5 % de agua"],
      correcta: 0,
      explicacion: "Solo el 95 % de lo que pesas es soluto: m_pesar = m_necesaria/0,95." },
    { id: "fpm4-19", tipo: "test", seccion: 4,
      enunciado: "Al diluir una disolución añadiendo agua, ¿qué se mantiene constante?",
      opciones: ["Los moles de soluto", "La concentración", "El volumen", "La densidad"],
      correcta: 0,
      explicacion: "Solo se añade disolvente: el soluto es el mismo. Por eso C₁V₁ = C₂V₂." },
    { id: "fpm4-20", tipo: "vf", seccion: 4,
      enunciado: "Si se toman 10 mL de una disolución y se diluyen hasta 100 mL, la concentración se divide entre 10.",
      correcta: true,
      explicacion: "Factor de dilución = 100/10 = 10: C₂ = C₁·10/100 = C₁/10." },
    { id: "fpm4-21", tipo: "test", seccion: 4,
      enunciado: "En una disolución de CaCl₂ 0,5 M, ¿cuál es la concentración de iones cloruro?",
      opciones: ["1 M", "0,5 M", "0,25 M", "1,5 M"],
      correcta: 0,
      explicacion: "CaCl₂ → Ca²⁺ + 2 Cl⁻: cada mol de sal da 2 moles de Cl⁻. [Cl⁻] = 2·0,5 = 1 M." },
    { id: "fpm4-22", tipo: "test", seccion: 5,
      enunciado: "En una valoración, el punto de equivalencia es el momento en que…",
      opciones: ["Los equivalentes de valorante añadidos igualan a los del analito", "El indicador cambia de color",
        "Se vacía la bureta", "El pH vale exactamente 7 en cualquier valoración"],
      correcta: 0,
      explicacion: "Es el punto teórico de reacción completa. El cambio de color del indicador es el punto final, que se elige para que coincida con él." },
    { id: "fpm4-23", tipo: "test", seccion: 5,
      enunciado: "¿Qué es el punto final de una valoración?",
      opciones: ["El momento en que vira el indicador; idealmente coincide con el de equivalencia", "El momento en que se termina el valorante",
        "El volumen de muestra que se valora", "El último decimal que se lee en la bureta"],
      correcta: 0,
      explicacion: "Es lo que se observa (el viraje). Si el indicador está bien elegido, la diferencia con el punto de equivalencia es despreciable." },
    { id: "fpm4-24", tipo: "test", seccion: 5,
      enunciado: "¿Cómo cambia de color la fenolftaleína?",
      opciones: ["Incolora en medio ácido y rosa en medio básico", "Roja en medio ácido y amarilla en medio básico", "Azul en medio ácido e incolora en medio básico", "No cambia: solo indica la temperatura"],
      correcta: 0,
      explicacion: "Vira hacia pH 8–10. Al valorar un ácido con una base, la primera gota en exceso de base deja la disolución rosa." },
    { id: "fpm4-25", tipo: "test", seccion: 5,
      enunciado: "En una valoración, ¿dónde se coloca la disolución valorante?",
      opciones: ["En la bureta", "En el erlenmeyer", "En el matraz aforado", "En la probeta"],
      correcta: 0,
      explicacion: "La bureta permite añadirla gota a gota y leer el volumen gastado. La muestra (alícuota) va en el erlenmeyer con el indicador." },
    { id: "fpm4-26", tipo: "vf", seccion: 5,
      enunciado: "En la valoración de un ácido fuerte con una base fuerte, el pH en el punto de equivalencia es 7.",
      correcta: true,
      explicacion: "Solo quedan la sal neutra y agua (a 25 °C). Con ácidos o bases débiles no es así." },
    { id: "fpm4-27", tipo: "test", seccion: 5,
      enunciado: "Una alícuota es…",
      opciones: ["Una porción de la muestra medida con exactitud (pipeta) para analizarla", "Un tipo de indicador",
        "El volumen gastado de bureta", "Un patrón primario"],
      correcta: 0,
      explicacion: "Se toma una parte exacta de la muestra (por ejemplo 25 mL de 100 mL) y al final se refiere el resultado a la muestra total." },
    { id: "fpm4-28", tipo: "test", seccion: 6,
      enunciado: "¿Por qué hay que normalizar las disoluciones de NaOH?",
      opciones: ["Porque el NaOH no es patrón primario: absorbe agua y CO₂ del aire", "Porque es demasiado caro",
        "Porque es un ácido débil", "Porque se descompone con la luz"],
      correcta: 0,
      explicacion: "El NaOH sólido es higroscópico y reacciona con el CO₂: lo que pesas no es solo NaOH. Se mide su concentración real con un patrón primario." },
    { id: "fpm4-29", tipo: "test", seccion: 6,
      enunciado: "¿Qué características debe tener un patrón primario?",
      opciones: ["Alta pureza, estable, no higroscópico y, mejor, de masa molar alta", "Ser muy soluble y barato, aunque sea impuro",
        "Ser líquido para medirlo con pipeta", "Reaccionar lentamente"],
      correcta: 0,
      explicacion: "Así lo que se pesa es exactamente lo que reacciona. Una masa molar alta hace que el error de la pesada pese menos." },
    { id: "fpm4-30", tipo: "test", seccion: 6,
      enunciado: "El factor de una disolución valorante es…",
      opciones: ["N real / N nominal", "N nominal / N real", "N real − N nominal", "El volumen gastado / el volumen de muestra"],
      correcta: 0,
      explicacion: "f = N_real/N_nominal. Una NaOH «0,1 N» que en realidad es 0,0985 N tiene f = 0,985." },
    { id: "fpm4-31", tipo: "test", seccion: 6,
      enunciado: "Con una bureta de 25 mL, ¿qué gasto de valorante conviene buscar al diseñar la valoración?",
      opciones: ["Unos 20 mL", "Unos 2 mL", "25 mL justos", "Unos 40 mL"],
      correcta: 0,
      explicacion: "Un gasto grande reduce el error relativo de lectura, pero sin pasarse de la bureta. Con 25 mL, unos 20 mL." },
    { id: "fpm4-32", tipo: "test", seccion: 6,
      enunciado: "¿Por qué se hacen las valoraciones por triplicado?",
      opciones: ["Para detectar errores y dar un resultado más fiable (media o mediana)", "Porque lo exige la bureta",
        "Para gastar todo el reactivo", "Para que el indicador vire mejor"],
      correcta: 0,
      explicacion: "Si un valor se aleja de los otros dos, se detecta. La mediana es útil cuando hay un valor raro." },
    { id: "fpm4-33", tipo: "vf", seccion: 6,
      enunciado: "El error relativo es el error absoluto dividido entre el valor verdadero.",
      correcta: true,
      explicacion: "ε_r = |x − x_v|/x_v, normalmente en %. Permite comparar errores de medidas de distinto tamaño." },

    // ---------- Numéricas: concentración ----------
    { id: "fpm4-n1", tipo: "numerica", seccion: 2,
      variables: { m: [1, 30, 0.5], V: [100, 1000, 50] },
      enunciado: "Se disuelven {m} g de NaCl (Pm = 58,5 g/mol) en agua hasta {V} mL de disolución. ¿Cuál es la molaridad?",
      resolver: v => v.m / 58.5 / (v.V / 1000),
      unidad: "M", tolerancia: 0.02,
      explicacion: v => `n = ${fmt(v.m)}/58,5 = ${fmt(v.m / 58.5)} mol; V = ${fmt(v.V / 1000)} L.<br>M = n/V = <b>${fmt(v.m / 58.5 / (v.V / 1000))} M</b>.` },
    { id: "fpm4-n2", tipo: "numerica", seccion: 3,
      variables: { V: [100, 1000, 50], M: [0.05, 1, 0.05] },
      enunciado: "¿Cuántos gramos de fosfato de potasio, K₃PO₄ (Pm = 212,3 g/mol), hacen falta para preparar {V} mL de disolución {M} M?",
      resolver: v => v.M * v.V / 1000 * 212.3,
      unidad: "g", tolerancia: 0.02,
      explicacion: v => `n = M·V = ${fmt(v.M)}·${fmt(v.V / 1000)} = ${fmt(v.M * v.V / 1000)} mol.<br>m = n·Pm = ${fmt(v.M * v.V / 1000)}·212,3 = <b>${fmt(v.M * v.V / 1000 * 212.3)} g</b>.` },
    { id: "fpm4-n3", tipo: "numerica", seccion: 3,
      variables: { V: [50, 500, 50], M: [0.1, 3, 0.1] },
      enunciado: "¿Qué masa de yoduro de potasio, KI (Pm = 166 g/mol), hay que pesar para preparar {V} mL de disolución {M} M?",
      resolver: v => v.M * v.V / 1000 * 166,
      unidad: "g", tolerancia: 0.02,
      explicacion: v => `m = M·V·Pm = ${fmt(v.M)}·${fmt(v.V / 1000)}·166 = <b>${fmt(v.M * v.V / 1000 * 166)} g</b>.` },
    { id: "fpm4-n4", tipo: "numerica", seccion: 2,
      variables: { m: [5, 60, 1], V: [100, 1000, 50] },
      enunciado: "Se mezclan {m} g de etanol, CH₃CH₂OH (Pm = 46 g/mol), con agua hasta un volumen total de {V} mL. ¿Cuál es la molaridad?",
      resolver: v => v.m / 46 / (v.V / 1000),
      unidad: "M", tolerancia: 0.02,
      explicacion: v => `n = ${v.m}/46 = ${fmt(v.m / 46)} mol. M = ${fmt(v.m / 46)}/${fmt(v.V / 1000)} = <b>${fmt(v.m / 46 / (v.V / 1000))} M</b>.` },
    { id: "fpm4-n5", tipo: "numerica", seccion: 2,
      variables: { s: [5, 20, 0.5] },
      enunciado: "La solubilidad del perclorato de potasio, KClO₄ (Pm = 138,5 g/mol), a cierta temperatura es {s} g/L. ¿Cuál es la molaridad de su disolución saturada?",
      resolver: v => v.s / 138.5,
      unidad: "M", tolerancia: 0.02,
      explicacion: v => `En 1 L hay ${fmt(v.s)} g: n = ${fmt(v.s)}/138,5 = <b>${fmt(v.s / 138.5)} M</b>.` },
    { id: "fpm4-n6", tipo: "numerica", seccion: 2,
      variables: { p: [20, 70, 1], d: [1.1, 1.42, 0.01] },
      enunciado: "Un ácido nítrico, HNO₃ (Pm = 63 g/mol), tiene una riqueza del {p} % en masa y una densidad de {d} g/mL. Calcula su molaridad.",
      resolver: v => 10 * v.p * v.d / 63,
      unidad: "M", tolerancia: 0.02,
      explicacion: v => `En 1 L: masa = 1000·${fmt(v.d)} = ${fmt(1000 * v.d)} g; HNO₃ = ${fmt(v.p / 100)}·${fmt(1000 * v.d)} = ${fmt(10 * v.p * v.d)} g.<br>M = ${fmt(10 * v.p * v.d)}/63 = <b>${fmt(10 * v.p * v.d / 63)} M</b>.` },
    { id: "fpm4-n7", tipo: "numerica", seccion: 2,
      variables: { p: [10, 98, 1], d: [1.07, 1.84, 0.01] },
      enunciado: "Una disolución de ácido sulfúrico, H₂SO₄ (Pm = 98 g/mol), tiene {p} % de riqueza y densidad {d} g/mL. ¿Cuál es su molaridad?",
      resolver: v => 10 * v.p * v.d / 98,
      unidad: "M", tolerancia: 0.02,
      explicacion: v => `M = 10·%·d/Pm = 10·${v.p}·${fmt(v.d)}/98 = <b>${fmt(10 * v.p * v.d / 98)} M</b>.` },
    { id: "fpm4-n8", tipo: "numerica", seccion: 2,
      variables: { M: [15, 18, 0.1], d: [1.8, 1.84, 0.01] },
      enunciado: "Un ácido sulfúrico comercial (Pm = 98 g/mol) tiene densidad {d} g/mL y es {M} M. ¿Cuál es su riqueza en % en masa?",
      resolver: v => v.M * 98 / (10 * v.d),
      unidad: "%", tolerancia: 0.02,
      explicacion: v => `En 1 L: H₂SO₄ = ${fmt(v.M)}·98 = ${fmt(v.M * 98)} g; disolución = ${fmt(1000 * v.d)} g.<br>% = ${fmt(v.M * 98)}/${fmt(1000 * v.d)}·100 = <b>${fmt(v.M * 98 / (10 * v.d))} %</b>.` },
    { id: "fpm4-n9", tipo: "numerica", seccion: 2,
      variables: { p: [5, 40, 1] },
      enunciado: "Calcula la molalidad de una disolución acuosa de ácido sulfúrico (Pm = 98 g/mol) al {p} % en masa.",
      resolver: v => v.p / 98 / ((100 - v.p) / 1000),
      unidad: "m", tolerancia: 0.02,
      explicacion: v => `En 100 g: ${v.p} g de H₂SO₄ (${fmt(v.p / 98)} mol) y ${100 - v.p} g de agua (${fmt((100 - v.p) / 1000)} kg).<br>m = ${fmt(v.p / 98)}/${fmt((100 - v.p) / 1000)} = <b>${fmt(v.p / 98 / ((100 - v.p) / 1000))} mol/kg</b>.` },
    { id: "fpm4-n10", tipo: "numerica", seccion: 2,
      variables: { p: [5, 40, 1] },
      enunciado: "¿Cuál es la fracción molar del soluto en una disolución acuosa de ácido sulfúrico (Pm = 98 g/mol; agua 18 g/mol) al {p} % en masa?",
      resolver: v => (v.p / 98) / (v.p / 98 + (100 - v.p) / 18),
      unidad: "", tolerancia: 0.02,
      explicacion: v => { const ns = v.p / 98, nd = (100 - v.p) / 18;
        return `En 100 g: n_soluto = ${v.p}/98 = ${fmt(ns)} mol; n_agua = ${100 - v.p}/18 = ${fmt(nd)} mol.<br>χ = ${fmt(ns)}/(${fmt(ns)} + ${fmt(nd)}) = <b>${fmt(ns / (ns + nd))}</b>.`; } },
    { id: "fpm4-n11", tipo: "numerica", seccion: 2,
      variables: { p: [5, 40, 0.5] },
      enunciado: "Determina la molalidad de una disolución acuosa de sacarosa, C₁₂H₂₂O₁₁ (Pm = 342 g/mol), al {p} % en masa.",
      resolver: v => v.p / 342 / ((100 - v.p) / 1000),
      unidad: "m", tolerancia: 0.02,
      explicacion: v => `En 100 g: ${fmt(v.p)} g de sacarosa = ${fmt(v.p / 342)} mol; agua = ${fmt(100 - v.p)} g.<br>m = ${fmt(v.p / 342)}/${fmt((100 - v.p) / 1000)} = <b>${fmt(v.p / 342 / ((100 - v.p) / 1000))} mol/kg</b>.` },
    { id: "fpm4-n12", tipo: "numerica", seccion: 2,
      variables: { s: [2, 20, 1], w: [20, 200, 5], d: [1.01, 1.1, 0.01] },
      enunciado: "Se disuelven {s} g de HCl (Pm = 36,5 g/mol) en {w} g de agua; la densidad de la disolución es {d} g/mL. ¿Cuál es la molaridad?",
      resolver: v => (v.s / 36.5) / ((v.s + v.w) / v.d / 1000),
      unidad: "M", tolerancia: 0.02,
      explicacion: v => { const V = (v.s + v.w) / v.d;
        return `Masa de disolución = ${v.s + v.w} g → V = ${v.s + v.w}/${fmt(v.d)} = ${fmt(V)} mL.<br>n = ${v.s}/36,5 = ${fmt(v.s / 36.5)} mol. M = ${fmt(v.s / 36.5)}/${fmt(V / 1000)} = <b>${fmt((v.s / 36.5) / (V / 1000))} M</b>.`; } },
    { id: "fpm4-n13", tipo: "numerica", seccion: 2,
      variables: { s: [2, 20, 1], w: [20, 200, 5], d: [1.01, 1.1, 0.01] },
      enunciado: "Se disuelven {s} g de HCl en {w} g de agua (densidad de la disolución {d} g/mL). ¿Cuál es la concentración en g/L?",
      resolver: v => v.s / ((v.s + v.w) / v.d / 1000),
      unidad: "g/L", tolerancia: 0.02,
      explicacion: v => { const V = (v.s + v.w) / v.d;
        return `V = (${v.s} + ${v.w})/${fmt(v.d)} = ${fmt(V)} mL = ${fmt(V / 1000)} L.<br>c = ${v.s}/${fmt(V / 1000)} = <b>${fmt(v.s / (V / 1000))} g/L</b>.`; } },
    { id: "fpm4-n14", tipo: "numerica", seccion: 2,
      variables: { s: [2, 30, 1], w: [20, 200, 5] },
      enunciado: "Se disuelven {s} g de un soluto en {w} g de agua. ¿Cuál es el % en masa de la disolución?",
      resolver: v => 100 * v.s / (v.s + v.w),
      unidad: "%", tolerancia: 0.02,
      explicacion: v => `% = m_soluto/(m_soluto + m_agua)·100 = ${v.s}/${v.s + v.w}·100 = <b>${fmt(100 * v.s / (v.s + v.w))} %</b>.` },
    { id: "fpm4-n15", tipo: "numerica", seccion: 2,
      variables: { m: [1, 20, 0.5], V: [100, 1000, 50] },
      enunciado: "Se disuelven {m} g de H₂SO₄ (Pm = 98 g/mol) en agua hasta {V} mL. ¿Cuál es la normalidad?",
      resolver: v => v.m / 49 / (v.V / 1000),
      unidad: "N", tolerancia: 0.02,
      explicacion: v => `Peso equivalente = 98/2 = 49 g/eq. eq = ${fmt(v.m)}/49 = ${fmt(v.m / 49)}.<br>N = ${fmt(v.m / 49)}/${fmt(v.V / 1000)} = <b>${fmt(v.m / 49 / (v.V / 1000))} N</b> (el doble de la molaridad).` },

    // ---------- Numéricas: preparación ----------
    { id: "fpm4-n16", tipo: "numerica", seccion: 3,
      variables: { p: [35, 38, 0.5], d: [1.17, 1.19, 0.01], V: [50, 1000, 50], M: [0.1, 2, 0.1] },
      enunciado: "¿Qué volumen de HCl comercial ({p} %, d = {d} g/mL, Pm = 36,5 g/mol) hace falta para preparar {V} mL de disolución {M} M?",
      resolver: v => v.M * v.V / 1000 * 36.5 / (v.p / 100 * v.d),
      unidad: "mL", tolerancia: 0.02,
      explicacion: v => { const g = v.M * v.V / 1000 * 36.5;
        return `HCl necesario: ${fmt(v.M)}·${fmt(v.V / 1000)}·36,5 = ${fmt(g)} g.<br>Disolución comercial: ${fmt(g)}/${fmt(v.p / 100)} = ${fmt(g / (v.p / 100))} g → V = ${fmt(g / (v.p / 100))}/${fmt(v.d)} = <b>${fmt(g / (v.p / 100) / v.d)} mL</b>.`; } },
    { id: "fpm4-n17", tipo: "numerica", seccion: 3,
      variables: { V: [100, 1000, 50], M: [0.05, 1, 0.05] },
      enunciado: "¿Qué volumen de ácido sulfúrico comercial (96 %, d = 1,84 g/mL, Pm = 98 g/mol) se necesita para preparar {V} mL de disolución {M} M?",
      resolver: v => v.M * v.V / 1000 * 98 / (0.96 * 1.84),
      unidad: "mL", tolerancia: 0.02,
      explicacion: v => { const g = v.M * v.V / 1000 * 98;
        return `H₂SO₄ = ${fmt(v.M)}·${fmt(v.V / 1000)}·98 = ${fmt(g)} g → ácido comercial: ${fmt(g)}/0,96 = ${fmt(g / 0.96)} g.<br>V = ${fmt(g / 0.96)}/1,84 = <b>${fmt(g / 0.96 / 1.84)} mL</b>.`; } },
    { id: "fpm4-n18", tipo: "numerica", seccion: 3,
      variables: { V: [100, 1000, 50], c: [10, 80, 5] },
      enunciado: "¿Qué volumen de ácido sulfúrico comercial (96 %, d = 1,84 g/mL) hay que tomar para preparar {V} mL de disolución de {c} g/L?",
      resolver: v => v.c * v.V / 1000 / (0.96 * 1.84),
      unidad: "mL", tolerancia: 0.02,
      explicacion: v => { const g = v.c * v.V / 1000;
        return `H₂SO₄ = ${v.c}·${fmt(v.V / 1000)} = ${fmt(g)} g → comercial: ${fmt(g)}/0,96 = ${fmt(g / 0.96)} g.<br>V = ${fmt(g / 0.96)}/1,84 = <b>${fmt(g / 0.96 / 1.84)} mL</b>.`; } },
    { id: "fpm4-n19", tipo: "numerica", seccion: 3,
      variables: { N: [0.5, 2, 0.1], V: [100, 500, 50] },
      enunciado: "¿Qué volumen de ácido sulfúrico comercial (96 %, d = 1,84 g/mL, Pm = 98 g/mol) hace falta para preparar {V} mL de disolución {N} N?",
      resolver: v => v.N * v.V / 1000 * 49 / (0.96 * 1.84),
      unidad: "mL", tolerancia: 0.02,
      explicacion: v => { const g = v.N * v.V / 1000 * 49;
        return `Peso equivalente = 98/2 = 49 g. H₂SO₄ = ${fmt(v.N)}·${fmt(v.V / 1000)}·49 = ${fmt(g)} g.<br>V = ${fmt(g)}/(0,96·1,84) = <b>${fmt(g / (0.96 * 1.84))} mL</b>.`; } },
    { id: "fpm4-n20", tipo: "numerica", seccion: 3,
      variables: { V: [100, 1000, 50], M: [0.05, 0.5, 0.05] },
      enunciado: "Un amoniaco concentrado tiene 28 % en masa de NH₃ (Pm = 17 g/mol) y densidad 0,899 g/mL. ¿Qué volumen hay que diluir hasta {V} mL para obtener NH₃ {M} M?",
      resolver: v => v.M * v.V / 1000 * 17 / (0.28 * 0.899),
      unidad: "mL", tolerancia: 0.02,
      explicacion: v => { const g = v.M * v.V / 1000 * 17;
        return `NH₃ = ${fmt(v.M)}·${fmt(v.V / 1000)}·17 = ${fmt(g)} g.<br>V = ${fmt(g)}/(0,28·0,899) = <b>${fmt(g / (0.28 * 0.899))} mL</b>.`; } },
    { id: "fpm4-n21", tipo: "numerica", seccion: 3,
      variables: { V: [50, 500, 50], M: [0.05, 0.5, 0.05] },
      enunciado: "¿Qué masa de sulfato de cobre pentahidratado, CuSO₄·5H₂O (Pm = 249,7 g/mol), hay que pesar para preparar {V} mL de disolución {M} M?",
      resolver: v => v.M * v.V / 1000 * 249.7,
      unidad: "g", tolerancia: 0.02,
      explicacion: v => `Con la masa molar del hidrato: m = ${fmt(v.M)}·${fmt(v.V / 1000)}·249,7 = <b>${fmt(v.M * v.V / 1000 * 249.7)} g</b>.` },
    { id: "fpm4-n22", tipo: "numerica", seccion: 3,
      variables: { V: [50, 500, 50], M: [0.05, 0.5, 0.05], r: [90, 99, 1] },
      enunciado: "Hay que preparar {V} mL de CuSO₄ {M} M con sulfato de cobre pentahidratado (Pm = 249,7 g/mol) de {r} % de riqueza. ¿Qué masa hay que pesar?",
      resolver: v => v.M * v.V / 1000 * 249.7 / (v.r / 100),
      unidad: "g", tolerancia: 0.02,
      explicacion: v => { const m = v.M * v.V / 1000 * 249.7;
        return `Hidrato puro necesario: ${fmt(m)} g.<br>Con riqueza ${v.r} %: ${fmt(m)}/${fmt(v.r / 100)} = <b>${fmt(m / (v.r / 100))} g</b>.`; } },
    { id: "fpm4-n23", tipo: "numerica", seccion: 3,
      variables: { m: [50, 500, 50], p: [2, 15, 1] },
      enunciado: "¿Cuánto cloruro de calcio hexahidratado, CaCl₂·6H₂O (Pm = 219,1 g/mol), hay que pesar para preparar {m} g de disolución acuosa de CaCl₂ (Pm = 111 g/mol) al {p} %?",
      resolver: v => v.m * v.p / 100 * 219.1 / 111,
      unidad: "g", tolerancia: 0.02,
      explicacion: v => { const g = v.m * v.p / 100;
        return `CaCl₂ necesario: ${v.m}·${fmt(v.p / 100)} = ${fmt(g)} g.<br>Hidrato: ${fmt(g)}·219,1/111 = <b>${fmt(g * 219.1 / 111)} g</b> (el resto hasta ${v.m} g es agua).`; } },
    { id: "fpm4-n24", tipo: "numerica", seccion: 3,
      variables: { V: [100, 500, 50], p: [5, 30, 1], d: [1.03, 1.2, 0.01] },
      enunciado: "Se quieren preparar {V} cm³ de disolución de KNO₃ al {p} % en masa, cuya densidad es {d} g/cm³. ¿Cuántos gramos de KNO₃ hay que pesar?",
      resolver: v => v.V * v.d * v.p / 100,
      unidad: "g", tolerancia: 0.02,
      explicacion: v => `Masa de disolución = ${v.V}·${fmt(v.d)} = ${fmt(v.V * v.d)} g.<br>KNO₃ = ${fmt(v.V * v.d)}·${fmt(v.p / 100)} = <b>${fmt(v.V * v.d * v.p / 100)} g</b> (y ${fmt(v.V * v.d * (1 - v.p / 100))} g de agua).` },
    { id: "fpm4-n25", tipo: "numerica", seccion: 6,
      variables: { V: [0.5, 3, 0.5], M: [0.05, 0.5, 0.05], p: [90, 99, 1] },
      enunciado: "¿Qué masa de NaOH en lentejas (Pm = 40 g/mol, pureza {p} %) hay que pesar para preparar {V} L de disolución {M} M?",
      resolver: v => v.M * v.V * 40 / (v.p / 100),
      unidad: "g", tolerancia: 0.02,
      explicacion: v => `NaOH puro: ${fmt(v.M)}·${fmt(v.V)}·40 = ${fmt(v.M * v.V * 40)} g.<br>Con pureza ${v.p} %: ${fmt(v.M * v.V * 40)}/${fmt(v.p / 100)} = <b>${fmt(v.M * v.V * 40 / (v.p / 100))} g</b>.` },

    // ---------- Numéricas: diluciones y mezclas ----------
    { id: "fpm4-n26", tipo: "numerica", seccion: 4,
      variables: { C1: [0.1, 2, 0.05], V1: [5, 50, 5], V2: [100, 1000, 50] },
      enunciado: "Se toman {V1} mL de una disolución {C1} M de KNO₃ y se diluyen hasta {V2} mL. ¿Cuál es la nueva concentración?",
      resolver: v => v.C1 * v.V1 / v.V2,
      unidad: "M", tolerancia: 0.02,
      explicacion: v => `C₁V₁ = C₂V₂ → C₂ = ${fmt(v.C1)}·${v.V1}/${v.V2} = <b>${fmt(v.C1 * v.V1 / v.V2)} M</b>.` },
    { id: "fpm4-n27", tipo: "numerica", seccion: 4,
      variables: { V1: [100, 500, 10], C1: [0.1, 0.5, 0.005], C2: [0.02, 0.09, 0.005] },
      enunciado: "¿Cuánta agua hay que añadir a {V1} mL de HCl {C1} M para que quede {C2} M? (Supón volúmenes aditivos.)",
      resolver: v => v.V1 * (v.C1 / v.C2 - 1),
      unidad: "mL", tolerancia: 0.02,
      explicacion: v => { const V2 = v.C1 * v.V1 / v.C2;
        return `V₂ = C₁V₁/C₂ = ${fmt(v.C1)}·${v.V1}/${fmt(v.C2)} = ${fmt(V2)} mL.<br>Agua = ${fmt(V2)} − ${v.V1} = <b>${fmt(V2 - v.V1)} mL</b>.`; } },
    { id: "fpm4-n28", tipo: "numerica", seccion: 4,
      variables: { c2: [1, 10, 1], V2: [100, 500, 50], c1: [20, 100, 5] },
      enunciado: "Para preparar {V2} mL de NaCl de {c2} g/L, ¿qué volumen hay que tomar de una disolución de NaCl de {c1} g/L?",
      resolver: v => v.c2 * v.V2 / v.c1,
      unidad: "mL", tolerancia: 0.02,
      explicacion: v => `V₁ = c₂·V₂/c₁ = ${v.c2}·${v.V2}/${v.c1} = <b>${fmt(v.c2 * v.V2 / v.c1)} mL</b>, y se enrasa con agua hasta ${v.V2} mL.` },
    { id: "fpm4-n29", tipo: "numerica", seccion: 4,
      variables: { N1: [6, 12, 1], N2: [0.1, 3, 0.1], V2: [0.1, 2, 0.1] },
      enunciado: "¿Qué volumen de HCl {N1} N hace falta para preparar {V2} L de HCl {N2} N?",
      resolver: v => v.N2 * v.V2 / v.N1 * 1000,
      unidad: "mL", tolerancia: 0.02,
      explicacion: v => `N₁V₁ = N₂V₂ → V₁ = ${fmt(v.N2)}·${fmt(v.V2)}/${v.N1} = ${fmt(v.N2 * v.V2 / v.N1)} L = <b>${fmt(v.N2 * v.V2 / v.N1 * 1000)} mL</b>.` },
    { id: "fpm4-n30", tipo: "numerica", seccion: 4,
      variables: { V1: [20, 200, 10], C1: [0.5, 4, 0.1], V2: [20, 200, 10], C2: [0.5, 4, 0.1] },
      enunciado: "Se mezclan {V1} mL de NaCl {C1} M con {V2} mL de NaCl {C2} M. ¿Cuál es la molaridad de la mezcla (volúmenes aditivos)?",
      resolver: v => (v.C1 * v.V1 + v.C2 * v.V2) / (v.V1 + v.V2),
      unidad: "M", tolerancia: 0.02,
      explicacion: v => { const n = (v.C1 * v.V1 + v.C2 * v.V2) / 1000;
        return `n = ${fmt(v.C1)}·${fmt(v.V1 / 1000)} + ${fmt(v.C2)}·${fmt(v.V2 / 1000)} = ${fmt(n)} mol; V = ${v.V1 + v.V2} mL.<br>M = ${fmt(n)}/${fmt((v.V1 + v.V2) / 1000)} = <b>${fmt(n / ((v.V1 + v.V2) / 1000))} M</b>.`; } },
    { id: "fpm4-n31", tipo: "numerica", seccion: 4,
      variables: { m: [5, 40, 1], V: [100, 1000, 50] },
      enunciado: "Se disuelven {m} g de CaCl₂ (Pm = 111 g/mol) en agua hasta {V} mL. ¿Cuál es la concentración de iones cloruro, Cl⁻?",
      resolver: v => 2 * v.m / 111 / (v.V / 1000),
      unidad: "M", tolerancia: 0.02,
      explicacion: v => { const M = v.m / 111 / (v.V / 1000);
        return `[CaCl₂] = ${v.m}/111/${fmt(v.V / 1000)} = ${fmt(M)} M. CaCl₂ → Ca²⁺ + 2 Cl⁻: [Cl⁻] = 2·${fmt(M)} = <b>${fmt(2 * M)} M</b>.`; } },
    { id: "fpm4-n32", tipo: "numerica", seccion: 4,
      variables: { M: [0.5, 3, 0.1], mg: [100, 1000, 50] },
      enunciado: "Se tiene Na₂SO₄ {M} M. ¿Qué volumen hay que tomar para tener {mg} mg de ion sodio (Na: 23 g/mol)?",
      resolver: v => v.mg / 1000 / 23 / 2 / v.M * 1000,
      unidad: "mL", tolerancia: 0.02,
      explicacion: v => { const nNa = v.mg / 1000 / 23;
        return `n(Na⁺) = ${fmt(v.mg / 1000)}/23 = ${fmt(nNa)} mol → n(Na₂SO₄) = ${fmt(nNa / 2)} mol (2 Na⁺ por fórmula).<br>V = ${fmt(nNa / 2)}/${fmt(v.M)} = ${fmt(nNa / 2 / v.M)} L = <b>${fmt(nNa / 2 / v.M * 1000)} mL</b>.`; } },

    // ---------- Numéricas: valoraciones ----------
    { id: "fpm4-n33", tipo: "numerica", seccion: 5,
      variables: { Va: [10, 25, 5], Mb: [0.05, 0.2, 0.005], Vb: [5, 24, 0.1] },
      enunciado: "Se valoran {Va} mL de HCl con NaOH {Mb} M y se gastan {Vb} mL hasta el viraje. ¿Cuál es la molaridad del HCl?",
      resolver: v => v.Mb * v.Vb / v.Va,
      unidad: "M", tolerancia: 0.02,
      explicacion: v => `HCl + NaOH → NaCl + H₂O (1:1). M_a = M_b·V_b/V_a = ${fmt(v.Mb)}·${fmt(v.Vb)}/${v.Va} = <b>${fmt(v.Mb * v.Vb / v.Va)} M</b>.` },
    { id: "fpm4-n34", tipo: "numerica", seccion: 5,
      variables: { Va: [10, 25, 5], Mb: [0.05, 0.2, 0.005], Vb: [5, 24, 0.1] },
      enunciado: "Se valoran {Va} mL de H₂SO₄ con NaOH {Mb} M y se gastan {Vb} mL. ¿Cuál es la molaridad del ácido sulfúrico?",
      resolver: v => v.Mb * v.Vb / (2 * v.Va),
      unidad: "M", tolerancia: 0.02,
      explicacion: v => `H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O. n(NaOH) = ${fmt(v.Mb)}·${fmt(v.Vb / 1000)} = ${fmt(v.Mb * v.Vb / 1000)} mol → n(H₂SO₄) = la mitad.<br>M = ${fmt(v.Mb * v.Vb / 2000)}/${fmt(v.Va / 1000)} = <b>${fmt(v.Mb * v.Vb / (2 * v.Va))} M</b>.` },
    { id: "fpm4-n35", tipo: "numerica", seccion: 5,
      variables: { m: [9, 11, 0.01], Mb: [0.08, 0.12, 0.005], Vb: [15, 24, 0.1] },
      enunciado: "Se diluyen {m} g de vinagre hasta 100 mL. Una alícuota de 25 mL gasta {Vb} mL de NaOH {Mb} M. ¿Cuál es la acidez del vinagre en % en masa de ácido acético (Pm = 60 g/mol)?",
      resolver: v => v.Mb * v.Vb / 1000 * 4 * 60 / v.m * 100,
      unidad: "%", tolerancia: 0.02,
      explicacion: v => { const n = v.Mb * v.Vb / 1000;
        return `En la alícuota: n(ácido) = n(NaOH) = ${fmt(v.Mb)}·${fmt(v.Vb / 1000)} = ${fmt(n)} mol.<br>En los 100 mL (×4): ${fmt(4 * n)} mol = ${fmt(4 * n * 60)} g.<br>% = ${fmt(4 * n * 60)}/${fmt(v.m)}·100 = <b>${fmt(4 * n * 60 / v.m * 100)} %</b>.`; } },
    { id: "fpm4-n36", tipo: "numerica", seccion: 5,
      variables: { m: [9, 11, 0.01], Mb: [0.015, 0.02, 0.0005], Vb: [25, 40, 0.1] },
      enunciado: "Se diluyen {m} g de vinagre hasta 100 mL y se valoran 25 mL con hidróxido de bario, Ba(OH)₂, {Mb} M; se gastan {Vb} mL. ¿Cuál es la acidez en % de ácido acético (Pm = 60 g/mol)?",
      resolver: v => 2 * v.Mb * v.Vb / 1000 * 4 * 60 / v.m * 100,
      unidad: "%", tolerancia: 0.02,
      explicacion: v => { const n = 2 * v.Mb * v.Vb / 1000;
        return `Ba(OH)₂ da 2 OH⁻: n(ácido) = 2·${fmt(v.Mb)}·${fmt(v.Vb / 1000)} = ${fmt(n)} mol en 25 mL.<br>En 100 mL: ${fmt(4 * n)} mol = ${fmt(4 * n * 60)} g → % = ${fmt(4 * n * 60)}/${fmt(v.m)}·100 = <b>${fmt(4 * n * 60 / v.m * 100)} %</b>.`; } },
    { id: "fpm4-n37", tipo: "numerica", seccion: 4,
      variables: { Mb: [0.045, 0.055, 0.0005], Vb: [10, 24, 0.1], Va: [10, 25, 5] },
      enunciado: "Un HCl concentrado se diluye 10 veces; de esa disolución se llevan 25 mL a 100 mL. Al valorar {Va} mL de esta última se gastan {Vb} mL de NaOH {Mb} M. ¿Cuál era la concentración inicial del HCl?",
      resolver: v => v.Mb * v.Vb / v.Va * 40,
      unidad: "M", tolerancia: 0.02,
      explicacion: v => { const c = v.Mb * v.Vb / v.Va;
        return `Disolución valorada: M = ${fmt(v.Mb)}·${fmt(v.Vb)}/${v.Va} = ${fmt(c)} M.<br>Factor total = 10·(100/25) = 40 → C_inicial = ${fmt(c)}·40 = <b>${fmt(c * 40)} M</b>.`; } },
    { id: "fpm4-n38", tipo: "numerica", seccion: 4,
      variables: { Mb: [0.045, 0.055, 0.0005], Vb: [9, 13, 0.1] },
      enunciado: "Se diluyen 2 mL de un HCl comercial hasta 50 mL; de ahí, 10 mL hasta 150 mL. Al valorar 20 mL de esta última se gastan {Vb} mL de NaOH {Mb} M. ¿Cuál es la concentración real del HCl comercial?",
      resolver: v => v.Mb * v.Vb / 20 * 375,
      unidad: "M", tolerancia: 0.02,
      explicacion: v => { const c = v.Mb * v.Vb / 20;
        return `Valorada: M = ${fmt(v.Mb)}·${fmt(v.Vb)}/20 = ${fmt(c)} M.<br>Factor = (50/2)·(150/10) = 25·15 = 375 → C = ${fmt(c)}·375 = <b>${fmt(c * 375)} M</b>.`; } },
    { id: "fpm4-n39", tipo: "numerica", seccion: 6,
      variables: { Mb: [0.045, 0.055, 0.0005], Vb: [9, 13, 0.1] },
      enunciado: "Un HCl etiquetado al 37 % y d = 1,19 g/mL (Pm = 36,5) debería ser 12,06 M. Tras diluir 2 mL → 50 mL y 10 mL → 150 mL, 20 mL gastan {Vb} mL de NaOH {Mb} M. ¿Cuál es el error relativo de la etiqueta, en %?",
      resolver: v => Math.abs(v.Mb * v.Vb / 20 * 375 - 12.06) / 12.06 * 100,
      unidad: "%", tolerancia: 0.02, toleranciaAbs: 0.3,
      explicacion: v => { const c = v.Mb * v.Vb / 20 * 375, ea = Math.abs(c - 12.06);
        return `Concentración real: ${fmt(v.Mb)}·${fmt(v.Vb)}/20·375 = ${fmt(c)} M (nominal: 10·37·1,19/36,5 = 12,06 M).<br>Error absoluto = |${fmt(c)} − 12,06| = ${fmt(ea)} M. Error relativo = ${fmt(ea)}/12,06·100 = <b>${fmt(ea / 12.06 * 100)} %</b>.`; } },
    { id: "fpm4-n40", tipo: "numerica", seccion: 6,
      variables: { V: [15, 22, 1], M: [0.05, 0.2, 0.01] },
      enunciado: "Se normaliza una NaOH {M} M con ácido benzoico (monoprótico, Pm = 122 g/mol). ¿Cuántos mg de ácido benzoico hay que pesar para gastar unos {V} mL de NaOH?",
      resolver: v => v.M * v.V * 122,
      unidad: "mg", tolerancia: 0.02,
      explicacion: v => `n(NaOH) = ${fmt(v.M)}·${fmt(v.V / 1000)} = ${fmt(v.M * v.V / 1000)} mol = n(ácido benzoico).<br>m = ${fmt(v.M * v.V / 1000)}·122 = ${fmt(v.M * v.V * 0.122)} g = <b>${fmt(v.M * v.V * 122)} mg</b>.` },
    { id: "fpm4-n41", tipo: "numerica", seccion: 6,
      variables: { m: [0.3, 0.45, 0.001], V: [15, 24, 0.05] },
      enunciado: "Se pesan {m} g de ftalato ácido de potasio (FAP, monoprótico, Pm = 204,23 g/mol) y se valoran con NaOH; se gastan {V} mL. ¿Cuál es la concentración real de la NaOH?",
      resolver: v => v.m / 204.23 / (v.V / 1000),
      unidad: "M", tolerancia: 0.02,
      explicacion: v => `n(FAP) = ${fmt(v.m)}/204,23 = ${fmt(v.m / 204.23)} mol = n(NaOH).<br>M = ${fmt(v.m / 204.23)}/${fmt(v.V / 1000)} = <b>${fmt(v.m / 204.23 / (v.V / 1000))} M</b>.` },
    { id: "fpm4-n42", tipo: "numerica", seccion: 6,
      variables: { N: [0.09, 0.11, 0.0005] },
      enunciado: "Una sosa de normalidad nominal 0,1 N resulta tener, al normalizarla, una normalidad real de {N} N. ¿Cuál es su factor?",
      resolver: v => v.N / 0.1,
      unidad: "", tolerancia: 0.005,
      explicacion: v => `f = N_real/N_nominal = ${fmt(v.N)}/0,1 = <b>${fmt(v.N / 0.1)}</b>.` },
    { id: "fpm4-n43", tipo: "numerica", seccion: 6,
      variables: { Nb: [0.09, 0.11, 0.0005], Vb: [15, 22, 1], Na: [0.05, 0.2, 0.01] },
      enunciado: "Se quiere valorar un ácido de aproximadamente {Na} N con una sosa {Nb} N, gastando unos {Vb} mL. ¿Qué volumen de ácido hay que tomar?",
      resolver: v => v.Nb * v.Vb / v.Na,
      unidad: "mL", tolerancia: 0.02,
      explicacion: v => `N_a·V_a = N_b·V_b → V_a = ${fmt(v.Nb)}·${v.Vb}/${fmt(v.Na)} = <b>${fmt(v.Nb * v.Vb / v.Na)} mL</b>.` },
    { id: "fpm4-n44", tipo: "numerica", seccion: 5,
      variables: { N: [0.095, 0.105, 0.0005], V: [14, 20, 0.1] },
      enunciado: "Se valoran 20 mL de vino con potasa (KOH) {N} N y fenolftaleína; se gastan {V} mL. Expresa la acidez total en g/L de ácido tartárico (diprótico, Pm = 150 g/mol).",
      resolver: v => v.N * v.V / 20 * 75,
      unidad: "g/L", tolerancia: 0.02,
      explicacion: v => { const Nv = v.N * v.V / 20;
        return `N del vino = ${fmt(v.N)}·${fmt(v.V)}/20 = ${fmt(Nv)} eq/L.<br>Peso equivalente del tartárico = 150/2 = 75 g/eq → acidez = ${fmt(Nv)}·75 = <b>${fmt(Nv * 75)} g/L</b> (calidad adecuada si está entre 4,5 y 7 g/L).`; } },
    { id: "fpm4-n45", tipo: "numerica", seccion: 5,
      variables: { Vb: [15, 25, 0.1], Nb: [0.095, 0.105, 0.0005], Va: [10, 25, 5] },
      enunciado: "Se valoran {Va} mL de una dilución de ácido sulfúrico con sosa {Nb} N y se gastan {Vb} mL. ¿Cuál es la normalidad del ácido diluido?",
      resolver: v => v.Nb * v.Vb / v.Va,
      unidad: "N", tolerancia: 0.02,
      explicacion: v => `Con normalidades no hace falta la estequiometría: N_a = N_b·V_b/V_a = ${fmt(v.Nb)}·${fmt(v.Vb)}/${v.Va} = <b>${fmt(v.Nb * v.Vb / v.Va)} N</b>.` }
  ]
});
