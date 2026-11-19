// Motor de la app: rutas por hash, login local, las 4 secciones (Estudio, Examen, Test, Ajustes), rondas de preguntas,
// novedades y progreso (cargar/guardar en js/usuarios.js).
//
// Rutas:  #/estudio[/<módulo>]   #/ud/<ud>/guia[?s=N]   #/examen[/<módulo>]   #/test[/<módulo>]   #/ajustes   #/novedades
// Rutas directas de una unidad (enlaces de la guía y tests): #/ud/<ud>/practicar | examen | fallos
"use strict";
const $app = document.getElementById("app");
let sesionActiva = null; // ronda de preguntas en curso (para avisar antes de abandonarla)
let reloj = null;        // cronómetro del examen

function anotar(qid, acierto) {
  const p = cargar(); const r = p[qid] || { a: 0, f: 0 };
  acierto ? r.a++ : r.f++; r.ultimo = acierto; p[qid] = r; guardar(p);
}
function barajar(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function udPorId(id) { return UNIDADES.find(u => u.id === id); }
const moduloPorId = id => MODULOS.find(m => m.id === id);
const udsDeModulo = id => UNIDADES.filter(u => u.modulo === id);
const preguntasDe = ud => ud.preguntas.map(q => ({ q, ud }));
/** Preguntas dominadas (la última vez se acertaron) de una lista de preguntas. */
function dominadas(preguntas) { const p = cargar(); return preguntas.filter(q => p[q.id] && p[q.id].ultimo).length; }
function barraProgreso(preguntas) {
  const n = preguntas.length, d = dominadas(preguntas), pct = n ? Math.round(100 * d / n) : 0;
  return `<div class="barra-prog" role="progressbar" aria-label="Preguntas dominadas" aria-valuemin="0" aria-valuemax="100"
    aria-valuenow="${pct}"><div style="width:${pct}%"></div></div><div class="sub">Dominas ${d} de ${n} preguntas (${pct} %)</div>`;
}
const nombreModulo = m => (m.icono ? m.icono + " " : "") + m.nombre;
const migas = enlaces => `<p class="sub migas">${enlaces.map(([h, t]) => `<a href="${h}">${t}</a>`).join(" › ")}</p>`;
const NOMBRES = { estudio: "Estudio", examen: "Examen", test: "Test" };
const TITULOS = { estudio: "🔬 Estudio", examen: "⏱️ Examen", test: "🧪 Test" };

// ---------- Elegir asignatura (común a Estudio, Examen y Test) ----------
function tarjetaModulo(m, destino) {
  const uds = udsDeModulo(m.id), cod = m.codigo ? ` <span class="sub">(${m.codigo})</span>` : "";
  if (!uds.length) return `<div class="card apagada"><b>${nombreModulo(m)}</b>${cod}<div class="sub">Próximamente</div></div>`;
  return `<a class="card" href="#/${destino}/${m.id}"><b>${nombreModulo(m)}</b>${cod}
    <div class="sub">${uds.length} ${uds.length === 1 ? "unidad" : "unidades"}: ${uds.map(u => u.codigo).join(", ")}</div>
    ${barraProgreso(uds.flatMap(u => u.preguntas))}</a>`;
}
function elegirAsignatura(destino, intro) {
  $app.innerHTML = `<h1>${TITULOS[destino]}</h1><p class="sub">${intro}</p><h2 class="paso">Elige la asignatura</h2>` +
    MODULOS.map(m => tarjetaModulo(m, destino)).join("");
}

// ---------- Estudio ----------
function vistaEstudio(modId) {
  const m = moduloPorId(modId);
  if (!m || !udsDeModulo(m.id).length) return elegirAsignatura("estudio", "Guía de estudio de cada unidad: teoría, fórmulas e ideas clave.");
  $app.innerHTML = migas([["#/estudio", "← Estudio"]]) + `<h1>${nombreModulo(m)}</h1><h2 class="paso">Elige la unidad</h2>` +
    udsDeModulo(m.id).map(u => `<a class="card" href="#/ud/${u.id}/guia"><b>${u.codigo} · ${u.titulo}</b>
      <div class="sub">${u.descripcion || ""}</div><div class="sub">${u.guia.length} apartados · ${u.preguntas.length} preguntas</div>
      ${barraProgreso(u.preguntas)}</a>`).join("");
}

function vistaGuia(ud, seccion) {
  const m = moduloPorId(ud.modulo);
  const abierta = seccion >= 1 && seccion <= ud.guia.length ? seccion - 1 : 0;
  $app.innerHTML = migas([["#/estudio", "Estudio"], [`#/estudio/${ud.modulo}`, m ? m.nombre : ud.modulo]]) +
    `<h1>${ud.codigo} · ${ud.titulo}</h1>
    <details class="card indice"><summary>📑 Índice de apartados</summary><ol>${ud.guia.map((s, i) =>
      `<li><button type="button" class="enlace" data-ir="${i + 1}">${s.titulo.replace(/^\d+\.\s*/, "")}</button></li>`).join("")}</ol></details>` +
    ud.guia.map((s, i) =>
      `<details class="card" id="sec-${i + 1}" ${i === abierta ? "open" : ""}><summary>${s.titulo}</summary>
       ${s.apuntes ? `<p class="sub">📄 En clase: ${s.apuntes}</p>` : ""}${s.html}
       ${i + 1 < ud.guia.length ? `<p class="pie-seccion"><button type="button" data-ir="${i + 2}">Siguiente apartado →</button></p>` : ""}</details>`).join("") +
    `<div class="card"><b>¿Lo pones a prueba?</b><div class="pestanas">
      <a class="btn btn-prim" href="#/ud/${ud.id}/practicar">🧪 Test de esta unidad</a>
      <a class="btn" href="#/ud/${ud.id}/examen">⏱️ Examen de esta unidad</a></div></div>`;
  $app.querySelectorAll("[data-ir]").forEach(b => b.onclick = () => {
    const d = document.getElementById(`sec-${b.dataset.ir}`); d.open = true; d.scrollIntoView({ behavior: "smooth" });
  });
  if (abierta) document.getElementById(`sec-${abierta + 1}`).scrollIntoView();
}

// ---------- Examen y Test: elegir asignatura, temas y número de preguntas ----------
function vistaConfig(modo, modId) {
  const examen = modo === "examen";
  const intro = examen ? "Sin corrección hasta el final: al terminar ves la nota, el tiempo y qué repasar."
    : "Corrección y explicación después de cada pregunta.";
  const m = moduloPorId(modId), uds = m ? udsDeModulo(m.id) : [];
  if (!uds.length) return elegirAsignatura(modo, intro);
  const numeros = [10, 20, 30, 0], porDefecto = examen ? 10 : 20;
  $app.innerHTML = migas([[`#/${modo}`, "← " + NOMBRES[modo]]]) + `<h1>${TITULOS[modo]} · ${nombreModulo(m)}</h1><p class="sub">${intro}</p>
    <form id="f-config" class="card config">
      <fieldset><legend>¿Qué preguntas?</legend>
        <label class="eleccion"><input type="radio" name="origen" value="todo" checked> 🎲 <span><b>Aleatorias</b><br>
          <span class="sub">de toda la asignatura</span></span></label>
        <label class="eleccion"><input type="radio" name="origen" value="temas"> 📚 <span><b>Elegir temas</b><br>
          <span class="sub">unidades y apartados concretos</span></span></label>
      </fieldset>
      <fieldset id="temas" hidden><legend>Temas</legend>
        ${uds.map(u => `<div class="tema">
          <label class="eleccion"><input type="checkbox" data-ud="${u.id}" checked> <b>${u.codigo} · ${u.titulo}</b></label>
          <details><summary class="sub">Elegir apartados</summary>${u.guia.map((s, i) =>
            `<label class="eleccion fina"><input type="checkbox" name="sec" data-de="${u.id}" value="${u.id}#${i + 1}" checked> ${s.titulo}</label>`).join("")}
          </details></div>`).join("")}
      </fieldset>
      <fieldset><legend>Número de preguntas</legend><div class="segmentado">${numeros.map(n =>
        `<label><input type="radio" name="n" value="${n}" ${n === porDefecto ? "checked" : ""}><span>${n || "Todas"}</span></label>`).join("")}</div>
      </fieldset>
      ${examen ? "" : `<label class="eleccion"><input type="checkbox" name="fallos"> 🔁 <span>Solo las que he fallado</span></label>`}
      <p id="config-info" class="sub" aria-live="polite"></p>
      <button class="btn-prim grande" id="empezar">Empezar ${examen ? "examen" : "test"}</button>
    </form>`;
  const form = document.getElementById("f-config"), info = document.getElementById("config-info");
  const elegidas = () => {
    const f = new FormData(form);
    let items = uds.flatMap(preguntasDe);
    if (f.get("origen") === "temas") { const secs = new Set(f.getAll("sec")); items = items.filter(({ q, ud }) => secs.has(`${ud.id}#${q.seccion}`)); }
    if (f.get("fallos")) { const p = cargar(); items = items.filter(({ q }) => p[q.id] && !p[q.id].ultimo); }
    return items;
  };
  const actualizar = () => {
    document.getElementById("temas").hidden = new FormData(form).get("origen") !== "temas";
    const n = elegidas().length, pedidas = +new FormData(form).get("n") || n;
    info.textContent = n ? `Hay ${n} preguntas con esta selección; harás ${Math.min(n, pedidas)}.` : "⚠️ No hay preguntas con esta selección.";
    document.getElementById("empezar").disabled = !n;
  };
  form.addEventListener("change", e => {
    const t = e.target;
    if (t.dataset.ud) form.querySelectorAll(`[data-de="${t.dataset.ud}"]`).forEach(c => c.checked = t.checked);
    if (t.dataset.de) form.querySelector(`[data-ud="${t.dataset.de}"]`).checked = !!form.querySelector(`[data-de="${t.dataset.de}"]:checked`);
    actualizar();
  });
  form.onsubmit = e => {
    e.preventDefault();
    const items = elegidas(), n = +new FormData(form).get("n");
    if (items.length) iniciarSesion({ modo, n, titulo: m.nombre, volver: `#/${modo}/${m.id}`, obtener: () => items });
  };
  actualizar();
}

// Rutas directas de una unidad: #/ud/<id>/practicar | examen | fallos
function sesionUD(ud, vista) {
  const base = { titulo: `${ud.codigo} · ${ud.titulo}`, volver: `#/ud/${ud.id}/guia` };
  if (vista === "examen") return iniciarSesion({ ...base, modo: "examen", n: 10, obtener: () => preguntasDe(ud) });
  if (vista === "fallos") return iniciarSesion({ ...base, modo: "test", n: 20, soloFallos: true,
    obtener: () => { const p = cargar(); return preguntasDe(ud).filter(({ q }) => p[q.id] && !p[q.id].ultimo); } });
  return iniciarSesion({ ...base, modo: "test", n: 20, obtener: () => preguntasDe(ud) });
}

// ---------- Ronda de preguntas ----------
function pararReloj() { if (reloj) clearInterval(reloj); reloj = null; }
const mmss = ms => { const s = Math.floor(ms / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };

function iniciarSesion(cfg) {
  pararReloj();
  const items = cfg.obtener(), lista = barajar(items).slice(0, cfg.n || items.length);
  if (!lista.length) {
    sesionActiva = null;
    $app.innerHTML = migas([[cfg.volver, "← Volver"]]) + `<div class="card">${cfg.soloFallos ? "🎉 No tienes preguntas falladas pendientes." : "No hay preguntas con esta selección."}</div>`;
    return;
  }
  const s = { cfg, lista, i: 0, aciertos: 0, inicio: Date.now(), respuestas: [], varias: new Set(lista.map(x => x.ud.id)).size > 1 };
  sesionActiva = s;
  if (cfg.modo === "examen") reloj = setInterval(() => { const r = document.getElementById("reloj"); if (r) r.textContent = mmss(Date.now() - s.inicio); }, 1000);
  window.scrollTo(0, 0);
  mostrarPregunta(s);
}

function cabeceraSesion(s) {
  return migas([[s.cfg.volver, "← Volver"]]) + `<h1 class="h-ronda">${TITULOS[s.cfg.modo]} · ${s.cfg.titulo}</h1>`;
}

// «Dónde estudiarlo»: sección de la guía (se abre en otra pestaña para no perder la ronda), apuntes y ejercicios.
function dondeEstudiar(ud, q) {
  const sec = q.seccion && ud.guia[q.seccion - 1], partes = [];
  if (sec) partes.push(`📖 Guía: <a href="#/ud/${ud.id}/guia?s=${q.seccion}" target="_blank" rel="noopener">${ud.codigo} · ${sec.titulo}</a>`);
  if (sec && sec.apuntes) partes.push(`📄 ${sec.apuntes}`);
  if (q.fuente) partes.push(`📌 ${q.fuente}`);
  else if (q.tipo === "numerica" && ud.ejercicios) partes.push(`📝 Practica problemas de este tipo en la ${ud.ejercicios.charAt(0).toLowerCase() + ud.ejercicios.slice(1)}`);
  return partes.length ? `<div class="donde"><b>Dónde estudiarlo</b><br>${partes.join("<br>")}</div>` : "";
}
function bloqueExplicacion(ud, q, v, abierto) {
  const exp = typeof q.explicacion === "function" ? q.explicacion(v) : q.explicacion;
  return `<details class="explicacion"${abierto ? " open" : ""}><summary>💡 Explicación</summary><p>${exp || ""}</p>${dondeEstudiar(ud, q)}</details>`;
}

function prepararNumerica(q) {
  const v = {};
  for (const [k, [min, max, paso]] of Object.entries(q.variables || {})) {
    const n = Math.round((max - min) / paso);
    v[k] = +(min + paso * Math.floor(Math.random() * (n + 1))).toFixed(6);
  }
  return v;
}
// Lee la respuesta del usuario. Acepta coma decimal y punto de miles («45.000», «1.234,5»), que es como fmt() muestra
// las soluciones. «1.500» es ambiguo (1500 o 1,5): devuelve ambas lecturas y vale si cualquiera es correcta.
function leerNumero(txt) {
  const s = txt.replace(/\s/g, "");
  const lecturas = s.includes(",") ? [s.replace(/\./g, "").replace(",", ".")]
    : /^[-+]?\d{1,3}(\.\d{3})+$/.test(s) ? [s.replace(/\./g, ""), s] : [s];
  return lecturas.map(t => /^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(t) ? parseFloat(t) : NaN).filter(isFinite);
}
function sustituir(txt, v) { return txt.replace(/\{(\w+)\}/g, (_, k) => k in v ? fmt(v[k]) : `{${k}}`); }

function mostrarPregunta(s) {
  const { q, ud } = s.lista[s.i]; const examen = s.cfg.modo === "examen";
  const v = q.tipo === "numerica" ? prepararNumerica(q) : null;
  window.__actual = { q, v }; // usado por tests/comprobar.js
  let cuerpo = "";
  if (q.tipo === "test") {
    const orden = barajar(q.opciones.map((_, k) => k));
    cuerpo = orden.map(k => `<button class="opcion" data-k="${k}">${q.opciones[k]}</button>`).join("");
  } else if (q.tipo === "vf") {
    cuerpo = `<button class="opcion" data-k="true">Verdadero</button><button class="opcion" data-k="false">Falso</button>`;
  } else {
    cuerpo = `<form id="f-num"><input type="text" inputmode="decimal" id="resp" placeholder="Resultado" autocomplete="off" aria-label="Resultado"> ${q.unidad || ""}
      <button class="btn-prim">Comprobar</button></form>`;
  }
  const pct = Math.round(100 * s.i / s.lista.length);
  $app.innerHTML = cabeceraSesion(s) +
    `<p class="sub estado-ronda"><span>Pregunta ${s.i + 1} de ${s.lista.length}${examen ? "" : ` · Aciertos: ${s.aciertos}`}</span>
       ${examen ? `<span>⏱️ <span id="reloj">${mmss(Date.now() - s.inicio)}</span></span>` : ""}</p>
     <div class="avance"><div style="width:${pct}%"></div></div>
     <div class="card">${s.varias ? `<p class="etiqueta">${ud.codigo} · ${ud.titulo}</p>` : ""}
       <p><b>${v ? sustituir(q.enunciado, v) : q.enunciado}</b></p>${cuerpo}<div id="fb" aria-live="polite"></div></div>`;

  const responder = (acierto, extra = "") => {
    anotar(q.id, acierto); if (acierto) s.aciertos++;
    s.respuestas.push({ q, ud, acierto, v });
    if (examen) return siguiente(s);
    document.getElementById("fb").innerHTML = `<div class="feedback ${acierto ? "ok" : "ko"}">
      <b>${acierto ? "✅ Correcto" : "❌ Incorrecto"}</b>${extra}${bloqueExplicacion(ud, q, v, !acierto)}
      <button class="btn-prim" id="sig">${s.i + 1 < s.lista.length ? "Siguiente →" : "Ver resultado"}</button></div>`;
    const sig = document.getElementById("sig"); sig.onclick = () => siguiente(s); sig.focus({ preventScroll: true });
  };

  if (q.tipo === "numerica") {
    document.getElementById("f-num").onsubmit = e => {
      e.preventDefault();
      const sol = q.resolver(v);
      const tol = Math.max(Math.abs(sol) * (q.tolerancia ?? 0.02), q.toleranciaAbs ?? 0);
      const ok = leerNumero(document.getElementById("resp").value).some(x => Math.abs(x - sol) <= tol);
      e.target.querySelectorAll("input,button").forEach(el => el.disabled = true);
      responder(ok, ok ? "" : ` — solución: ${fmt(sol)} ${q.unidad || ""}`);
    };
  } else {
    $app.querySelectorAll(".opcion").forEach(b => b.onclick = () => {
      const elegido = q.tipo === "vf" ? b.dataset.k === "true" : +b.dataset.k;
      const ok = elegido === q.correcta;
      $app.querySelectorAll(".opcion").forEach(o => {
        o.disabled = true;
        const val = q.tipo === "vf" ? o.dataset.k === "true" : +o.dataset.k;
        if (!examen && val === q.correcta) o.classList.add("ok");
      });
      if (!ok && !examen) b.classList.add("ko");
      responder(ok);
    });
  }
}

function siguiente(s) {
  s.i++;
  window.scrollTo(0, 0);
  if (s.i < s.lista.length) return mostrarPregunta(s);
  pararReloj(); sesionActiva = null;
  const nota = (10 * s.aciertos / s.lista.length).toFixed(1).replace(".", ",");
  const fallos = s.respuestas.filter(r => !r.acierto);
  $app.innerHTML = cabeceraSesion(s) + `<div class="card resultado"><h2>${(n => n >= 8 ? "🏆" : n >= 5 ? "🎯" : "📝")(10 * s.aciertos / s.lista.length)} Resultado: ${s.aciertos}/${s.lista.length} · Nota ${nota}</h2>
    <p class="sub">Tiempo: ${mmss(Date.now() - s.inicio)}</p>
    <div class="pestanas"><button class="btn-prim" id="otra">🔄 Otra ronda</button>
      ${fallos.length ? `<button id="repasar">🔁 Repetir las ${fallos.length} falladas</button>` : ""}
      <a class="btn" href="${s.cfg.volver}">Cambiar selección</a></div>
    ${fallos.length ? "<h3>Repasa:</h3>" + fallos.map(r =>
      `<div class="card"><p><b>${r.v ? sustituir(r.q.enunciado, r.v) : r.q.enunciado}</b></p>${bloqueExplicacion(r.ud, r.q, r.v, false)}</div>`
    ).join("") : "<p>🎉 ¡Todo correcto!</p>"}</div>`;
  document.getElementById("otra").onclick = () => iniciarSesion(s.cfg);
  const rep = document.getElementById("repasar");
  if (rep) rep.onclick = () => { const items = fallos.map(({ q, ud }) => ({ q, ud }));
    iniciarSesion({ ...s.cfg, modo: "test", n: 0, soloFallos: false, obtener: () => items }); };
}

// ---------- Ajustes ----------
function temaGuardado() { try { const t = localStorage.getItem("qi-tema"); return t === "light" || t === "dark" ? t : "auto"; } catch { return "auto"; } }
function aplicarTema(t) {
  const r = document.documentElement;
  if (t === "light" || t === "dark") r.dataset.theme = t; else delete r.dataset.theme;
  try { t === "light" || t === "dark" ? localStorage.setItem("qi-tema", t) : localStorage.removeItem("qi-tema"); } catch {}
}

function vistaAjustes() {
  const u = usuarioActual(), tema = temaGuardado();
  const resumen = MODULOS.filter(m => udsDeModulo(m.id).length)
    .map(m => `<p><b>${nombreModulo(m)}</b></p>${barraProgreso(udsDeModulo(m.id).flatMap(x => x.preguntas))}`).join("");
  $app.innerHTML = `<h1>⚙️ Ajustes</h1>
    <section class="card"><h2>👤 Usuario</h2><p>Has entrado como <b id="aj-nombre"></b>.</p>
      ${u.remoto ? `<p class="sub">Para cerrar la sesión, cierra el navegador.</p>` : `<button id="aj-salir">Cerrar sesión</button>`}</section>
    <section class="card"><h2>🌓 Apariencia</h2>
      <div class="segmentado" role="radiogroup" aria-label="Tema">${[["auto", "🔄 Automático"], ["light", "☀️ Día"], ["dark", "🌙 Noche"]].map(([val, t]) =>
        `<label><input type="radio" name="tema" value="${val}" ${tema === val ? "checked" : ""}><span>${t}</span></label>`).join("")}</div>
      <p class="sub">«Automático» sigue el modo claro u oscuro de tu móvil u ordenador.</p></section>
    <section class="card"><h2>📊 Progreso</h2>${resumen}
      <p class="sub">Se guarda en este navegador y se mantiene al cerrarlo. Se pierde si borras los datos de navegación o usas
      el modo incógnito, y no pasa solo a otro navegador o dispositivo: para eso, expórtalo a un archivo e impórtalo allí.</p>
      <div class="pestanas"><button id="exportar">⬇️ Exportar progreso</button><label class="btn">⬆️ Importar progreso
      <input type="file" id="importar" accept=".json,application/json" hidden></label><button id="reset" class="peligro">🗑️ Borrar progreso</button></div>
      <p class="sub" id="msg-progreso" aria-live="polite"></p></section>
    <section class="card"><h2>📲 Instalar como app</h2>${bloqueInstalar()}</section>
    <section class="card"><h2>🆕 Novedades</h2><a href="#/novedades">Ver todas las novedades de la app</a></section>`;
  document.getElementById("aj-nombre").textContent = u.nombre;
  const salir = document.getElementById("aj-salir");
  if (salir) salir.onclick = () => { cerrarSesion(); location.hash = "#/"; router(); };
  const inst = document.getElementById("instalar");
  if (inst) inst.onclick = async () => { const a = avisoInstalar; avisoInstalar = null; a.prompt(); await a.userChoice.catch(() => {}); vistaAjustes(); };
  $app.querySelectorAll("input[name=tema]").forEach(r => r.onchange = () => aplicarTema(r.value));
  const msg = document.getElementById("msg-progreso");
  document.getElementById("reset").onclick = () => { if (confirm("¿Borrar todo tu progreso? No se puede deshacer.")) { guardar({}); vistaAjustes(); } };
  document.getElementById("exportar").onclick = () => {
    const datos = { app: "quimica-industrial", version: 1, usuario: u.nombre, fecha: new Date().toISOString(), progreso: cargar() };
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(datos, null, 1)], { type: "application/json" }));
    a.download = `progreso-${u.nombre}-${datos.fecha.slice(0, 10)}.json`;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  document.getElementById("importar").onchange = async e => {
    const archivo = e.target.files[0]; if (!archivo) return;
    try {
      const datos = JSON.parse(await archivo.text());
      if (datos.app !== "quimica-industrial" || typeof datos.progreso !== "object") throw new Error();
      guardar(mezclarProgreso(cargar(), datos.progreso)); vistaAjustes();
      document.getElementById("msg-progreso").textContent = `✅ Importadas ${Object.keys(datos.progreso).length} preguntas.`;
    } catch { msg.textContent = "❌ El archivo no es un progreso exportado por esta app."; }
  };
}

