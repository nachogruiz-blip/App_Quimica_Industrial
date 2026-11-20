// Minijuegos (sección 🎮 Juegos): Contrarreloj, Supervivencia, Reto rápido, Conversión de unidades, Parejas y Ordena
// los pasos. Son práctica aparte: NO cuentan en el progreso ni en «solo falladas» (nunca llaman a anotar()).
// Los récords se guardan aparte, por usuario, en localStorage «qi-juegos-v1:<usuario>».
//
// Rutas: #/juegos   #/juegos/<juego>   #/juegos/<juego>/<módulo>
// Contenido: preguntas test/vf de las unidades, `parejas` y `pasos` de cada datos/<modulo>_udN.js y los generadores de
// abajo (Reto rápido y Conversiones), que crean casos con datos nuevos cada vez.
// Se carga ANTES de js/app.js y usa sus funciones ($app, barajar, migas, ico…) solo dentro de funciones.
"use strict";

let partida = null;   // juego en curso: los temporizadores comprueban que sigue siendo el mismo antes de actuar
let relojJuego = null;

/** Para el juego en curso (lo llama el router al cambiar de página). */
function pararJuego() {
  if (relojJuego) clearInterval(relojJuego);
  if (partida && partida.espera) clearTimeout(partida.espera);
  relojJuego = null; partida = null;
}

// ---------- Récords (separados del progreso de preguntas) ----------
const claveRecords = () => `qi-juegos-v1:${(usuarioActual() || { id: INVITADO }).id}`;
/** Récords guardados: solo números (se muestran en la página, así que nada de texto de localStorage). */
function leerRecords() {
  const r = almacen.leer(claveRecords(), {});
  return Object.fromEntries(Object.entries(r && typeof r === "object" ? r : {}).filter(([, v]) => Number.isFinite(v)));
}
/** Guarda el récord si mejora. Devuelve { mejor, antes }. */
function anotarRecord(clave, valor, menorEsMejor = false) {
  const r = leerRecords(), antes = r[clave];
  const mejor = !Number.isFinite(antes) || (menorEsMejor ? valor < antes : valor > antes);
  if (mejor) { r[clave] = valor; almacen.escribir(claveRecords(), r); }
  return { mejor, antes };
}

// ---------- Catálogo ----------
const JUEGOS = [
  { id: "contrarreloj", icono: "⏱️", nombre: "Contrarreloj", unidades: true,
    desc: "60 segundos para acertar todas las preguntas que puedas. Cada fallo resta 5 segundos." },
  { id: "supervivencia", icono: "❤️", nombre: "Supervivencia", unidades: true,
    desc: "Preguntas sin límite de tiempo hasta que pierdas tus 3 vidas." },
  { id: "reto", icono: "🎯", nombre: "Reto rápido",
    desc: "10 casos con datos nuevos cada vez y 20 segundos para cada uno: ¿laminar o turbulento?, circuitos, valoraciones…" },
  { id: "conversiones", icono: "🔁", nombre: "Conversión de unidades",
    desc: "60 segundos para pasar de unas unidades a otras (bar, cP, kWh, mL…). Cada fallo resta 5 segundos." },
  { id: "parejas", icono: "🧩", nombre: "Parejas", unidades: true,
    desc: "Da la vuelta a las cartas y une cada fórmula o concepto con su pareja, con los menos intentos posibles." },
  { id: "pasos", icono: "🪜", nombre: "Ordena los pasos",
    desc: "Pon en orden los pasos para resolver un tipo de problema o hacer un procedimiento." }
];
const juegoPorId = id => JUEGOS.find(j => j.id === id);
const N_PAREJAS = 6, MIN_PREGUNTAS = 5;

/** Preguntas test y V/F de una lista de unidades (los juegos rápidos no usan numéricas). */
const rapidasDe = uds => uds.flatMap(ud => ud.preguntas.filter(q => q.tipo === "test" || q.tipo === "vf").map(q => ({ q, ud })));
/** ¿Tiene contenido para este juego una lista de unidades? */
function hayContenido(juego, uds) {
  if (juego === "contrarreloj" || juego === "supervivencia") return rapidasDe(uds).length >= MIN_PREGUNTAS;
  if (juego === "parejas") return uds.flatMap(u => u.parejas || []).length >= N_PAREJAS;
  if (juego === "pasos") return uds.some(u => (u.pasos || []).length);
  return false;
}
function disponible(juego, modId) {
  if (juego === "reto") return !!RETOS[modId];
  if (juego === "conversiones") return !!CONVERSIONES[modId];
  return hayContenido(juego, udsDeModulo(modId));
}

// ---------- Utilidades de los generadores ----------
const elegir = a => a[Math.floor(Math.random() * a.length)];
const azar = (min, max, paso) => +(min + paso * Math.floor(Math.random() * (Math.round((max - min) / paso) + 1))).toFixed(6);
const SUP = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
/** Número con 4 cifras (como fmt); los muy grandes o muy pequeños en notación científica (3,6·10⁶). */
function fmtC(x) {
  if (x !== 0 && isFinite(x) && (Math.abs(x) >= 1e6 || Math.abs(x) < 1e-3)) {
    let e = Math.floor(Math.log10(Math.abs(x))), m = +(x / 10 ** e).toPrecision(4);
    if (Math.abs(m) >= 10) { m /= 10; e++; }
    return `${fmt(m)}·10${String(e).replace(/./g, c => SUP[c])}`;
  }
  return fmt(x);
}
/**
 * Pregunta de opción múltiple con números: la correcta y 3 distractores distintos (comparados ya formateados).
 * Si los candidatos no bastan, se completa con múltiplos de 10.
 */
