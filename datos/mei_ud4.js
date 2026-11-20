// Mantenimiento electromecánico en industrias de proceso (0191) · UD4 Identificación y caracterización de máquinas eléctricas.
// Fuente: presentación «UD 4 Máquinas Eléctricas» y «UD 4 Ejercicios teoría de circuitos» (repo privado de materiales).
// Contenido redactado de nuevo. Lo marcado como «ampliación» (valor eficaz) no está en los apuntes.
registrarUD({
  id: "mei-ud4",
  modulo: "mei",
  codigo: "UD4",
  titulo: "Identificación y caracterización de máquinas eléctricas",
  descripcion: "Magnitudes eléctricas, ley de Ohm, Kirchhoff, alterna y trifásica, protecciones, seguridad eléctrica y generación",
  ejercicios: "Relación de ejercicios de teoría de circuitos de la UD4",
  guia: [
    {
      titulo: "1. Carga, tensión e intensidad",
      apuntes: "Apuntes UD4 (presentación), apartado 1, diapositivas 3–9 y 13",
      html: `
        <p>La <b>carga eléctrica</b> es una propiedad de algunas partículas subatómicas que se manifiesta con fuerzas de
        atracción y repulsión. Lo que llamamos electricidad es el <b>desplazamiento de cargas</b>, normalmente electrones,
        entre dos puntos. La carga, como la masa, se conserva.</p>
        <p>La <b>ley de Coulomb</b> da la fuerza entre dos cargas: proporcional al producto de las cargas e inversamente
        proporcional al cuadrado de la distancia, F = k·q₁·q₂/r².</p>
        <ul>
          <li><b>Tensión o diferencia de potencial (U o ΔV)</b>: lo que «empuja» a las cargas entre dos puntos. Se mide en
            <b>voltios (V)</b> con el <b>voltímetro</b>.</li>
          <li><b>Intensidad de corriente (I)</b>: carga que atraviesa una sección por unidad de tiempo. Se mide en
            <b>amperios (A)</b> con el <b>amperímetro</b>.</li>
          <li><b>Resistencia (R)</b>: oposición del material al paso de la corriente. Se mide en <b>ohmios (Ω)</b> con el
            óhmetro (función del multímetro).</li>
        </ul>
        <p><b>Símil hidráulico</b>: la corriente es como el caudal de agua por un canal, y la tensión como la diferencia de
        alturas que hace que el agua circule y pueda hacer un trabajo.</p>`
    },
    {
      titulo: "2. Resistencia, resistividad y ley de Ohm",
      apuntes: "Apuntes UD4, apartado 1, diapositivas 10–12",
      html: `
        <p>La <b>resistividad</b> ρ es la resistencia propia de cada material. En el SI va en Ω·m, pero los electricistas,
        que trabajan con secciones en mm², la dan en <b>Ω·mm²/m</b>. Valores habituales a 20 °C: plata 0,0159; cobre
        0,0172; aluminio 0,028; tungsteno 0,055.</p>
        <p>La resistencia de un cable crece con su longitud y disminuye con su sección:</p>
        <div class="formula">R = ρ · L / S</div>
        <p>En un buen conductor los electrones avanzan con pocos choques; en uno malo chocan más con los átomos, que vibran
        más: el material se <b>calienta</b>.</p>
        <p><b>Ley de Ohm</b>: la intensidad entre dos puntos es proporcional a la tensión e inversamente proporcional a la resistencia.</p>
        <div class="formula">U = I · R &nbsp;&nbsp; (V = A · Ω)</div>`
    },
    {
      titulo: "3. Potencia, energía y efecto Joule",
      apuntes: "Apuntes UD4, apartado 1, diapositiva 14; apartado 2, diapositiva 28",
      html: `
        <p>La <b>potencia</b> indica lo rápido que un aparato convierte la energía eléctrica en otra forma. Se mide en
        <b>vatios</b> (W = V·A = J/s):</p>
        <div class="formula">P = U · I = I² · R = U² / R &nbsp;&nbsp;&nbsp; E = P · t</div>
        <ul>
          <li>La energía en el SI va en julios (J); en las facturas, en <b>kWh</b> (1 kWh = 3,6·10⁶ J).</li>
          <li><b>Efecto Joule</b>: la energía que se disipa en forma de calor en un conductor recorrido por una corriente,
            E = I·U·t = I²·R·t. Es lo que aprovechan las resistencias calefactoras y los fusibles.</li>
        </ul>`
    },
    {
      titulo: "4. El circuito eléctrico y las leyes de Kirchhoff",
      apuntes: "Apuntes UD4, apartado 2, diapositivas 15–19",
      html: `
        <p>Un <b>circuito eléctrico</b> es un recorrido cerrado que permite a los electrones ir desde un punto de mayor
        potencial hasta otro de menor potencial, entregando energía a su paso. Tiene cuatro familias de elementos: <b>generadores</b>,
        <b>receptores</b>, <b>conductores</b> (cables) y <b>elementos de control y regulación</b>. Se dibujan con los
        símbolos de la norma UNE-EN 60617.</p>
        <ul>
          <li><b>Nodo</b>: punto donde la corriente se reparte (se unen tres o más conductores).</li>
          <li><b>Rama</b>: tramo entre dos nodos; por ella circula una única intensidad.</li>
          <li><b>Malla</b>: camino cerrado del circuito.</li>
        </ul>
        <p><b>1.ª ley de Kirchhoff (nodos)</b>: la suma de las corrientes que entran en un nodo es igual a la de las que
        salen (conservación de la carga: en un nodo no se acumulan electrones). Criterio habitual: + las que entran, − las que salen.</p>
        <p><b>2.ª ley de Kirchhoff (mallas)</b>: en una malla, la suma de las caídas de tensión en los receptores es igual a
        la tensión de los generadores (conservación de la energía). Se recorre normalmente en sentido horario.</p>
        <p class="clave"><b>Sentido convencional</b>: del polo + al −, por costumbre, aunque los electrones van del − al +.
        En los cálculos se usa el convencional.</p>`
    },
    {
      titulo: "5. Asociación de resistencias",
      apuntes: "Apuntes UD4, apartado 2, diapositiva 25",
      html: `
        <table class="tabla">
          <tr><th></th><th>Serie</th><th>Paralelo</th></tr>
          <tr><td>Equivalente</td><td>R<sub>eq</sub> = R₁ + R₂ + R₃</td><td>1/R<sub>eq</sub> = 1/R₁ + 1/R₂ + 1/R₃</td></tr>
          <tr><td>Igual en todas</td><td>la intensidad</td><td>la tensión</td></tr>
          <tr><td>Se reparte</td><td>la tensión (más caída en la mayor R)</td><td>la intensidad (más corriente por la menor R)</td></tr>
          <tr><td>Si una se abre</td><td>se apaga todo</td><td>las demás siguen funcionando</td></tr>
        </table>
        <ul>
          <li>Dos en paralelo: R<sub>eq</sub> = R₁·R₂/(R₁ + R₂).</li>
          <li>La equivalente en paralelo es siempre <b>menor que la menor</b> de ellas.</li>
          <li><b>Divisor de tensión</b> (dos en serie): U₂ = U·R₂/(R₁ + R₂).</li>
          <li>Circuito <b>mixto</b>: resuelve primero los grupos en paralelo, súmalos con los de serie, calcula la intensidad
            total con Ohm y vuelve hacia atrás repartiendo tensiones e intensidades.</li>
        </ul>`
    },
    {
      titulo: "6. Corriente continua, alterna y trifásica",
      apuntes: "Apuntes UD4, apartado 2, diapositivas 20–24",
      html: `
        <p>En <b>corriente continua</b> (CC, DC) el sentido no cambia y la tensión es constante: pilas, baterías, placas
        fotovoltaicas y fuentes de alimentación (cargadores). La usan casi todos los aparatos electrónicos.</p>
        <p>En <b>corriente alterna</b> (CA, AC) el sentido cambia periódicamente y la tensión sigue una senoide:</p>
        <div class="formula">V(t) = V₀ · sin(2π·f·t + β)</div>
        <p>V₀ es la tensión máxima (de pico) y β el desfase. Es la que producen las centrales por inducción y la que usan
        la mayoría de máquinas, domésticas e industriales.</p>
        <p><b>Frecuencia</b>: veces por segundo que se repite el ciclo, <b>f = 1/T</b> (Hz). Toda la red está sincronizada:
        <b>50 Hz en Europa</b>, 60 Hz en EE. UU.</p>
        <p><b>Trifásica</b>: tres tensiones iguales desfasadas <b>120°</b> entre sí. Es la forma en que se produce y
        distribuye casi toda la energía (los cables de las torres van de tres en tres) y la que usa la industria para las
        máquinas de potencia; la monofásica es la de las viviendas.</p>
        <p class="sub">Ampliación (no está en los apuntes): los 230 V de un enchufe son el valor <b>eficaz</b>, V<sub>ef</sub> = V₀/√2; el pico es unos 325 V.</p>`
    },
    {
      titulo: "7. Aparatos de medida",
      apuntes: "Apuntes UD4, apartado 2, diapositivas 26–27",
      html: `
        <p>El aparato más usado en mantenimiento es el <b>multímetro digital</b>: mide tensión e intensidad (en CC y CA),
        resistencia y continuidad, eligiendo la función con el selector.</p>
        <ul>
          <li>Como <b>amperímetro</b> se conecta <b>en serie</b>: la corriente tiene que pasar por él.</li>
          <li>Como <b>voltímetro</b> se conecta <b>en paralelo</b>, entre los dos puntos cuya diferencia de tensión se quiere medir.</li>
          <li>La <b>pinza amperimétrica</b> mide la intensidad por <b>inducción electromagnética</b>, abrazando el cable:
            sin abrir el circuito y sin tocar los conductores.</li>
        </ul>`
    },
    {
      titulo: "8. Protección y accionamiento",
      apuntes: "Apuntes UD4, apartado 2, diapositivas 28–32",
      html: `
        <h4>Fusible</h4>
        <p>Protege frente a <b>sobrecargas y cortocircuitos</b>. Tiene un filamento que, por efecto Joule, se funde y abre
        el circuito cuando pasa la intensidad marcada en él. Se colocan a la <b>entrada</b> de la corriente en la instalación.</p>
        <h4>Interruptor diferencial</h4>
        <p>En una instalación monofásica la intensidad que entra por la fase debe ser la misma que vuelve por el neutro.
        Si hay una <b>corriente de fuga o de defecto</b> a tierra (por la toma de tierra o por partes metálicas), las dos ya
        no coinciden y el diferencial corta. Protege a las <b>personas</b> frente a fallos de aislamiento (riesgo de electrocución).</p>
        <h4>Relé</h4>
        <p>Interruptor accionado por un <b>electroimán</b>: al dar tensión a su bobina, atrae una armadura que cierra (o abre)
        unos contactos. Así un <b>circuito de control</b> de baja tensión gobierna un <b>circuito de potencia</b> de tensión
        más alta (motores, lámparas), que es independiente.</p>`
    },
    {
      titulo: "9. Seguridad eléctrica",
      apuntes: "Apuntes UD4, apartado 3, diapositivas 33–41",
      html: `
        <p><b>Cortocircuito</b>: la corriente pasa por un tramo de resistencia casi nula (polos unidos, aislante dañado que
        junta fase y neutro…). La intensidad sube de golpe y con ella el calor: se funden aislantes, se queman equipos y
        puede haber un incendio.</p>
        <h4>Riesgo de electrocución</h4>
        <p>Los efectos dependen de la <b>intensidad</b>, la <b>resistencia del cuerpo</b> (500–3000 Ω según los apuntes; baja
        con la humedad), el <b>tiempo</b> de contacto y el <b>recorrido</b> de la corriente. Para electrocutarse tienen que
        darse a la vez: cuerpo conductor, formar parte del circuito y estar sometido a una tensión peligrosa. (Por eso un
        pájaro en un solo cable no se electrocuta: entre sus patas casi no hay diferencia de potencial.)</p>
        <ul>
          <li><b>Contacto directo</b>: con partes que normalmente tienen tensión. Se evita alejando, aislando o poniendo barreras.</li>
          <li><b>Contacto indirecto</b>: con masas metálicas que han quedado en tensión por un fallo de aislamiento.</li>
        </ul>
        <h4>Antes de trabajar en una instalación</h4>
        <ol>
          <li>Cortar de forma efectiva todas las fuentes de tensión.</li>
          <li>Bloquear el aparato de corte (si se puede) y señalizar que se está trabajando.</li>
          <li>Comprobar la ausencia de tensión.</li>
          <li>Poner a tierra y en cortocircuito.</li>
          <li>Señalizar y delimitar la zona de trabajo.</li>
        </ol>
        <p>Los <b>EPI aislantes</b> (casco, guantes) aumentan la resistencia del cuerpo: no evitan el accidente, pero reducen la lesión.
        Para <b>socorrer</b> a alguien: cortar la corriente (preparando su caída si está en alto); si no se puede, separarlo
        con pértiga, guantes y calzado aislantes, o cortar el cable con una herramienta de mango aislante. Nunca tocarlo directamente.</p>
        <p class="sub">Normativa: Reglamento Electrotécnico de Baja Tensión, reglamentos de líneas de alta tensión y de
        centrales y subestaciones, y la normativa general de seguridad en el trabajo.</p>`
    },
    {
      titulo: "10. Producción de energía eléctrica",
      apuntes: "Apuntes UD4, apartado 4, diapositivas 42–44",
      html: `
        <p>Fuentes: hidroeléctrica, eólica, fotovoltaica (renovables), térmica convencional y nuclear (no renovables).</p>
        <p>Todas las máquinas que convierten energía mecánica en eléctrica se basan en la <b>inducción
        electromagnética</b>: un imán que se mueve cerca de un conductor desplaza sus electrones y produce una
        <b>corriente inducida</b>.</p>
        <p>En un <b>alternador</b>, una turbina (de agua, vapor o viento) hace girar el <b>rotor</b>, con imanes, dentro del
        <b>estator</b>, formado por bobinas en las que se induce la corriente alterna. Los diseños varían mucho, pero el
        principio es siempre el mismo.</p>`
    },
    {
      titulo: "11. Método para resolver circuitos",
      apuntes: "Relación de ejercicios de teoría de circuitos de la UD4 (ejercicios 1 y 2)",
      html: `
        <ol>
          <li>Dibuja el sentido convencional de la corriente (del + del generador hacia fuera).</li>
          <li>Localiza nodos, ramas y mallas. Un interruptor abierto anula su rama; uno cerrado sin nada más es un hilo.</li>
          <li>Agrupa resistencias en serie y en paralelo hasta una sola equivalente.</li>
          <li>Intensidad total: I = U/R<sub>eq</sub>.</li>
          <li>Vuelve hacia atrás: en serie, U = I·R en cada una; en paralelo, la misma U para todas e I = U/R en cada rama.</li>
          <li>Comprueba con Kirchhoff: las intensidades cuadran en cada nodo y las tensiones en cada malla.</li>
          <li>Con dos generadores en mallas distintas, plantea una ecuación de Kirchhoff por malla y resuelve el sistema.</li>
        </ol>`
    },
    {
      titulo: "12. Formulario",
      apuntes: "Resumen de las fórmulas de los apuntes de la UD4",
      html: `
        <table class="tabla">
          <tr><td>Ley de Ohm</td><td>U = I·R</td></tr>
          <tr><td>Resistencia de un cable</td><td>R = ρ·L/S (ρ en Ω·mm²/m, L en m, S en mm²)</td></tr>
          <tr><td>Potencia</td><td>P = U·I = I²R = U²/R</td></tr>
          <tr><td>Energía</td><td>E = P·t ; 1 kWh = 3,6·10⁶ J</td></tr>
          <tr><td>Serie</td><td>R<sub>eq</sub> = ΣR<sub>i</sub></td></tr>
          <tr><td>Paralelo</td><td>1/R<sub>eq</sub> = Σ1/R<sub>i</sub></td></tr>
          <tr><td>Kirchhoff nodos</td><td>ΣI<sub>entran</sub> = ΣI<sub>salen</sub></td></tr>
          <tr><td>Kirchhoff mallas</td><td>ΣU<sub>generadores</sub> = Σ(I·R)</td></tr>
          <tr><td>Alterna</td><td>V(t) = V₀·sin(2πft + β) ; f = 1/T</td></tr>
          <tr><td>Valor eficaz (ampliación)</td><td>V<sub>ef</sub> = V₀/√2</td></tr>
        </table>`
    }
  ],

  preguntas: [
    // ---------- 1. Carga, tensión e intensidad ----------
    { id: "mei4-1", tipo: "test", seccion: 1,
      enunciado: "¿En qué unidad se mide la tensión eléctrica y con qué aparato?",
      opciones: ["En voltios, con un voltímetro", "En amperios, con un amperímetro", "En ohmios, con un óhmetro", "En vatios, con un vatímetro"],
      correcta: 0,
      explicacion: "La tensión o diferencia de potencial (U) se mide en voltios con el voltímetro. Amperios e intensidad van con el amperímetro." },
    { id: "mei4-2", tipo: "test", seccion: 1,
      enunciado: "La intensidad de corriente es…",
      opciones: ["La carga que atraviesa una sección del conductor por unidad de tiempo", "La diferencia de potencial entre dos puntos",
        "La oposición del material al paso de la corriente", "La energía consumida por unidad de tiempo"],
      correcta: 0,
      explicacion: "I mide cuántas cargas (electrones) pasan por una sección cada segundo. Se mide en amperios (A)." },
    { id: "mei4-3", tipo: "test", seccion: 1,
      enunciado: "En el símil hidráulico de la electricidad, ¿a qué equivale la diferencia de potencial?",
      opciones: ["A la diferencia de alturas que hace circular el agua", "Al caudal de agua", "A la anchura del canal", "Al volumen del depósito"],
      correcta: 0,
      explicacion: "El agua baja por la diferencia de alturas igual que las cargas circulan por la diferencia de potencial. El caudal equivale a la intensidad." },
    { id: "mei4-4", tipo: "vf", seccion: 1,
      enunciado: "En un sistema cerrado, la carga eléctrica se conserva.",
      correcta: true,
      explicacion: "Igual que la masa: los electrones se desplazan, pero no se crean ni se destruyen. En esto se basa la 1.ª ley de Kirchhoff." },
    { id: "mei4-5", tipo: "test", seccion: 1,
      enunciado: "¿Qué relaciona la ley de Coulomb?",
      opciones: ["La fuerza entre dos cargas con el valor de las cargas y la distancia que las separa", "La tensión, la intensidad y la resistencia",
        "El calor desprendido con la intensidad", "Las corrientes que entran y salen de un nodo"],
      correcta: 0,
      explicacion: "F = k·q₁·q₂/r²: más fuerza cuanto mayores las cargas y menos cuanto más lejos (con el cuadrado de la distancia). Lo segundo es la ley de Ohm." },
    { id: "mei4-6", tipo: "test", seccion: 1,
      enunciado: "En un cable metálico, la corriente eléctrica consiste en…",
      opciones: ["Un desplazamiento de electrones", "Un movimiento de protones", "Un flujo de iones de hidrógeno", "Una vibración de los átomos sin desplazamiento de cargas"],
      correcta: 0,
      explicacion: "En los metales se mueven los electrones; los núcleos (con los protones) quedan fijos y solo vibran." },

    // ---------- 2. Resistencia y ley de Ohm ----------
    { id: "mei4-7", tipo: "test", seccion: 2,
      enunciado: "De estos metales, ¿cuál conduce mejor la electricidad (menor resistividad)?",
      opciones: ["Plata", "Cobre", "Aluminio", "Tungsteno"],
      correcta: 0,
      explicacion: "Resistividades: plata 0,0159 < cobre 0,0172 < aluminio 0,028 < tungsteno 0,055 Ω·mm²/m. El cobre se usa en cables porque es casi tan bueno y mucho más barato." },
    { id: "mei4-8", tipo: "test", seccion: 2,
      enunciado: "¿En qué unidades suelen expresar la resistividad los electricistas?",
      opciones: ["Ω·mm²/m", "Ω", "Ω/m²", "V/A"],
      correcta: 0,
      explicacion: "Como las secciones de cable van en mm² y las longitudes en m, es cómodo usar Ω·mm²/m. En el SI sería Ω·m." },
    { id: "mei4-9", tipo: "test", seccion: 2,
      enunciado: "Si se duplica la longitud de un cable sin cambiar su sección, su resistencia…",
      opciones: ["Se duplica", "Se reduce a la mitad", "Se cuadruplica", "No cambia"],
      correcta: 0,
      explicacion: "R = ρ·L/S: la resistencia es proporcional a la longitud." },
    { id: "mei4-10", tipo: "test", seccion: 2,
      enunciado: "Si se duplica la sección de un cable sin cambiar su longitud, su resistencia…",
      opciones: ["Se reduce a la mitad", "Se duplica", "Se reduce a la cuarta parte", "No cambia"],
      correcta: 0,
      explicacion: "R = ρ·L/S: la resistencia es inversamente proporcional a la sección. Por eso los cables que llevan mucha corriente son más gruesos." },
    { id: "mei4-11", tipo: "vf", seccion: 2,
      enunciado: "En un mal conductor, los choques de los electrones con los átomos calientan el material.",
      correcta: true,
      explicacion: "Los choques frenan a los electrones y hacen vibrar más a los átomos: sube la temperatura (efecto Joule)." },
    { id: "mei4-12", tipo: "test", seccion: 2,
      enunciado: "En una resistencia fija, si la tensión aplicada se duplica, la intensidad…",
      opciones: ["Se duplica", "Se reduce a la mitad", "No cambia", "Se cuadruplica"],
      correcta: 0,
      explicacion: "Ley de Ohm: I = U/R. Con R constante, I es proporcional a U." },

    // ---------- 3. Potencia, energía y efecto Joule ----------
    { id: "mei4-13", tipo: "test", seccion: 3,
      enunciado: "¿En qué unidad se mide la potencia eléctrica?",
      opciones: ["Vatio (W = V·A = J/s)", "Julio (J)", "Kilovatio hora (kWh)", "Amperio hora (Ah)"],
      correcta: 0,
      explicacion: "La potencia es energía por unidad de tiempo: W = J/s, y en electricidad P = U·I (V·A). El julio y el kWh son de energía." },
    { id: "mei4-14", tipo: "test", seccion: 3,
      enunciado: "El kilovatio hora (kWh) que aparece en la factura de la luz es una unidad de…",
      opciones: ["Energía", "Potencia", "Intensidad", "Tensión"],
      correcta: 0,
      explicacion: "kW (potencia) × h (tiempo) = energía. 1 kWh = 1000 W·3600 s = 3,6·10⁶ J." },
    { id: "mei4-15", tipo: "vf", seccion: 3,
      enunciado: "El efecto Joule es el calor que desprende un conductor cuando circula corriente por él.",
      correcta: true,
      explicacion: "E = I²·R·t. Se aprovecha en calefactores y fusibles; en cables y motores es una pérdida." },
    { id: "mei4-16", tipo: "test", seccion: 3,
      enunciado: "Dos resistencias se conectan por separado a la misma tensión. ¿Cuál consume más potencia?",
      opciones: ["La de menor resistencia", "La de mayor resistencia", "Las dos igual", "Ninguna: la potencia no depende de R"],
      correcta: 0,
      explicacion: "A tensión fija, P = U²/R: cuanto menor es R, más intensidad pasa y más potencia consume." },

    // ---------- 4. Circuito y Kirchhoff ----------
    { id: "mei4-17", tipo: "test", seccion: 4,
      enunciado: "¿Cuáles son las cuatro familias de elementos de un circuito eléctrico?",
      opciones: ["Generadores, receptores, conductores y elementos de control y regulación", "Pilas, bombillas, motores y fusibles",
        "Fase, neutro, tierra y protección", "Resistencias, condensadores, bobinas y diodos"],
      correcta: 0,
      explicacion: "Los generadores dan la energía, los receptores la usan, los conductores la llevan y los de control (interruptores, relés, protecciones) la gobiernan." },
    { id: "mei4-18", tipo: "test", seccion: 4,
      enunciado: "En teoría de circuitos, un nodo es…",
      opciones: ["Un punto donde la corriente se reparte (se unen tres o más conductores)", "Un camino cerrado del circuito",
        "Un tramo por el que circula una sola intensidad", "Un elemento que abre el circuito"],
      correcta: 0,
      explicacion: "Nodo: bifurcación de corriente. Malla: camino cerrado. Rama: tramo entre dos nodos con una única intensidad." },
    { id: "mei4-19", tipo: "test", seccion: 4,
      enunciado: "Una malla es…",
      opciones: ["Un camino cerrado del circuito", "Un punto de unión de conductores", "Un generador con su resistencia interna", "El cable de tierra"],
      correcta: 0,
      explicacion: "Una malla es un lazo cerrado por el que puede circular la corriente. A cada malla se le aplica la 2.ª ley de Kirchhoff." },
    { id: "mei4-20", tipo: "test", seccion: 4,
      enunciado: "La 1.ª ley de Kirchhoff (ley de los nodos) es una aplicación de…",
      opciones: ["La conservación de la carga: en un nodo no se acumulan ni se pierden electrones", "La conservación de la energía",
        "La ley de Ohm", "El efecto Joule"],
      correcta: 0,
      explicacion: "Todo lo que entra en un nodo tiene que salir: ΣI_entran = ΣI_salen. La 2.ª ley (mallas) es la de la conservación de la energía." },
    { id: "mei4-21", tipo: "test", seccion: 4,
      enunciado: "¿Qué dice la 2.ª ley de Kirchhoff (ley de las mallas)?",
      opciones: ["En una malla, la suma de las caídas de tensión en los receptores es igual a la tensión de los generadores",
        "En un nodo, entra tanta corriente como sale", "La intensidad es igual en todos los elementos de un circuito",
        "La tensión es igual en todos los elementos de un circuito"],
      correcta: 0,
      explicacion: "Es la conservación de la energía en un camino cerrado: lo que aportan los generadores lo consumen los receptores." },
    { id: "mei4-22", tipo: "vf", seccion: 4,
      enunciado: "El sentido convencional de la corriente va del polo negativo al positivo del generador.",
      correcta: false,
      explicacion: "El convencional va del + al −. Los electrones (sentido real) van del − al +, pero se fijó el convencional antes de descubrirlos y se sigue usando en los cálculos." },
    { id: "mei4-23", tipo: "test", seccion: 4,
      enunciado: "¿Qué norma fija en España los símbolos para dibujar esquemas eléctricos?",
      opciones: ["UNE-EN 60617 (IEC 60617)", "ISO 9001", "UNE-EN ISO 14001", "Reglamento de aparatos a presión"],
      correcta: 0,
      explicacion: "Los símbolos gráficos para esquemas están en la UNE-EN 60617, equivalente a la internacional IEC 60617." },

    // ---------- 5. Asociación de resistencias ----------
    { id: "mei4-24", tipo: "test", seccion: 5,
      enunciado: "En varias resistencias conectadas en serie, ¿qué magnitud es la misma en todas?",
      opciones: ["La intensidad", "La tensión", "La potencia", "Ninguna"],
      correcta: 0,
      explicacion: "En serie solo hay un camino: la misma corriente pasa por todas. La tensión se reparte (más en la mayor)." },
    { id: "mei4-25", tipo: "test", seccion: 5,
      enunciado: "En varias resistencias conectadas en paralelo, ¿qué magnitud es la misma en todas?",
      opciones: ["La tensión", "La intensidad", "La potencia", "Ninguna"],
      correcta: 0,
      explicacion: "En paralelo todas están entre los mismos dos nodos, así que tienen la misma tensión. La intensidad se reparte." },
    { id: "mei4-26", tipo: "vf", seccion: 5,
      enunciado: "La resistencia equivalente de varias resistencias en paralelo es siempre menor que la más pequeña de ellas.",
      correcta: true,
      explicacion: "Cada rama nueva abre otro camino a la corriente: la oposición total baja. Por ejemplo, 100 Ω ∥ 100 Ω = 50 Ω." },
    { id: "mei4-27", tipo: "vf", seccion: 5,
      enunciado: "En un circuito con varias lámparas en serie, si una se funde, las demás siguen encendidas.",
      correcta: false,
      explicacion: "En serie solo hay un camino: si se abre en un punto, deja de circular corriente por todo el circuito. En paralelo sí seguirían encendidas." },
    { id: "mei4-28", tipo: "test", seccion: 5,
      enunciado: "Dos resistencias distintas están en paralelo. ¿Por cuál circula más corriente?",
      opciones: ["Por la de menor resistencia", "Por la de mayor resistencia", "Por las dos la misma", "Depende del sentido de la corriente"],
      correcta: 0,
      explicacion: "Tienen la misma tensión, así que I = U/R es mayor donde R es menor: la corriente prefiere el camino de menos resistencia." },

    // ---------- 6. Continua, alterna y trifásica ----------
    { id: "mei4-29", tipo: "test", seccion: 6,
      enunciado: "¿Qué caracteriza a la corriente continua?",
      opciones: ["El sentido de la corriente no cambia y la tensión es constante", "Cambia de sentido 50 veces por segundo",
        "Tiene tres fases desfasadas 120°", "Solo la producen las grandes centrales"],
      correcta: 0,
      explicacion: "En CC el sentido no cambia. La producen pilas, baterías, placas fotovoltaicas y fuentes de alimentación." },
    { id: "mei4-30", tipo: "test", seccion: 6,
      enunciado: "¿Cuál de estas fuentes da corriente continua?",
      opciones: ["Una placa fotovoltaica", "El alternador de una central", "Un enchufe de casa", "Una línea trifásica"],
      correcta: 0,
      explicacion: "Pilas, baterías y placas solares dan continua. Las centrales producen alterna por inducción, y esa es la que llega a los enchufes." },
    { id: "mei4-31", tipo: "test", seccion: 6,
      enunciado: "¿Cuál es la frecuencia de la red eléctrica en Europa?",
      opciones: ["50 Hz", "60 Hz", "230 Hz", "400 Hz"],
      correcta: 0,
      explicacion: "En Europa la red funciona a 50 Hz; en EE. UU., a 60 Hz. Todos los equipos conectados a la red tienen que estar sincronizados." },
    { id: "mei4-32", tipo: "test", seccion: 6,
      enunciado: "En un sistema trifásico, ¿cuánto están desfasadas las tres tensiones entre sí?",
      opciones: ["120°", "90°", "180°", "60°"],
      correcta: 0,
      explicacion: "Las tres fases tienen la misma forma senoidal, repartidas a 360°/3 = 120°." },
    { id: "mei4-33", tipo: "vf", seccion: 6,
      enunciado: "La corriente alterna trifásica es la habitual en instalaciones industriales con máquinas de cierta potencia.",
      correcta: true,
      explicacion: "La trifásica permite transportar y usar más potencia; la monofásica es la de las viviendas." },
    { id: "mei4-34", tipo: "test", seccion: 6,
      enunciado: "En la expresión V(t) = V₀·sin(2π·f·t + β), ¿qué es V₀?",
      opciones: ["La tensión máxima o de pico", "La frecuencia", "El desfase", "El periodo"],
      correcta: 0,
      explicacion: "V₀ es la amplitud (valor máximo), f la frecuencia y β el desfase inicial." },
    { id: "mei4-35", tipo: "vf", seccion: 6,
      enunciado: "Las grandes centrales eléctricas producen sobre todo corriente continua.",
      correcta: false,
      explicacion: "Producen corriente alterna, normalmente trifásica, porque sus alternadores funcionan por inducción electromagnética." },

    // ---------- 7. Medida ----------
    { id: "mei4-36", tipo: "test", seccion: 7,
      enunciado: "¿Cómo se conecta un amperímetro para medir la corriente de un receptor?",
      opciones: ["En serie con el receptor", "En paralelo con el receptor", "Entre fase y tierra", "Da igual cómo se conecte"],
      correcta: 0,
      explicacion: "La corriente que se quiere medir tiene que pasar por el aparato: se abre el circuito y se intercala en serie." },
    { id: "mei4-37", tipo: "test", seccion: 7,
      enunciado: "¿Cómo se conecta un voltímetro para medir la tensión de una lámpara?",
      opciones: ["En paralelo, entre los dos bornes de la lámpara", "En serie con la lámpara", "Entre la lámpara y tierra", "Sustituyendo a la lámpara"],
      correcta: 0,
      explicacion: "La tensión es una diferencia entre dos puntos: el voltímetro se coloca entre ellos, en paralelo." },
    { id: "mei4-38", tipo: "test", seccion: 7,
      enunciado: "¿En qué se basa la pinza amperimétrica para medir sin abrir el circuito?",
      opciones: ["En la inducción electromagnética", "En el efecto Joule", "En la ley de Coulomb", "En el efecto fotoeléctrico"],
      correcta: 0,
      explicacion: "La corriente del cable crea un campo magnético que la pinza detecta por inducción, sin tocar el conductor ni interrumpir el circuito." },

    // ---------- 8. Protección y accionamiento ----------
    { id: "mei4-39", tipo: "test", seccion: 8,
      enunciado: "¿Cómo actúa un fusible?",
      opciones: ["Su filamento se funde por efecto Joule y abre el circuito al superarse su intensidad", "Un electroimán abre unos contactos",
        "Compara la corriente de fase y la de neutro", "Desvía la corriente a tierra"],
      correcta: 0,
      explicacion: "Si pasa más intensidad de la marcada, el filamento se calienta (I²R) hasta fundirse y deja el circuito abierto." },
    { id: "mei4-40", tipo: "test", seccion: 8,
      enunciado: "¿Dónde se colocan los fusibles en una instalación?",
      opciones: ["A la entrada de la corriente en la instalación", "Al final de cada cable", "Dentro de cada lámpara", "En la toma de tierra"],
      correcta: 0,
      explicacion: "Se instalan a la entrada para proteger todo lo que hay detrás frente a cortocircuitos y sobrecargas." },
    { id: "mei4-41", tipo: "test", seccion: 8,
      enunciado: "¿Qué detecta un interruptor diferencial?",
      opciones: ["Que la corriente que entra por la fase no es igual a la que vuelve por el neutro (fuga a tierra)", "Una sobretensión por un rayo",
        "Un aumento de temperatura del cable", "Un cambio de frecuencia de la red"],
      correcta: 0,
      explicacion: "Si parte de la corriente se fuga a tierra (por la toma de tierra o por una persona), entrada y salida dejan de coincidir y el diferencial corta." },
    { id: "mei4-42", tipo: "vf", seccion: 8,
      enunciado: "El interruptor diferencial está pensado sobre todo para proteger a las personas frente a la electrocución.",
      correcta: true,
      explicacion: "Detecta corrientes de defecto por fallos de aislamiento, que son las que pueden pasar por el cuerpo de una persona." },
    { id: "mei4-43", tipo: "test", seccion: 8,
      enunciado: "¿Qué es un relé?",
      opciones: ["Un interruptor accionado por un electroimán, que permite que un circuito de control gobierne uno de potencia",
        "Un fusible rearmable", "Un aparato que mide la intensidad", "Un generador de corriente continua"],
      correcta: 0,
      explicacion: "Al dar tensión a la bobina, el electroimán mueve los contactos. Así una señal de baja tensión enciende motores o lámparas de un circuito independiente." },

    // ---------- 9. Seguridad eléctrica ----------
    { id: "mei4-44", tipo: "test", seccion: 9,
      enunciado: "¿Qué es un cortocircuito?",
      opciones: ["La circulación de corriente por un camino de resistencia casi nula", "Una caída de la tensión de la red",
        "Un circuito abierto por un interruptor", "Una pequeña fuga de corriente a tierra"],
      correcta: 0,
      explicacion: "Por ejemplo, al juntarse fase y neutro por un aislante dañado. Con R ≈ 0, la intensidad se dispara (I = U/R) y con ella el calor." },
    { id: "mei4-45", tipo: "test", seccion: 9,
      enunciado: "Según los apuntes, ¿cuál es la resistencia del cuerpo humano al paso de la corriente?",
      opciones: ["Entre 500 y 3000 Ω", "Entre 5 y 30 Ω", "Entre 50 000 y 300 000 Ω", "Es infinita: el cuerpo es aislante"],
      correcta: 0,
      explicacion: "Unos 500–3000 Ω, y menos cuanto más húmeda esté la piel. Con 230 V puede pasar una corriente peligrosa." },
    { id: "mei4-46", tipo: "vf", seccion: 9,
      enunciado: "La humedad aumenta la resistencia del cuerpo humano y lo protege de las descargas.",
      correcta: false,
      explicacion: "Al revés: la humedad hace al cuerpo mejor conductor (menos resistencia), así que pasa más corriente." },
    { id: "mei4-47", tipo: "test", seccion: 9,
      enunciado: "¿Por qué no se electrocuta un pájaro posado en un solo cable de alta tensión?",
      opciones: ["Entre sus patas casi no hay diferencia de potencial y el cable resiste mucho menos que su cuerpo",
        "Sus plumas son un aislante perfecto", "La corriente alterna no afecta a los animales", "Los cables de alta tensión no llevan corriente"],
      correcta: 0,
      explicacion: "La corriente va por el camino de menos resistencia (el cable) y la tensión entre dos puntos tan cercanos es mínima. Si tocara otro cable o tierra, sí se electrocutaría." },
    { id: "mei4-48", tipo: "test", seccion: 9,
      enunciado: "Un contacto eléctrico indirecto es el que se produce…",
      opciones: ["Con una masa metálica que ha quedado en tensión por un fallo de aislamiento", "Con un conductor que normalmente tiene tensión",
        "Con un cable desconectado", "A través del aire, sin tocar nada"],
      correcta: 0,
      explicacion: "Directo: con partes activas. Indirecto: con partes que normalmente no tienen tensión (carcasas) pero que la tienen por un defecto." },
    { id: "mei4-49", tipo: "test", seccion: 9,
      enunciado: "Antes de trabajar en una instalación eléctrica, ¿qué se hace primero?",
      opciones: ["Cortar de forma efectiva todas las fuentes de tensión", "Poner a tierra y en cortocircuito", "Comprobar la ausencia de tensión", "Delimitar la zona de trabajo"],
      correcta: 0,
      explicacion: "Orden: cortar, bloquear y señalizar el corte, comprobar ausencia de tensión, poner a tierra y en cortocircuito, y delimitar la zona." },
    { id: "mei4-50", tipo: "test", seccion: 9,
      enunciado: "Ya has cortado la tensión y bloqueado el interruptor. ¿Cuál es el siguiente paso?",
      opciones: ["Comprobar la ausencia de tensión", "Empezar a trabajar", "Retirar la señalización", "Volver a conectar para probar"],
      correcta: 0,
      explicacion: "Nunca hay que dar por hecho que no hay tensión: se comprueba con un aparato antes de poner a tierra y en cortocircuito." },
    { id: "mei4-51", tipo: "vf", seccion: 9,
      enunciado: "Los equipos de protección aislantes (casco y guantes) eliminan la posibilidad de sufrir un accidente eléctrico.",
      correcta: false,
      explicacion: "No evitan el accidente: aumentan la resistencia del cuerpo para que la lesión no se produzca o sea menos grave." },
    { id: "mei4-52", tipo: "test", seccion: 9,
      enunciado: "Una persona está recibiendo una descarga eléctrica. ¿Qué debes hacer?",
      opciones: ["Cortar la corriente o separarla con una pértiga y guantes aislantes, sin tocarla directamente",
        "Tirar de ella con las manos lo antes posible", "Echarle agua para enfriarla", "Esperar a que se suelte sola"],
      correcta: 0,
      explicacion: "Si la tocas, pasas a formar parte del circuito. Corta la corriente (preparando su caída si está en alto) o sepárala con material aislante." },
    { id: "mei4-53", tipo: "test", seccion: 9,
      enunciado: "¿Cuál de estos factores NO influye en la gravedad de una electrocución?",
      opciones: ["El color del aislante del cable", "La intensidad que atraviesa el cuerpo", "El tiempo de contacto", "El recorrido de la corriente por el cuerpo"],
      correcta: 0,
      explicacion: "Influyen la intensidad, la resistencia del cuerpo, el tiempo y el recorrido (no es lo mismo que atraviese el corazón)." },

    // ---------- 10. Producción ----------
    { id: "mei4-54", tipo: "test", seccion: 10,
      enunciado: "¿En qué principio se basan las máquinas que convierten energía mecánica en eléctrica?",
      opciones: ["La inducción electromagnética", "El efecto Joule", "El efecto fotoeléctrico", "La electrólisis"],
      correcta: 0,
      explicacion: "Un imán que se mueve cerca de un conductor desplaza sus electrones: se produce una corriente inducida." },
    { id: "mei4-55", tipo: "test", seccion: 10,
      enunciado: "En un alternador, ¿dónde se produce la corriente inducida?",
      opciones: ["En las bobinas del estator, mientras el rotor con imanes gira dentro", "En los imanes del rotor",
        "En el eje de la turbina", "En el transformador de salida"],
      correcta: 0,
      explicacion: "La turbina hace girar el rotor (imanes) dentro del estator (bobinas); el campo magnético variable induce la corriente en las bobinas." },
    { id: "mei4-56", tipo: "test", seccion: 10,
      enunciado: "¿Cuál de estas fuentes de energía eléctrica NO es renovable?",
      opciones: ["Térmica nuclear", "Eólica", "Hidroeléctrica", "Fotovoltaica"],
      correcta: 0,
      explicacion: "La nuclear y la térmica convencional usan combustibles que se agotan; la eólica, la hidráulica y la solar son renovables." },

    // ---------- Numéricas ----------
    { id: "mei4-n1", tipo: "numerica", seccion: 2,
      variables: { U: [5, 230, 5], R: [10, 1000, 10] },
      enunciado: "Se aplican {U} V a una resistencia de {R} Ω. ¿Qué intensidad circula?",
      resolver: v => v.U / v.R,
      unidad: "A", tolerancia: 0.02,
      explicacion: v => `Ley de Ohm: I = U/R = ${v.U}/${v.R} = <b>${fmt(v.U / v.R)} A</b>.` },
    { id: "mei4-n2", tipo: "numerica", seccion: 2,
      variables: { U: [5, 24, 1], ImA: [10, 500, 10] },
      enunciado: "Un receptor conectado a {U} V consume {ImA} mA. ¿Cuál es su resistencia?",
      resolver: v => v.U / (v.ImA / 1000),
      unidad: "Ω", tolerancia: 0.02,
      explicacion: v => `I = ${v.ImA} mA = ${fmt(v.ImA / 1000)} A. R = U/I = ${v.U}/${fmt(v.ImA / 1000)} = <b>${fmt(v.U / (v.ImA / 1000))} Ω</b>.` },
    { id: "mei4-n3", tipo: "numerica", seccion: 2,
      variables: { I: [0.1, 5, 0.1], R: [2, 200, 2] },
      enunciado: "Por una resistencia de {R} Ω circulan {I} A. ¿Qué tensión hay entre sus extremos?",
      resolver: v => v.I * v.R,
      unidad: "V", tolerancia: 0.02,
      explicacion: v => `U = I·R = ${fmt(v.I)}·${v.R} = <b>${fmt(v.I * v.R)} V</b>.` },
    { id: "mei4-n4", tipo: "numerica", seccion: 2,
      variables: { L: [10, 500, 10], S: [1.5, 10, 0.5] },
      enunciado: "¿Qué resistencia tiene un cable de cobre (ρ = 0,0172 Ω·mm²/m) de {L} m de longitud y {S} mm² de sección?",
      resolver: v => 0.0172 * v.L / v.S,
      unidad: "Ω", tolerancia: 0.02,
      explicacion: v => `R = ρ·L/S = 0,0172·${v.L}/${fmt(v.S)} = <b>${fmt(0.0172 * v.L / v.S)} Ω</b>.` },
    { id: "mei4-n5", tipo: "numerica", seccion: 2,
      variables: { L: [50, 2000, 50], d: [1, 5, 0.5] },
      enunciado: "Un hilo de aluminio (ρ = 0,028 Ω·mm²/m) mide {L} m y tiene {d} mm de diámetro. Calcula su resistencia.",
      resolver: v => 0.028 * v.L / (Math.PI * v.d * v.d / 4),
      unidad: "Ω", tolerancia: 0.02,
      explicacion: v => { const S = Math.PI * v.d * v.d / 4;
        return `S = π·d²/4 = π·${fmt(v.d)}²/4 = ${fmt(S)} mm².<br>R = ρ·L/S = 0,028·${v.L}/${fmt(S)} = <b>${fmt(0.028 * v.L / S)} Ω</b>.`; } },
    { id: "mei4-n6", tipo: "numerica", seccion: 3,
      variables: { U: [12, 230, 1], I: [0.5, 16, 0.5] },
      enunciado: "Un aparato conectado a {U} V consume {I} A. ¿Qué potencia tiene?",
      resolver: v => v.U * v.I,
      unidad: "W", tolerancia: 0.02,
      explicacion: v => `P = U·I = ${v.U}·${fmt(v.I)} = <b>${fmt(v.U * v.I)} W</b>.` },
    { id: "mei4-n7", tipo: "numerica", seccion: 3,
      variables: { U: [110, 230, 10], R: [20, 200, 5] },
      enunciado: "Una resistencia calefactora de {R} Ω se conecta a {U} V. ¿Qué potencia disipa?",
      resolver: v => v.U * v.U / v.R,
      unidad: "W", tolerancia: 0.02,
      explicacion: v => `P = U²/R = ${v.U}²/${v.R} = <b>${fmt(v.U * v.U / v.R)} W</b>.` },
    { id: "mei4-n8", tipo: "numerica", seccion: 3,
      variables: { P: [100, 3500, 50] },
      enunciado: "Un electrodoméstico de {P} W se enchufa a 230 V. ¿Qué intensidad consume?",
      resolver: v => v.P / 230,
      unidad: "A", tolerancia: 0.02,
      explicacion: v => `I = P/U = ${v.P}/230 = <b>${fmt(v.P / 230)} A</b>.` },
    { id: "mei4-n9", tipo: "numerica", seccion: 3,
      variables: { P: [500, 3000, 100], h: [1, 8, 0.5], precio: [0.1, 0.3, 0.01] },
      enunciado: "Una estufa de {P} W funciona {h} h al día. Si el kWh cuesta {precio} €, ¿cuánto cuesta un día de uso?",
      resolver: v => v.P / 1000 * v.h * v.precio,
      unidad: "€", tolerancia: 0.02, toleranciaAbs: 0.005,
      explicacion: v => { const E = v.P / 1000 * v.h;
        return `E = P·t = ${fmt(v.P / 1000)} kW·${fmt(v.h)} h = ${fmt(E)} kWh.<br>Coste = ${fmt(E)}·${fmt(v.precio)} = <b>${fmt(E * v.precio)} €</b>.`; } },
    { id: "mei4-n10", tipo: "numerica", seccion: 3,
      variables: { I: [1, 10, 0.5], R: [5, 100, 5], min: [1, 30, 1] },
      enunciado: "Por una resistencia de {R} Ω circulan {I} A durante {min} minutos. ¿Cuánto calor desprende por efecto Joule, en kJ?",
      resolver: v => v.I * v.I * v.R * v.min * 60 / 1000,
      unidad: "kJ", tolerancia: 0.02,
      explicacion: v => `t = ${v.min}·60 = ${v.min * 60} s. E = I²·R·t = ${fmt(v.I)}²·${v.R}·${v.min * 60} = ${fmt(v.I * v.I * v.R * v.min * 60)} J = <b>${fmt(v.I * v.I * v.R * v.min * 60 / 1000)} kJ</b>.` },
    { id: "mei4-n11", tipo: "numerica", seccion: 3,
      variables: { I: [0.5, 5, 0.5], R: [10, 200, 10] },
      enunciado: "¿Qué potencia disipa una resistencia de {R} Ω cuando la atraviesan {I} A?",
      resolver: v => v.I * v.I * v.R,
      unidad: "W", tolerancia: 0.02,
      explicacion: v => `P = I²·R = ${fmt(v.I)}²·${v.R} = <b>${fmt(v.I * v.I * v.R)} W</b>.` },
    { id: "mei4-n12", tipo: "numerica", seccion: 5,
      variables: { R1: [10, 500, 10], R2: [10, 500, 10], R3: [10, 500, 10] },
      enunciado: "Calcula la resistencia equivalente de tres resistencias en serie de {R1} Ω, {R2} Ω y {R3} Ω.",
      resolver: v => v.R1 + v.R2 + v.R3,
      unidad: "Ω", tolerancia: 0.02,
      explicacion: v => `En serie se suman: R_eq = ${v.R1} + ${v.R2} + ${v.R3} = <b>${v.R1 + v.R2 + v.R3} Ω</b>.` },
    { id: "mei4-n13", tipo: "numerica", seccion: 5,
      variables: { R1: [10, 500, 10], R2: [10, 500, 10] },
      enunciado: "¿Cuál es la resistencia equivalente de {R1} Ω y {R2} Ω conectadas en paralelo?",
      resolver: v => v.R1 * v.R2 / (v.R1 + v.R2),
      unidad: "Ω", tolerancia: 0.02,
      explicacion: v => `Dos en paralelo: R_eq = R₁·R₂/(R₁ + R₂) = ${v.R1}·${v.R2}/(${v.R1} + ${v.R2}) = <b>${fmt(v.R1 * v.R2 / (v.R1 + v.R2))} Ω</b>.` },
    { id: "mei4-n14", tipo: "numerica", seccion: 5,
      variables: { R1: [10, 500, 10], R2: [10, 500, 10], R3: [10, 500, 10] },
      enunciado: "Tres resistencias de {R1} Ω, {R2} Ω y {R3} Ω están en paralelo. Calcula la resistencia equivalente.",
      resolver: v => 1 / (1 / v.R1 + 1 / v.R2 + 1 / v.R3),
      unidad: "Ω", tolerancia: 0.02,
      explicacion: v => { const s = 1 / v.R1 + 1 / v.R2 + 1 / v.R3;
        return `1/R_eq = 1/${v.R1} + 1/${v.R2} + 1/${v.R3} = ${fmt(s)} Ω⁻¹ → R_eq = <b>${fmt(1 / s)} Ω</b>.`; } },
    { id: "mei4-n15", tipo: "numerica", seccion: 5,
      variables: { U: [6, 48, 2], R1: [10, 500, 10], R2: [10, 500, 10] },
      enunciado: "Dos resistencias de {R1} Ω y {R2} Ω están en serie con una fuente de {U} V. ¿Qué tensión hay en la de {R2} Ω?",
      resolver: v => v.U * v.R2 / (v.R1 + v.R2),
      unidad: "V", tolerancia: 0.02,
      explicacion: v => { const I = v.U / (v.R1 + v.R2);
        return `I = U/(R₁ + R₂) = ${v.U}/${v.R1 + v.R2} = ${fmt(I)} A.<br>U₂ = I·R₂ = ${fmt(I)}·${v.R2} = <b>${fmt(I * v.R2)} V</b> (divisor de tensión).`; } },
    { id: "mei4-n16", tipo: "numerica", seccion: 5,
      variables: { U: [6, 48, 2], R1: [10, 200, 10], R2: [10, 200, 10] },
      enunciado: "Dos resistencias de {R1} Ω y {R2} Ω están en paralelo conectadas a {U} V. ¿Qué intensidad total da la fuente?",
      resolver: v => v.U / v.R1 + v.U / v.R2,
      unidad: "A", tolerancia: 0.02,
      explicacion: v => `Las dos tienen ${v.U} V: I₁ = ${v.U}/${v.R1} = ${fmt(v.U / v.R1)} A; I₂ = ${v.U}/${v.R2} = ${fmt(v.U / v.R2)} A.<br>Nodo: I = I₁ + I₂ = <b>${fmt(v.U / v.R1 + v.U / v.R2)} A</b>.` },
    { id: "mei4-n17", tipo: "numerica", seccion: 11,
      variables: { U: [10, 48, 2], R1: [10, 200, 5], R2: [20, 300, 10], R3: [20, 300, 10] },
      enunciado: "Una fuente de {U} V alimenta una resistencia de {R1} Ω en serie con un grupo de dos en paralelo de {R2} Ω y {R3} Ω. ¿Qué intensidad da la fuente?",
      resolver: v => v.U / (v.R1 + v.R2 * v.R3 / (v.R2 + v.R3)),
      unidad: "A", tolerancia: 0.02,
      explicacion: v => { const Rp = v.R2 * v.R3 / (v.R2 + v.R3), Rt = v.R1 + Rp;
        return `Paralelo: R₂₃ = ${v.R2}·${v.R3}/(${v.R2} + ${v.R3}) = ${fmt(Rp)} Ω.<br>Total: R_eq = ${v.R1} + ${fmt(Rp)} = ${fmt(Rt)} Ω.<br>I = U/R_eq = ${v.U}/${fmt(Rt)} = <b>${fmt(v.U / Rt)} A</b>.`; } },
    { id: "mei4-n18", tipo: "numerica", seccion: 11,
      variables: { U: [10, 30, 1], R1: [20, 100, 5], La: [50, 300, 25], Lb: [50, 300, 25] },
      enunciado: "Un generador de {U} V alimenta una resistencia de {R1} Ω en serie con dos lámparas en paralelo de {La} Ω y {Lb} Ω. ¿Qué tensión tienen las lámparas?",
      resolver: v => { const Rp = v.La * v.Lb / (v.La + v.Lb); return v.U * Rp / (v.R1 + Rp); },
      unidad: "V", tolerancia: 0.02,
      explicacion: v => { const Rp = v.La * v.Lb / (v.La + v.Lb), I = v.U / (v.R1 + Rp);
        return `Lámparas en paralelo: R_p = ${v.La}·${v.Lb}/(${v.La} + ${v.Lb}) = ${fmt(Rp)} Ω.<br>I = ${v.U}/(${v.R1} + ${fmt(Rp)}) = ${fmt(I)} A.<br>U_lámparas = I·R_p = <b>${fmt(I * Rp)} V</b> (la misma en las dos).`; } },
    { id: "mei4-n19", tipo: "numerica", seccion: 11,
      variables: { U: [10, 30, 1], R1: [20, 100, 5], La: [50, 300, 25], Lb: [50, 300, 25] },
      enunciado: "Un generador de {U} V alimenta una resistencia de {R1} Ω en serie con dos lámparas en paralelo: A de {La} Ω y B de {Lb} Ω. ¿Qué intensidad pasa por la lámpara A, en mA?",
      resolver: v => { const Rp = v.La * v.Lb / (v.La + v.Lb); return v.U * Rp / (v.R1 + Rp) / v.La * 1000; },
      unidad: "mA", tolerancia: 0.02,
      explicacion: v => { const Rp = v.La * v.Lb / (v.La + v.Lb), Up = v.U * Rp / (v.R1 + Rp);
        return `R_p = ${fmt(Rp)} Ω; I_total = ${v.U}/(${v.R1} + ${fmt(Rp)}) = ${fmt(v.U / (v.R1 + Rp))} A; U_p = ${fmt(Up)} V.<br>I_A = U_p/R_A = ${fmt(Up)}/${v.La} = ${fmt(Up / v.La)} A = <b>${fmt(Up / v.La * 1000)} mA</b>.`; } },
    { id: "mei4-n20", tipo: "numerica", seccion: 4,
      variables: { I1: [0.5, 5, 0.5], I2: [0.5, 5, 0.5], I3: [0.1, 1, 0.1] },
      enunciado: "A un nodo llegan dos corrientes de {I1} A y {I2} A, y salen dos: una de {I3} A y otra desconocida. ¿Cuánto vale la desconocida?",
      resolver: v => v.I1 + v.I2 - v.I3,
      unidad: "A", tolerancia: 0.02,
      explicacion: v => `1.ª ley de Kirchhoff: ΣI_entran = ΣI_salen → ${fmt(v.I1)} + ${fmt(v.I2)} = ${fmt(v.I3)} + I₄ → I₄ = <b>${fmt(v.I1 + v.I2 - v.I3)} A</b>.` },
    { id: "mei4-n21", tipo: "numerica", seccion: 4,
      variables: { U: [12, 48, 1], V1: [1, 5, 0.5], V2: [1, 5, 0.5] },
      enunciado: "Una malla tiene un generador de {U} V y tres receptores en serie. En los dos primeros caen {V1} V y {V2} V. ¿Qué tensión cae en el tercero?",
      resolver: v => v.U - v.V1 - v.V2,
      unidad: "V", tolerancia: 0.02,
      explicacion: v => `2.ª ley de Kirchhoff: U = V₁ + V₂ + V₃ → V₃ = ${v.U} − ${fmt(v.V1)} − ${fmt(v.V2)} = <b>${fmt(v.U - v.V1 - v.V2)} V</b>.` },
    { id: "mei4-n22", tipo: "numerica", seccion: 6,
      variables: { f: [40, 400, 10] },
      enunciado: "Una corriente alterna tiene una frecuencia de {f} Hz. ¿Cuánto dura un ciclo (periodo), en milisegundos?",
      resolver: v => 1000 / v.f,
      unidad: "ms", tolerancia: 0.02,
      explicacion: v => `T = 1/f = 1/${v.f} = ${fmt(1 / v.f)} s = <b>${fmt(1000 / v.f)} ms</b>.` },
    { id: "mei4-n23", tipo: "numerica", seccion: 6,
      variables: { T: [2, 25, 0.5] },
      enunciado: "En un osciloscopio, un ciclo completo de una tensión alterna dura {T} ms. ¿Cuál es su frecuencia?",
      resolver: v => 1000 / v.T,
      unidad: "Hz", tolerancia: 0.02,
      explicacion: v => `T = ${fmt(v.T)} ms = ${fmt(v.T / 1000)} s. f = 1/T = <b>${fmt(1000 / v.T)} Hz</b>.` },
    { id: "mei4-n24", tipo: "numerica", seccion: 6,
      variables: { V0: [100, 400, 10], t: [1, 9, 1] },
      enunciado: "Una tensión alterna de 50 Hz tiene un valor de pico de {V0} V: V(t) = {V0}·sin(2π·50·t). ¿Cuánto vale a los {t} ms de empezar el ciclo?",
      resolver: v => v.V0 * Math.sin(2 * Math.PI * 50 * v.t / 1000),
      unidad: "V", tolerancia: 0.02, toleranciaAbs: 1,
      explicacion: v => { const ang = 2 * Math.PI * 50 * v.t / 1000;
        return `t = ${v.t} ms = ${fmt(v.t / 1000)} s. Ángulo = 2π·50·${fmt(v.t / 1000)} = ${fmt(ang)} rad (${fmt(ang * 180 / Math.PI)}°).<br>V = ${v.V0}·sin(${fmt(ang)}) = <b>${fmt(v.V0 * Math.sin(ang))} V</b>.`; } },
    { id: "mei4-n25", tipo: "numerica", seccion: 6,
      variables: { Vef: [110, 400, 10] },
      enunciado: "(Ampliación) Una tensión alterna tiene {Vef} V eficaces. ¿Cuál es su valor de pico?",
      resolver: v => v.Vef * Math.SQRT2,
      unidad: "V", tolerancia: 0.02,
      explicacion: v => `V₀ = V_ef·√2 = ${v.Vef}·1,414 = <b>${fmt(v.Vef * Math.SQRT2)} V</b>.` },
    { id: "mei4-n26", tipo: "numerica", seccion: 9,
      variables: { U: [50, 400, 10], Rc: [500, 3000, 100] },
      enunciado: "Una persona con una resistencia corporal de {Rc} Ω toca un conductor a {U} V estando en contacto con tierra. ¿Qué intensidad atraviesa su cuerpo, en mA?",
      resolver: v => v.U / v.Rc * 1000,
      unidad: "mA", tolerancia: 0.02,
      explicacion: v => `I = U/R = ${v.U}/${v.Rc} = ${fmt(v.U / v.Rc)} A = <b>${fmt(v.U / v.Rc * 1000)} mA</b>. Unas pocas decenas de mA ya pueden ser mortales: de ahí el diferencial.` },
    { id: "mei4-n27", tipo: "numerica", seccion: 8,
      variables: { I: [6, 32, 2] },
      enunciado: "Un circuito a 230 V está protegido con un fusible de {I} A. ¿Qué potencia máxima se puede conectar sin que se funda?",
      resolver: v => 230 * v.I,
      unidad: "W", tolerancia: 0.02,
      explicacion: v => `P_máx = U·I = 230·${v.I} = <b>${fmt(230 * v.I)} W</b>.` },
    { id: "mei4-n28", tipo: "numerica", seccion: 8,
      variables: { P: [40, 200, 20], I: [6, 20, 2] },
      enunciado: "¿Cuántas lámparas de {P} W, conectadas en paralelo a 230 V, se pueden encender a la vez con un fusible de {I} A sin que se funda?",
      resolver: v => Math.floor(230 * v.I / v.P + 1e-9),
      unidad: "lámparas", tolerancia: 0, toleranciaAbs: 0.01,
      explicacion: v => `P_máx = 230·${v.I} = ${230 * v.I} W. Lámparas: ${230 * v.I}/${v.P} = ${fmt(230 * v.I / v.P)} → como mucho <b>${Math.floor(230 * v.I / v.P + 1e-9)}</b> (se redondea hacia abajo).` },
    { id: "mei4-n29", tipo: "numerica", seccion: 2,
      variables: { I: [5, 30, 1], L: [10, 100, 5], S: [1.5, 6, 0.5] },
      enunciado: "Un motor consume {I} A y está a {L} m del cuadro, unido con dos conductores de cobre (ida y vuelta, ρ = 0,0172 Ω·mm²/m) de {S} mm². ¿Qué caída de tensión hay en el cable?",
      resolver: v => v.I * 0.0172 * 2 * v.L / v.S,
      unidad: "V", tolerancia: 0.02,
      explicacion: v => { const R = 0.0172 * 2 * v.L / v.S;
        return `Longitud de cable: 2·${v.L} = ${2 * v.L} m. R = 0,0172·${2 * v.L}/${fmt(v.S)} = ${fmt(R)} Ω.<br>ΔU = I·R = ${v.I}·${fmt(R)} = <b>${fmt(v.I * R)} V</b>.`; } },
    { id: "mei4-n30", tipo: "numerica", seccion: 5,
      variables: { U: [6, 48, 2], R1: [10, 200, 10], R2: [10, 200, 10], R3: [10, 200, 10] },
      enunciado: "Tres resistencias de {R1} Ω, {R2} Ω y {R3} Ω están en serie con una fuente de {U} V. ¿Qué potencia total entrega la fuente?",
      resolver: v => v.U * v.U / (v.R1 + v.R2 + v.R3),
      unidad: "W", tolerancia: 0.02,
      explicacion: v => { const R = v.R1 + v.R2 + v.R3, I = v.U / R;
        return `R_eq = ${R} Ω; I = ${v.U}/${R} = ${fmt(I)} A.<br>P = U·I = ${v.U}·${fmt(I)} = <b>${fmt(v.U * I)} W</b>.`; } }
  ]
});