// ---------- Login local (ver js/usuarios.js) ----------
function vistaLogin() {
  const hay = Object.keys(almacen.leer(USUARIOS, {})).length > 0;
  $app.innerHTML = `<div class="card login"><h2>${hay ? "Entrar" : "Crear usuario"}</h2>
    <form id="f-login">
      <label>Usuario<br><input type="text" id="l-usuario" autocomplete="username" required></label>
      <label>Contraseña<br><input type="password" id="l-clave" autocomplete="${hay ? "current" : "new"}-password" required></label>
      <label class="sub"><input type="checkbox" id="l-recordar" checked> Mantener la sesión abierta en este dispositivo</label>
      <p id="l-error" class="error"></p>
      <button class="btn-prim" id="l-entrar">${hay ? "Entrar" : "Crear usuario y entrar"}</button>
      ${hay ? `<button type="button" id="l-nuevo">Crear otro usuario</button>` : ""}
      <button type="button" id="l-invitado">Entrar como invitado</button>
    </form>
    <p class="sub">Los usuarios y el progreso se guardan solo en este navegador: no se envían a ningún sitio.</p></div>`;
  let crear = !hay;
  const err = document.getElementById("l-error");
  const nuevo = document.getElementById("l-nuevo");
  if (nuevo) nuevo.onclick = () => { crear = true; nuevo.remove(); document.querySelector(".login h2").textContent = "Crear usuario";
    document.getElementById("l-entrar").textContent = "Crear usuario y entrar"; document.getElementById("l-clave").autocomplete = "new-password"; };
  document.getElementById("l-invitado").onclick = () => { abrirSesion(INVITADO, false); router(); };
  document.getElementById("f-login").onsubmit = async e => {
    e.preventDefault();
    const nombre = document.getElementById("l-usuario").value, clave = document.getElementById("l-clave").value;
    const recordar = document.getElementById("l-recordar").checked;
    if (crear) { const fallo = await registrar(nombre, clave); if (fallo) { err.textContent = fallo; return; } }
    const id = await entrar(nombre, clave);
    if (!id) { err.textContent = "Usuario o contraseña incorrectos."; return; }
    abrirSesion(id, recordar); router();
  };
}