function opcionesNumericas(correcto, candidatos, unidad) {
  const txt = x => `${fmtC(x)}${unidad ? " " + unidad : ""}`, vistos = new Set([txt(correcto)]), opciones = [txt(correcto)];
  for (const x of [...candidatos, correcto * 10, correcto / 10, correcto * 100, correcto / 100]) {
    if (opciones.length === 4) break;
    if (!isFinite(x) || x <= 0 || vistos.has(txt(x))) continue;
    vistos.add(txt(x)); opciones.push(txt(x));
  }
  return { opciones, correcta: 0 };
}
const pregunta = (enunciado, { opciones, correcta }, explicacion) => ({ q: { tipo: "test", enunciado, opciones, correcta, explicacion } });

// ---------- Reto rápido: generadores por asignatura ----------
// TSF. Viscosidades en cP (como en los problemas) y densidades en kg/m³, valores habituales a temperatura ambiente.
const FLUIDOS = [["agua", 1000, 1], ["aceite ligero", 870, 30], ["aceite pesado", 900, 300], ["glicerina", 1260, 1490],
  ["aire", 1.2, 0.018], ["etanol", 790, 1.2]];
function retoRegimen() {
  for (;;) {
    const [nombre, rho, cP] = elegir(FLUIDOS), mu = cP / 1000, Dcm = elegir([1, 2, 2.5, 4, 5, 8, 10, 15, 20, 25, 30]), D = Dcm / 100;
    const tipo = Math.floor(Math.random() * 3);
    const objetivo = tipo === 0 ? 300 + Math.random() * 1300 : tipo === 1 ? 2300 + Math.random() * 1400 : 10 ** (3.8 + Math.random() * 1.5);
    const v = +(objetivo * mu / (rho * D)).toPrecision(2);
    if (v < 0.02 || v > 15) continue;
    const Re = reynolds(rho, v, D, mu);
    if (Math.abs(Re - 2000) < 150 || Math.abs(Re - 4000) < 250) continue; // nada en el filo
    const reg = regimen(Re);
    return pregunta(`Por una tubería de <b>${fmt(Dcm)} cm</b> de diámetro circula <b>${nombre}</b> (ρ = ${fmt(rho)} kg/m³,
      μ = ${fmt(cP)} cP) a <b>${fmt(v)} m/s</b>. ¿En qué régimen?`,
    { opciones: ["Laminar", "De transición", "Turbulento"], correcta: ["laminar", "de transición", "turbulento"].indexOf(reg) },
    `D = ${fmt(Dcm)} cm = ${fmt(D)} m; μ = ${fmt(cP)} cP = ${fmtC(mu)} Pa·s.<br>Re = ρ·v·D/μ = ${fmt(rho)} · ${fmt(v)} · ${fmt(D)} / ${fmtC(mu)}
      = <b>${fmt(Re)}</b> → ${reg} (laminar si Re &lt; 2000, turbulento si Re &gt; 4000).`);
  }
}
function retoContinuidad() {
  const Ds = [2, 3, 4, 5, 6, 8, 10, 12, 15, 20], D1 = elegir(Ds), D2 = elegir(Ds.filter(d => d !== D1)), v1 = azar(0.5, 3, 0.5);
  const v2 = v1 * (D1 / D2) ** 2;
  return pregunta(`Una tubería pasa de <b>${D1} cm</b> a <b>${D2} cm</b> de diámetro. Si el agua va a <b>${fmt(v1)} m/s</b> en el tramo
    de ${D1} cm, ¿a qué velocidad va en el de ${D2} cm?`,
  opcionesNumericas(v2, [v1 * D1 / D2, v1 * (D2 / D1) ** 2, v1 * D2 / D1], "m/s"),
  `Continuidad: A₁·v₁ = A₂·v₂ → v₂ = v₁·(D₁/D₂)² = ${fmt(v1)} · (${D1}/${D2})² = <b>${fmt(v2)} m/s</b>.
    El área va con el <b>cuadrado</b> del diámetro: si el tubo se estrecha, el fluido acelera.`);
}
function retoHidrostatica() {
  const [nombre, rho] = elegir([["agua", 1000], ["aceite", 880], ["glicerina", 1260], ["agua de mar", 1030]]), h = azar(0.5, 12, 0.5);
  const P = rho * G * h;
  return pregunta(`Un depósito abierto tiene <b>${fmt(h)} m</b> de ${nombre} (ρ = ${fmt(rho)} kg/m³). ¿Qué presión
    <b>manométrica</b> hay en el fondo?`,
  opcionesNumericas(P, [P + 101325, rho * h, P / 2], "Pa"),
  `P = ρ·g·h = ${fmt(rho)} · 9,8 · ${fmt(h)} = <b>${fmtC(P)} Pa</b>. Es la manométrica (lo que marca un manómetro); la absoluta
    sumaría la atmosférica (101 325 Pa).`);
}
// MEI
const RES = [2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30, 40, 60];
function retoAsociacion() {
  const R1 = elegir(RES), R2 = elegir(RES.filter(r => r !== R1)), serie = Math.random() < 0.5;
  const s = R1 + R2, p = R1 * R2 / (R1 + R2), Req = serie ? s : p;
  return pregunta(`Dos resistencias de <b>${R1} Ω</b> y <b>${R2} Ω</b> están en <b>${serie ? "serie" : "paralelo"}</b>.
    ¿Cuánto vale la resistencia equivalente?`,
  opcionesNumericas(Req, [serie ? p : s, (R1 + R2) / 2, Math.abs(R1 - R2)], "Ω"),
  serie ? `En serie se suman: R<sub>eq</sub> = R₁ + R₂ = ${R1} + ${R2} = <b>${fmt(s)} Ω</b>.`
    : `En paralelo: R<sub>eq</sub> = R₁·R₂/(R₁ + R₂) = ${R1}·${R2}/(${R1} + ${R2}) = <b>${fmt(p)} Ω</b>, menor que la menor de las dos.`);
}
function retoOhm() {
  const U = elegir([6, 9, 12, 24, 48, 120, 230]), R = elegir(RES), I = U / R;
  if (Math.random() < 0.5) return pregunta(`Una resistencia de <b>${R} Ω</b> está conectada a <b>${U} V</b>. ¿Qué intensidad circula?`,
    opcionesNumericas(I, [U * R, R / U, I * 1000], "A"), `Ley de Ohm: I = U/R = ${U}/${R} = <b>${fmt(I)} A</b>.`);
  return pregunta(`Por una resistencia de <b>${R} Ω</b> circulan <b>${fmt(I)} A</b>. ¿Qué tensión tiene entre sus extremos?`,
    opcionesNumericas(U, [I / R, R / I, U * 10], "V"), `Ley de Ohm: U = I·R = ${fmt(I)} · ${R} = <b>${fmt(U)} V</b>.`);
}
function retoPotencia() {
  const U = elegir([6, 12, 24, 48, 120, 230]), R = elegir(RES), P = U * U / R;
  return pregunta(`Una resistencia de <b>${R} Ω</b> está conectada a <b>${U} V</b>. ¿Qué potencia disipa?`,
    opcionesNumericas(P, [U / R, U * R, U * U * R], "W"),
    `P = U²/R = ${U}²/${R} = <b>${fmtC(P)} W</b> (también P = U·I con I = U/R = ${fmt(U / R)} A).`);
}
// FPM. Masas molares redondeadas como en los ejercicios de clase.
const SOLUTOS = [["NaOH", 40], ["NaCl", 58.5], ["HCl", 36.5], ["H₂SO₄", 98]];
function retoMolaridad() {
  const [s, Pm] = elegir(SOLUTOS), m = azar(1, 20, 0.5), V = elegir([100, 250, 500, 1000]), n = m / Pm, M = n / (V / 1000);
  return pregunta(`Disuelves <b>${fmt(m)} g</b> de ${s} (Pm = ${fmt(Pm)} g/mol) en agua hasta <b>${V} mL</b> de disolución. ¿Molaridad?`,
    opcionesNumericas(M, [n / V, m / (V / 1000), M * Pm / 10], "M"),
    `n = m/Pm = ${fmt(m)}/${fmt(Pm)} = ${fmt(n)} mol; V = ${V} mL = ${fmt(V / 1000)} L.<br>M = n/V = <b>${fmt(M)} M</b>.`);
}
function retoDilucion() {
  const C1 = azar(0.5, 6, 0.5), V1 = elegir([5, 10, 20, 25, 50]), V2 = elegir([100, 250, 500]), C2 = C1 * V1 / V2;
  return pregunta(`Tomas <b>${V1} mL</b> de una disolución <b>${fmt(C1)} M</b> y la diluyes con agua hasta <b>${V2} mL</b>.
    ¿Concentración final?`,
  opcionesNumericas(C2, [C1 * V2 / V1, C1 * V1 / (V1 + V2), C1 * V1], "M"),
  `Al diluir no cambian los moles: C₁·V₁ = C₂·V₂ → C₂ = ${fmt(C1)} · ${V1}/${V2} = <b>${fmt(C2)} M</b>.
    El volumen final ya es ${V2} mL: no se suma el que tomaste.`);
}
function retoEquivalencia() {
  for (;;) {
    const [acido, val] = elegir([["HCl", 1], ["H₂SO₄", 2]]), Va = elegir([10, 20, 25]), Ma = azar(0.05, 0.5, 0.05), Mb = elegir([0.1, 0.2, 0.25, 0.5]);
    const Veq = val * Ma * Va / Mb, caso = Math.floor(Math.random() * 3);
    if (Veq < 4 || Veq > 45 || Math.abs(Veq * 10 - Math.round(Veq * 10)) > 1e-6) continue;
    const Vb = caso === 1 ? Veq : +(Veq * (caso === 0 ? 0.3 + Math.random() * 0.55 : 1.15 + Math.random() * 0.6)).toFixed(1);
    const real = Math.abs(Vb - Veq) < 1e-6 ? 1 : Vb < Veq ? 0 : 2;
    if (real !== 1 && Math.abs(Vb - Veq) < 0.5) continue;
    return pregunta(`Valoras <b>${Va} mL</b> de ${acido} <b>${fmt(Ma)} M</b> con NaOH <b>${fmt(Mb)} M</b> y llevas añadidos
      <b>${fmt(Vb)} mL</b> de NaOH. ¿Dónde estás?`,
    { opciones: ["Antes del punto de equivalencia: sobra ácido (pH < 7)", "Justo en el punto de equivalencia (pH = 7)",
      "Pasado el punto de equivalencia: sobra base (pH > 7)"], correcta: real },
    `N<sub>a</sub> = M·valencia = ${fmt(Ma)} · ${val} = ${fmt(Ma * val)} N. Equivalencia: N<sub>a</sub>·V<sub>a</sub> = N<sub>b</sub>·V<sub>b</sub>
      → V<sub>b</sub> = ${fmt(Ma * val)} · ${Va}/${fmt(Mb)} = <b>${fmt(Veq)} mL</b>.<br>Con ${fmt(Vb)} mL estás
      ${["antes: aún sobra ácido", "justo en el punto de equivalencia", "pasado: sobra base y la fenolftaleína ya está rosa"][real]}.`);
  }
}
const RETOS = {
  tsf: { temas: "Régimen de flujo (Reynolds), continuidad y presión hidrostática",
    generar: () => elegir([retoRegimen, retoRegimen, retoContinuidad, retoHidrostatica])() },
  mei: { temas: "Resistencia equivalente, ley de Ohm y potencia", generar: () => elegir([retoAsociacion, retoOhm, retoPotencia])() },
  fpm: { temas: "Molaridad, diluciones y punto de equivalencia", generar: () => elegir([retoMolaridad, retoDilucion, retoEquivalencia])() }
};

// ---------- Conversión de unidades ----------
// [de, a, factor (valor en «a» = valor en «de» · factor), [mín, máx, paso] del valor, equivalencia que se explica]
const CONVERSIONES = {
  tsf: [
    ["bar", "Pa", 1e5, [0.5, 10, 0.5], "1 bar = 100 000 Pa"],
    ["atm", "Pa", 101325, [1, 5, 0.5], "1 atm = 101 325 Pa"],
    ["atm", "mmHg", 760, [0.5, 3, 0.5], "1 atm = 760 mmHg"],
    ["mmHg", "Pa", 133.3, [10, 800, 10], "1 mmHg ≈ 133,3 Pa"],
    ["mbar", "Pa", 100, [5, 1000, 5], "1 mbar = 100 Pa"],
    ["kp/cm²", "Pa", 98000, [1, 10, 1], "1 kp/cm² = 98 000 Pa"],
    ["m de columna de agua", "Pa", 9800, [1, 20, 1], "1 m de agua: P = ρ·g·h = 1000 · 9,8 · 1 = 9800 Pa"],
    ["cP", "Pa·s", 1e-3, [1, 100, 1], "1 cP = 10⁻³ Pa·s"],
    ["P (poise)", "Pa·s", 0.1, [1, 20, 1], "1 P = 0,1 Pa·s"],
    ["cSt", "m²/s", 1e-6, [1, 100, 1], "1 cSt = 10⁻⁶ m²/s"],
    ["g/cm³", "kg/m³", 1000, [0.7, 13.6, 0.1], "1 g/cm³ = 1000 kg/m³"],
    ["in (pulgadas)", "cm", 2.54, [1, 12, 1], "1 in = 2,54 cm"],
    ["cm", "m", 0.01, [1, 50, 1], "1 cm = 0,01 m"],
    ["mm", "m", 1e-3, [5, 500, 5], "1 mm = 0,001 m"],
    ["L/s", "m³/s", 1e-3, [1, 50, 1], "1 L = 10⁻³ m³"],
    ["L/min", "m³/s", 1 / 60000, [10, 600, 10], "1 L/min = 10⁻³ m³ / 60 s = 1/60 000 m³/s"],
    ["m³/h", "m³/s", 1 / 3600, [1, 100, 1], "1 h = 3600 s"],
    ["km/h", "m/s", 1 / 3.6, [9, 108, 9], "km/h ÷ 3,6 = m/s"]
  ],
  mei: [
    ["mA", "A", 1e-3, [5, 900, 5], "1 mA = 0,001 A"],
    ["µA", "A", 1e-6, [10, 900, 10], "1 µA = 10⁻⁶ A"],
    ["kΩ", "Ω", 1e3, [0.5, 47, 0.5], "1 kΩ = 1000 Ω"],
    ["MΩ", "Ω", 1e6, [1, 10, 0.5], "1 MΩ = 10⁶ Ω"],
    ["kV", "V", 1e3, [1, 400, 1], "1 kV = 1000 V"],
    ["mV", "V", 1e-3, [10, 900, 10], "1 mV = 0,001 V"],
    ["kW", "W", 1e3, [0.5, 50, 0.5], "1 kW = 1000 W"],
    ["kWh", "J", 3.6e6, [1, 20, 1], "1 kWh = 1000 W · 3600 s = 3,6·10⁶ J"],
    ["Wh", "J", 3600, [1, 100, 1], "1 Wh = 1 W · 3600 s = 3600 J"],
    ["h", "s", 3600, [1, 24, 1], "1 h = 3600 s"],
    ["min", "s", 60, [1, 90, 1], "1 min = 60 s"],
    ["mm²", "m²", 1e-6, [1, 50, 0.5], "1 mm² = (10⁻³ m)² = 10⁻⁶ m²"],
    ["Ω·mm²/m", "Ω·m", 1e-6, [0.01, 0.1, 0.001], "1 Ω·mm²/m = 10⁻⁶ Ω·m"]
  ],
  fpm: [
    ["mL", "L", 1e-3, [5, 1000, 5], "1 mL = 0,001 L"],
    ["L", "mL", 1000, [0.1, 5, 0.05], "1 L = 1000 mL"],
    ["mg", "g", 1e-3, [10, 900, 10], "1 mg = 0,001 g"],
    ["kg", "g", 1000, [0.1, 5, 0.1], "1 kg = 1000 g"],
    ["mmol", "mol", 1e-3, [1, 500, 1], "1 mmol = 0,001 mol"],
    ["g/mL", "g/L", 1000, [0.8, 1.9, 0.01], "1 g/mL = 1000 g/L (1 L = 1000 mL)"],
    ["mL", "cm³", 1, [5, 500, 5], "1 mL = 1 cm³: son la misma unidad"],
    ["mg/L", "g/L", 1e-3, [10, 900, 10], "1 mg = 0,001 g"],
    ["µL", "mL", 1e-3, [10, 1000, 10], "1 µL = 0,001 mL"],
    ["g/L", "mg/mL", 1, [1, 100, 1], "1 g/L = 1000 mg / 1000 mL = 1 mg/mL"]
  ]
};
function generarConversion(modId) {
  const [de, a, factor, [min, max, paso], nota] = elegir(CONVERSIONES[modId]), v = azar(min, max, paso), c = v * factor;
  return pregunta(`¿Cuánto son <b>${fmtC(v)} ${de}</b> en <b>${a}</b>?`,
    opcionesNumericas(c, [v / factor, c * 1000, c / 1000], a),
    `${nota}.<br>${fmtC(v)} ${de} = <b>${fmtC(c)} ${a}</b>.`);
}