function pintarUsuario() {
  const u = usuarioActual(), zona = document.getElementById("usuario-barra");
  zona.textContent = "";
  if (!u) return;
  const nombre = document.createElement("span"); nombre.className = "sub nombre"; nombre.textContent = "👤 " + u.nombre;
  const salir = document.createElement("button"); salir.className = "btn-icono"; salir.id = "salir"; salir.textContent = "Salir";
  salir.onclick = () => { cerrarSesion(); if (location.hash && location.hash !== "#/") location.hash = "#/"; else router(); };
  if (u.remoto) { nombre.title = "Para salir, cierra el navegador"; return zona.append(nombre); }
  zona.append(nombre, " ", salir);
}

// ---------- Router ----------
function marcarNav(seccion) {
  document.querySelectorAll(".nav-principal a").forEach(a => {
    if (a.dataset.nav === seccion) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
}
function router() {
  pararReloj(); sesionActiva = null;
  pintarUsuario();
  const conSesion = !!usuarioActual();
  document.body.classList.toggle("sin-sesion", !conSesion);
  if (!conSesion) return vistaLogin();
  const [ruta, consulta = ""] = location.hash.split("?");
  const [, seccion, a, b] = ruta.split("/");
  mostrarNovedades(false);
  window.scrollTo(0, 0);
  const ud = seccion === "ud" && udPorId(a);
  marcarNav(ud ? ({ examen: "examen", practicar: "test", fallos: "test" }[b] || "estudio")
    : seccion === "novedades" ? "ajustes" : ["examen", "test", "ajustes"].includes(seccion) ? seccion : "estudio");
  if (seccion === "novedades") return vistaNovedades();
  if (seccion === "ajustes") return vistaAjustes();
  if (seccion === "test" || seccion === "examen") return vistaConfig(seccion, a);
  if (ud) return b === "guia" || !b ? vistaGuia(ud, +new URLSearchParams(consulta).get("s")) : sesionUD(ud, b);
  return vistaEstudio(seccion === "estudio" ? a : null);
}

// Enlaces internos: avisa antes de abandonar una ronda empezada y, si el enlace es la página actual, la vuelve a cargar
// (p. ej. pulsar «Test» estando en Test vuelve a la selección).
document.addEventListener("click", e => {
  const a = e.target.closest("a[href^='#']");
  if (!a || a.target === "_blank" || e.defaultPrevented) return;
  if (sesionActiva && sesionActiva.respuestas.length &&
      !confirm("¿Dejar esta ronda? Las respuestas que ya has dado sí cuentan en tu progreso.")) { e.preventDefault(); return; }
  const h = a.getAttribute("href");
  if (h === location.hash || (h === "#/" && !location.hash)) { e.preventDefault(); router(); }
});

// ---------- Novedades ----------
// Recuadro al entrar con las novedades que este usuario no ha visto (datos/novedades.js). Se construye con textContent.
const claveNovedades = () => `qi-novedades:${usuarioActual().id}`;
function listaNovedades(entradas) {
  const cont = document.createElement("div");
  for (const n of entradas) {
    const h = document.createElement("h3"); h.textContent = n.titulo;
    const f = document.createElement("p"); f.className = "sub"; f.textContent = n.id.slice(0, 10).split("-").reverse().join("/");
    const ul = document.createElement("ul");
    for (const p of n.puntos) { const li = document.createElement("li"); li.textContent = p; ul.append(li); }
    cont.append(h, f, ul);
  }
  return cont;
}
function mostrarNovedades(forzar) {
  const todas = window.NOVEDADES || [];
  if (!todas.length || document.getElementById("novedades")) return;
  const vista = almacen.leer(claveNovedades(), null);
  const nuevas = forzar ? todas.slice(0, 3) : todas.slice(0, Math.min(3, (i => i < 0 ? todas.length : i)(todas.findIndex(n => n.id === vista))));
  if (!nuevas.length) return;
  const fondo = document.createElement("div"); fondo.id = "novedades"; fondo.className = "modal";
  const caja = document.createElement("div"); caja.className = "card"; caja.setAttribute("role", "dialog"); caja.setAttribute("aria-modal", "true");
  caja.setAttribute("aria-label", "Novedades");
  const t = document.createElement("h2"); t.textContent = "🆕 Novedades";
  const ok = document.createElement("button"); ok.className = "btn-prim"; ok.id = "novedades-ok"; ok.textContent = "Entendido";
  const todasLink = document.createElement("a"); todasLink.href = "#/novedades"; todasLink.textContent = "Ver todas las novedades";
  const cerrar = () => { almacen.escribir(claveNovedades(), todas[0].id); fondo.remove(); document.removeEventListener("keydown", tecla); };
  const tecla = e => { if (e.key === "Escape") cerrar(); };
  ok.onclick = cerrar; todasLink.onclick = cerrar; document.addEventListener("keydown", tecla);
  fondo.onclick = e => { if (e.target === fondo) cerrar(); };
  const pie = document.createElement("p"); pie.className = "pestanas pie-modal"; pie.append(ok, todasLink);
  caja.append(t, listaNovedades(nuevas), pie); fondo.append(caja); document.body.append(fondo); ok.focus({ preventScroll: true }); caja.scrollTop = 0;
}
function vistaNovedades() {
  $app.innerHTML = migas([["#/ajustes", "Ajustes"]]) + `<h1>🆕 Novedades</h1><div class="card" id="todas-novedades"></div>`;
  document.getElementById("todas-novedades").append(listaNovedades(window.NOVEDADES || []));
}

// ---------- Instalar como app (PWA) ----------
// El manifest solo se enlaza servido por http(s) (Cloudflare); abriendo index.html como archivo daría error.
if (/^https?:$/.test(location.protocol)) {
  const l = document.createElement("link"); l.rel = "manifest"; l.href = "manifest.webmanifest"; document.head.append(l);
}
let avisoInstalar = null; // evento de Chrome/Android para mostrar el diálogo de instalación
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); avisoInstalar = e; });
window.addEventListener("appinstalled", () => { avisoInstalar = null; });
const instalada = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
function bloqueInstalar() {
  if (instalada()) return `<p>✅ Estás usando la app instalada.</p>`;
  if (!/^https?:$/.test(location.protocol)) return `<p class="sub">Para instalarla, ábrela desde su dirección web (no como archivo).</p>`;
  return `${avisoInstalar ? `<button class="btn-prim" id="instalar">📲 Instalar en este dispositivo</button>` : ""}
    <p class="sub">Queda un icono en la pantalla de inicio y se abre a pantalla completa, sin barra del navegador.</p>
    <ul class="sub"><li><b>Android (Chrome):</b> menú ⋮ → «Instalar aplicación» o «Añadir a pantalla de inicio».</li>
    <li><b>iPhone (Safari):</b> botón Compartir → «Añadir a pantalla de inicio».</li>
    <li><b>Ordenador (Chrome/Edge):</b> icono de instalar a la derecha de la barra de direcciones.</li></ul>`;
}

aplicarTema(temaGuardado());
window.addEventListener("hashchange", router);
detectarUsuarioRemoto().finally(router);