// ---------- Vistas: elegir juego, asignatura y unidad ----------
function vistaJuegos(juegoId, modId) {
  const j = juegoPorId(juegoId);
  if (!j) {
    $app.innerHTML = `<h1>${ico("🎮")} Juegos</h1><p class="sub">Para practicar jugando. Los fallos de los juegos no cuentan en tu
      progreso ni en «solo las que he fallado»; cada juego guarda tu récord.</p>` +
      JUEGOS.map(x => `<a class="card" href="#/juegos/${x.id}"><b>${ico(x.icono)} ${x.nombre}</b><div class="sub">${x.desc}</div></a>`).join("");
    return;
  }
  const m = moduloPorId(modId);
  if (!m || !disponible(j.id, m.id)) {
    $app.innerHTML = migas([["#/juegos", "← Juegos"]]) + `<h1>${ico(j.icono)} ${j.nombre}</h1><p class="sub">${j.desc}</p>
      <h2 class="paso">Elige la asignatura</h2>` + MODULOS.map(x => disponible(j.id, x.id)
      ? `<a class="card" href="#/juegos/${j.id}/${x.id}"><b>${nombreModulo(x)}</b>${j.id === "reto" ? `<div class="sub">${RETOS[x.id].temas}</div>` : ""}</a>`
      : `<div class="card apagada"><b>${nombreModulo(x)}</b><div class="sub">Próximamente</div></div>`).join("");
    return;
  }
  if (j.id === "pasos") return vistaElegirPasos(j, m);
  const uds = udsDeModulo(m.id).filter(u => hayContenido(j.id, [u]));
  const ambitos = j.unidades ? [[m.id, "Toda la asignatura"], ...uds.map(u => [u.id, `${u.codigo} · ${u.titulo}`])] : [[m.id, ""]];
  $app.innerHTML = migas([["#/juegos", "Juegos"], [`#/juegos/${j.id}`, j.nombre]]) + `<h1>${ico(j.icono)} ${j.nombre}</h1>
    <p class="sub">${nombreModulo(m)}</p><form id="f-juego" class="card config"><p>${j.desc}</p>
    ${ambitos.length > 1 ? `<fieldset><legend>¿Qué temas?</legend>${ambitos.map(([id, t], i) =>
      `<label class="eleccion"><input type="radio" name="ambito" value="${id}" ${i ? "" : "checked"}> <span>${t}</span></label>`).join("")}</fieldset>`
      : `<input type="hidden" name="ambito" value="${m.id}">`}
    <p class="sub" id="j-record" aria-live="polite"></p>
    <button class="btn-prim grande" id="j-empezar">Empezar</button></form>`;
  const form = document.getElementById("f-juego"), ambito = () => new FormData(form).get("ambito");
  const verRecord = () => {
    const r = leerRecords()[`${j.id}:${ambito()}`];
    document.getElementById("j-record").textContent = Number.isFinite(r)
      ? `🏆 Tu récord: ${r} ${j.id === "parejas" ? "intentos" : "aciertos"}` : "Aún no tienes récord aquí.";
  };
  form.addEventListener("change", verRecord); verRecord();
  form.onsubmit = e => { e.preventDefault(); empezarJuego(j, m, ambito()); };
}

function empezarJuego(j, m, ambito) {
  const uds = ambito === m.id ? udsDeModulo(m.id) : [udPorId(ambito)].filter(Boolean);
  const base = { juego: j.id, modulo: m.id, ambito, titulo: `${ico(j.icono)} ${j.nombre}`,
    subtitulo: ambito === m.id ? m.nombre : `${uds[0].codigo} · ${uds[0].titulo}`, volver: `#/juegos/${j.id}/${m.id}` };
  if (j.id === "parejas") return jugarParejas({ ...base, pares: uds.flatMap(u => u.parejas || []) });
  if (j.id === "reto") return jugarRonda({ ...base, siguiente: RETOS[m.id].generar, porPregunta: 20000, max: 10 });
  if (j.id === "conversiones") return jugarRonda({ ...base, siguiente: () => generarConversion(m.id), total: 60000, penal: 5000 });
  const mazo = barajar(rapidasDe(uds));
  const sacar = () => mazo.shift() || null;
  if (j.id === "supervivencia") return jugarRonda({ ...base, siguiente: sacar, vidas: 3 });
  // Contrarreloj: si se acaban las preguntas se vuelve a barajar el mazo.
  return jugarRonda({ ...base, siguiente: () => sacar() || (mazo.push(...barajar(rapidasDe(uds))), sacar()), total: 60000, penal: 5000 });
}

// ---------- Ronda de preguntas de opción múltiple (Contrarreloj, Supervivencia, Reto, Conversiones) ----------
/**
 * cfg.siguiente() da { q, ud? } o null si no quedan. Modos: `total` (ms de reloj para toda la ronda, `penal` ms por
 * fallo), `porPregunta` (ms por pregunta; agotarlo es un fallo), `vidas` y `max` (nº de preguntas).
 * El reloj se para mientras se lee la corrección de un fallo.
 */
function jugarRonda(cfg) {
  pararJuego();
  const est = { cfg, aciertos: 0, fallos: [], n: 0, vidas: cfg.vidas || 0, resto: cfg.total || 0, limite: 0, bloqueada: true, actual: null };
  partida = est; window.__juego = est;
  $app.innerHTML = migas([[cfg.volver, "← Volver"]]) + `<h1 class="h-ronda">${cfg.titulo}</h1><p class="sub">${cfg.subtitulo}</p>
    <p class="estado-ronda"><span id="j-marcador" aria-live="polite"></span><span id="j-extra"></span></p>
    ${cfg.total || cfg.porPregunta ? `<div class="avance tiempo" aria-hidden="true"><div id="j-tiempo"></div></div>` : ""}
    <div id="j-zona"></div>`;
  relojJuego = setInterval(() => tic(est), 100);
  siguienteRonda(est);
}

function marcador(est) {
  const { cfg } = est;
  document.getElementById("j-marcador").textContent = `✅ ${est.aciertos} aciertos` + (cfg.max ? ` · ${Math.min(est.n, cfg.max)}/${cfg.max}` : "");
  const extra = document.getElementById("j-extra");
  if (cfg.vidas) { extra.textContent = "❤️".repeat(est.vidas) + "🤍".repeat(cfg.vidas - est.vidas); extra.setAttribute("aria-label", `${est.vidas} vidas`); }
}
function tic(est) {
  if (partida !== est || est.bloqueada || !(est.cfg.total || est.cfg.porPregunta)) return; // Supervivencia: sin reloj
  const { cfg } = est, quedan = Math.max(0, est.limite - Date.now()), dur = cfg.total || cfg.porPregunta;
  const barra = document.getElementById("j-tiempo");
  if (barra) { barra.style.width = `${(100 * quedan / dur).toFixed(1)}%`; barra.classList.toggle("poco", quedan < dur / 5); }
  const t = document.getElementById("j-extra");
  if (cfg.total && t) t.textContent = `⏱️ ${Math.ceil(quedan / 1000)} s`;
  if (quedan > 0) return;
  if (cfg.total) return terminarRonda(est);
  responderRonda(est, false, null, true); // se acabó el tiempo de esta pregunta
}

function siguienteRonda(est) {
  if (partida !== est) return;
  const { cfg } = est;
  const fin = (cfg.max && est.n >= cfg.max) || (cfg.vidas && est.vidas <= 0) || (cfg.total && est.resto <= 0);
  const item = fin ? null : cfg.siguiente();
  if (!item) return terminarRonda(est);
  est.actual = item; est.n++;
  const { q, ud } = item;
  window.__actual = { q, v: null }; // usado por tests/
  const botones = q.tipo === "vf" ? `<button class="opcion" data-k="true">Verdadero</button><button class="opcion" data-k="false">Falso</button>`
    : barajar(q.opciones.map((_, k) => k)).map(k => `<button class="opcion" data-k="${k}">${q.opciones[k]}</button>`).join("");
  document.getElementById("j-zona").innerHTML = `<div class="card">${ud && cfg.ambito !== ud.id ? `<p class="etiqueta">${ud.codigo} · ${ud.titulo}</p>` : ""}
    <p><b>${q.enunciado}</b></p>${botones}<div id="fb" aria-live="polite"></div></div>`;
  marcador(est);
  est.limite = Date.now() + (cfg.total ? est.resto : cfg.porPregunta || 0);
  est.bloqueada = false; tic(est);
  document.querySelectorAll("#j-zona .opcion").forEach(b => b.onclick = () => {
    const elegido = q.tipo === "vf" ? b.dataset.k === "true" : +b.dataset.k;
    responderRonda(est, elegido === q.correcta, b);
  });
}

const textoCorrecta = q => q.tipo === "vf" ? (q.correcta ? "Verdadero" : "Falso") : q.opciones[q.correcta];
function explicacionJuego(item, abierto) {
  if (item.ud) return bloqueExplicacion(item.ud, item.q, null, abierto);
  return `<details class="explicacion"${abierto ? " open" : ""}><summary>💡 Explicación</summary><p>${item.q.explicacion}</p></details>`;
}

function responderRonda(est, ok, boton, agotado = false) {
  if (partida !== est || est.bloqueada) return;
  const { cfg } = est, { q } = est.actual;
  est.bloqueada = true;
  if (cfg.total) est.resto = Math.max(0, est.limite - Date.now());
  document.querySelectorAll("#j-zona .opcion").forEach(o => {
    o.disabled = true;
    if ((q.tipo === "vf" ? o.dataset.k === "true" : +o.dataset.k) === q.correcta) o.classList.add("ok");
  });
  if (ok) {
    est.aciertos++; marcador(est);
    est.espera = setTimeout(() => siguienteRonda(est), 450);
    return;
  }
  if (boton) boton.classList.add("ko");
  est.fallos.push(est.actual);
  if (cfg.vidas) est.vidas--;
  if (cfg.total) est.resto = Math.max(0, est.resto - (cfg.penal || 0));
  marcador(est);
  const t = document.getElementById("j-extra");
  if (cfg.total && t) t.textContent = `⏱️ ${Math.ceil(est.resto / 1000)} s`;
  const termina = (cfg.vidas && est.vidas <= 0) || (cfg.total && est.resto <= 0) || (cfg.max && est.n >= cfg.max);
  document.getElementById("fb").innerHTML = `<div class="feedback ko"><b>${agotado ? "⌛ Se acabó el tiempo" : "❌ Incorrecto"}</b>
    ${cfg.penal ? ` <span class="sub">(−${cfg.penal / 1000} s)</span>` : ""}<p>Correcta: <b>${textoCorrecta(q)}</b></p>
    ${explicacionJuego(est.actual, false)}<button class="btn-prim" id="sig">${termina ? "Ver resultado" : "Siguiente →"}</button></div>`;
  const sig = document.getElementById("sig"); sig.onclick = () => siguienteRonda(est); sig.focus({ preventScroll: true });
}

function terminarRonda(est) {
  if (partida !== est) return;
  const { cfg } = est;
  est.bloqueada = true; pararJuego(); est.terminada = true;
  const { mejor, antes } = anotarRecord(`${cfg.juego}:${cfg.ambito}`, est.aciertos);
  const motivo = cfg.vidas ? (est.vidas <= 0 ? "Sin vidas" : "¡Has respondido todas!") : cfg.total ? "Tiempo" : "Fin del reto";
  pantallaFinal(cfg, `🏁 ${motivo}: ${est.aciertos} ${est.aciertos === 1 ? "acierto" : "aciertos"}${cfg.max ? ` de ${cfg.max}` : ""}`,
    mejor && est.aciertos > 0 ? `🏆 ¡Nuevo récord!${Number.isFinite(antes) ? ` (antes: ${antes})` : ""}` : `Tu récord: ${Number.isFinite(antes) ? antes : est.aciertos} aciertos`,
    est.fallos.length ? "<h3>Repasa:</h3>" + est.fallos.map(f =>
      `<div class="card"><p><b>${f.q.enunciado}</b></p><p>Correcta: <b>${textoCorrecta(f.q)}</b></p>${explicacionJuego(f, false)}</div>`).join("") : "");
}

function pantallaFinal(cfg, titulo, record, extra) {
  $app.innerHTML = migas([[cfg.volver, "← Volver"]]) + `<h1 class="h-ronda">${cfg.titulo}</h1><p class="sub">${cfg.subtitulo}</p>
    <div class="card resultado" id="j-final"><h2>${titulo}</h2><p>${record}</p>
    <p class="sub">Los juegos no cuentan en tu progreso ni en «solo las que he fallado».</p>
    <div class="pestanas"><button class="btn-prim" id="j-otra">🔄 Jugar otra vez</button><a class="btn" href="${cfg.volver}">Cambiar</a>
    <a class="btn" href="#/juegos">Otros juegos</a></div>${extra}</div>`;
  document.getElementById("j-otra").onclick = cfg.otra || (() => empezarJuego(juegoPorId(cfg.juego), moduloPorId(cfg.modulo), cfg.ambito));
  window.scrollTo(0, 0);
}

// ---------- Parejas (memory) ----------
function jugarParejas(cfg) {
  pararJuego();
  const pares = barajar(cfg.pares).slice(0, N_PAREJAS);
  const cartas = barajar(pares.flatMap(([a, b], i) => [{ t: a, par: i }, { t: b, par: i }]));
  const est = { cfg, cartas, abiertas: [], hechas: 0, intentos: 0, pares };
  partida = est; window.__juego = est;
  $app.innerHTML = migas([[cfg.volver, "← Volver"]]) + `<h1 class="h-ronda">${cfg.titulo}</h1><p class="sub">${cfg.subtitulo}</p>
    <p class="estado-ronda"><span id="j-marcador" aria-live="polite">Intentos: 0</span><span id="j-extra">0/${pares.length} parejas</span></p>
    <div class="tablero" id="tablero">${cartas.map((c, i) => `<button class="carta" data-i="${i}" aria-label="Carta ${i + 1}, boca abajo">
      <span class="dorso" aria-hidden="true">⚗️</span><span class="cara">${c.t}</span></button>`).join("")}</div>`;
  const botones = [...document.querySelectorAll(".carta")];
  const girar = (i, cara) => { const b = botones[i]; b.classList.toggle("vuelta", cara);
    b.setAttribute("aria-label", cara ? b.querySelector(".cara").textContent : `Carta ${i + 1}, boca abajo`); };
  botones.forEach(b => b.onclick = () => {
    const i = +b.dataset.i;
    if (partida !== est || est.abiertas.length === 2 || est.abiertas.includes(i) || b.classList.contains("hecha")) return;
    girar(i, true); est.abiertas.push(i);
    if (est.abiertas.length < 2) return;
    est.intentos++;
    document.getElementById("j-marcador").textContent = `Intentos: ${est.intentos}`;
    const [x, y] = est.abiertas;
    if (cartas[x].par === cartas[y].par) {
      botones[x].classList.add("hecha"); botones[y].classList.add("hecha"); est.abiertas = []; est.hechas++;
      document.getElementById("j-extra").textContent = `${est.hechas}/${pares.length} parejas`;
      if (est.hechas === pares.length) est.espera = setTimeout(() => terminarParejas(est), 500);
    } else {
      botones[x].classList.add("fallo"); botones[y].classList.add("fallo");
      est.espera = setTimeout(() => { if (partida !== est) return;
        [x, y].forEach(k => { botones[k].classList.remove("fallo"); girar(k, false); }); est.abiertas = []; }, 1100);
    }
  });
}
function terminarParejas(est) {
  if (partida !== est) return;
  const { cfg } = est; pararJuego(); est.terminada = true;
  const { mejor, antes } = anotarRecord(`parejas:${cfg.ambito}`, est.intentos, true);
  pantallaFinal(cfg, `🧩 ¡Completado en ${est.intentos} intentos!`,
    mejor ? `🏆 ¡Nuevo récord!${Number.isFinite(antes) ? ` (antes: ${antes})` : ""}` : `Tu récord: ${antes} intentos (lo mínimo posible es ${est.pares.length})`,
    `<h3>Las parejas:</h3><ul class="lista-parejas">${est.pares.map(([a, b]) => `<li><b>${a}</b> ↔ ${b}</li>`).join("")}</ul>`);
}

// ---------- Ordena los pasos ----------
function vistaElegirPasos(j, m) {
  const r = leerRecords();
  const procs = udsDeModulo(m.id).flatMap(u => (u.pasos || []).map(p => ({ p, u })));
  $app.innerHTML = migas([["#/juegos", "Juegos"], [`#/juegos/${j.id}`, j.nombre]]) + `<h1>${ico(j.icono)} ${j.nombre}</h1>
    <p class="sub">${nombreModulo(m)} · Toca los pasos en el orden correcto.</p>` +
    procs.map(({ p, u }) => `<button class="card elegir-pasos" data-proc="${p.id}"><b>${p.titulo}</b>
      <span class="sub">${u.codigo} · ${p.pasos.length} pasos${Number.isFinite(r["pasos:" + p.id]) ? ` · 🏆 récord: ${r["pasos:" + p.id]} fallos` : ""}</span></button>`).join("");
  $app.querySelectorAll("[data-proc]").forEach(b => b.onclick = () => {
    const { p, u } = procs.find(x => x.p.id === b.dataset.proc);
    jugarPasos({ juego: j.id, modulo: m.id, ambito: p.id, titulo: `${ico(j.icono)} ${p.titulo}`, subtitulo: `${u.codigo} · ${u.titulo}`,
      volver: `#/juegos/${j.id}/${m.id}`, proc: p });
  });
}
function jugarPasos(cfg) {
  pararJuego();
  const est = { cfg, siguiente: 0, errores: 0, total: cfg.proc.pasos.length };
  partida = est; window.__juego = est;
  cfg.otra = () => jugarPasos(cfg);
  $app.innerHTML = migas([[cfg.volver, "← Volver"]]) + `<h1 class="h-ronda">${cfg.titulo}</h1><p class="sub">${cfg.subtitulo}</p>
    <p class="estado-ronda"><span id="j-marcador" aria-live="polite">Fallos: 0</span><span id="j-extra">0/${est.total}</span></p>
    <ol class="card pasos-hechos" id="j-hechos"><li class="sub pendiente">¿Cuál es el primer paso?</li></ol>
    <div id="j-pasos">${barajar(cfg.proc.pasos.map((_, k) => k)).map(k => `<button class="opcion" data-k="${k}">${cfg.proc.pasos[k]}</button>`).join("")}</div>`;
  const hechos = document.getElementById("j-hechos");
  document.querySelectorAll("#j-pasos .opcion").forEach(b => b.onclick = () => {
    if (partida !== est) return;
    if (+b.dataset.k !== est.siguiente) {
      est.errores++; document.getElementById("j-marcador").textContent = `Fallos: ${est.errores}`;
      b.classList.add("ko"); setTimeout(() => b.classList.remove("ko"), 600);
      return;
    }
    if (!est.siguiente) hechos.textContent = "";
    const li = document.createElement("li"); li.innerHTML = cfg.proc.pasos[est.siguiente]; hechos.append(li);
    b.remove(); est.siguiente++;
    document.getElementById("j-extra").textContent = `${est.siguiente}/${est.total}`;
    if (est.siguiente === est.total) est.espera = setTimeout(() => terminarPasos(est), 400);
  });
}
function terminarPasos(est) {
  if (partida !== est) return;
  const { cfg } = est; pararJuego(); est.terminada = true;
  const { mejor, antes } = anotarRecord(`pasos:${cfg.proc.id}`, est.errores, true);
  pantallaFinal(cfg, est.errores ? `🪜 Ordenado con ${est.errores} ${est.errores === 1 ? "fallo" : "fallos"}` : "🪜 ¡Perfecto, sin fallos!",
    mejor ? `🏆 ¡Nuevo récord!${Number.isFinite(antes) ? ` (antes: ${antes} fallos)` : ""}` : `Tu récord: ${antes} fallos`,
    `<h3>El orden correcto:</h3><ol>${cfg.proc.pasos.map(p => `<li>${p}</li>`).join("")}</ol>`);
}
