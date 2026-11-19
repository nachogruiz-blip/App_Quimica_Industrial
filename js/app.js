// Motor de la app: rutas por hash, guía, práctica, repaso de fallos y progreso en localStorage.
"use strict";
const $app = document.getElementById("app");
const CLAVE = "qi-progreso-v1";

function fmt(x) { return Number(x.toPrecision(4)).toLocaleString("es-ES"); }
function cargar() { try { return JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch { return {}; } }
function guardar(p) { try { localStorage.setItem(CLAVE, JSON.stringify(p)); } catch {} }
function anotar(qid, acierto) {
  const p = cargar(); const r = p[qid] || { a: 0, f: 0 };
  acierto ? r.a++ : r.f++; r.ultimo = acierto; p[qid] = r; guardar(p);
}
function barajar(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function udPorId(id) { return UNIDADES.find(u => u.id === id); }
function dominio(ud) {
  const p = cargar(); const n = ud.preguntas.length;
  return n ? ud.preguntas.filter(q => p[q.id] && p[q.id].ultimo).length / n : 0;
}

// ---------- Vistas ----------
function vistaInicio() {
  $app.innerHTML = `<h1>Unidades</h1>` + UNIDADES.map(u => `
    <a class="card" href="#/ud/${u.id}/guia">
      <b>${u.codigo} · ${u.titulo}</b><div class="sub">${u.descripcion || ""} · ${u.preguntas.length} preguntas</div>
      <div class="barra-prog"><div style="width:${Math.round(dominio(u) * 100)}%"></div></div>
    </a>`).join("") +
    `<p class="sub">El progreso se guarda en este navegador. <button id="reset">Borrar progreso</button></p>`;
  document.getElementById("reset").onclick = () => { if (confirm("¿Borrar todo el progreso?")) { guardar({}); vistaInicio(); } };
}

function cabeceraUD(ud, activa) {
  const t = [["guia", "📖 Guía"], ["practicar", "✍️ Practicar"], ["examen", "⏱️ Examen"], ["fallos", "🔁 Fallos"]];
  return `<p class="sub"><a href="#/">← Unidades</a></p><h1>${ud.codigo} · ${ud.titulo}</h1>
    <nav class="pestanas">${t.map(([k, n]) => `<a class="btn ${k === activa ? "activa" : ""}" href="#/ud/${ud.id}/${k}">${n}</a>`).join("")}</nav>`;
}

function vistaGuia(ud) {
  $app.innerHTML = cabeceraUD(ud, "guia") + ud.guia.map((s, i) =>
    `<details class="card" ${i === 0 ? "open" : ""}><summary>${s.titulo}</summary>${s.html}</details>`).join("");
}

// Sesión de preguntas (práctica, examen o fallos)
function iniciarSesion(ud, modo) {
  const p = cargar();
  let lista = modo === "fallos" ? ud.preguntas.filter(q => p[q.id] && !p[q.id].ultimo) : ud.preguntas;
  lista = barajar(lista).slice(0, modo === "examen" ? 10 : 20);
  if (!lista.length) {
    $app.innerHTML = cabeceraUD(ud, modo) + `<div class="card">${modo === "fallos" ? "🎉 No tienes preguntas falladas pendientes." : "Aún no hay preguntas."}</div>`;
    return;
  }
  const s = { ud, modo, lista, i: 0, aciertos: 0, inicio: Date.now(), respuestas: [] };
  mostrarPregunta(s);
}

function prepararNumerica(q) {
  const v = {};
  for (const [k, [min, max, paso]] of Object.entries(q.variables || {})) {
    const n = Math.round((max - min) / paso);
    v[k] = +(min + paso * Math.floor(Math.random() * (n + 1))).toFixed(6);
  }
  return v;
}
function sustituir(txt, v) { return txt.replace(/\{(\w+)\}/g, (_, k) => k in v ? fmt(v[k]) : `{${k}}`); }

function mostrarPregunta(s) {
  const q = s.lista[s.i]; const examen = s.modo === "examen";
  const v = q.tipo === "numerica" ? prepararNumerica(q) : null;
  let cuerpo = "";
  if (q.tipo === "test") {
    const orden = barajar(q.opciones.map((_, k) => k));
    cuerpo = orden.map(k => `<button class="opcion" data-k="${k}">${q.opciones[k]}</button>`).join("");
  } else if (q.tipo === "vf") {
    cuerpo = `<button class="opcion" data-k="true">Verdadero</button><button class="opcion" data-k="false">Falso</button>`;
  } else {
    cuerpo = `<form id="f-num"><input type="text" inputmode="decimal" id="resp" placeholder="Resultado" autocomplete="off"> ${q.unidad || ""}
      <button class="btn-prim">Comprobar</button></form>`;
  }
  $app.innerHTML = cabeceraUD(s.ud, s.modo) +
    `<p class="sub">Pregunta ${s.i + 1} de ${s.lista.length}${examen ? "" : ` · Aciertos: ${s.aciertos}`}</p>
     <div class="card"><p><b>${v ? sustituir(q.enunciado, v) : q.enunciado}</b></p>${cuerpo}<div id="fb"></div></div>`;

  const responder = (acierto, extra = "") => {
    anotar(q.id, acierto); if (acierto) s.aciertos++;
    s.respuestas.push({ q, acierto, v });
    if (examen) return siguiente(s);
    const exp = typeof q.explicacion === "function" ? q.explicacion(v) : q.explicacion;
    document.getElementById("fb").innerHTML = `<div class="feedback ${acierto ? "ok" : "ko"}">
      <b>${acierto ? "✅ Correcto" : "❌ Incorrecto"}</b>${extra}<p>${exp || ""}</p>
      <button class="btn-prim" id="sig">${s.i + 1 < s.lista.length ? "Siguiente →" : "Ver resultado"}</button></div>`;
    document.getElementById("sig").onclick = () => siguiente(s);
  };

  if (q.tipo === "numerica") {
    document.getElementById("f-num").onsubmit = e => {
      e.preventDefault();
      const x = parseFloat(document.getElementById("resp").value.replace(/\s/g, "").replace(",", "."));
      const sol = q.resolver(v);
      const ok = isFinite(x) && Math.abs(x - sol) <= Math.abs(sol) * (q.tolerancia ?? 0.02);
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
  if (s.i < s.lista.length) return mostrarPregunta(s);
  const nota = (10 * s.aciertos / s.lista.length).toFixed(1).replace(".", ",");
  const min = Math.round((Date.now() - s.inicio) / 60000);
  const fallos = s.respuestas.filter(r => !r.acierto);
  $app.innerHTML = cabeceraUD(s.ud, s.modo) + `<div class="card"><h2>Resultado: ${s.aciertos}/${s.lista.length} · Nota ${nota}</h2>
    <p class="sub">Tiempo: ${min} min</p>
    ${fallos.length ? "<h3>Repasa:</h3>" + fallos.map(r => {
      const e = typeof r.q.explicacion === "function" ? r.q.explicacion(r.v) : r.q.explicacion;
      return `<details class="card"><summary>${r.v ? sustituir(r.q.enunciado, r.v) : r.q.enunciado}</summary><p>${e || ""}</p></details>`;
    }).join("") : "<p>🎉 ¡Todo correcto!</p>"}
    <a class="btn btn-prim" href="#/ud/${s.ud.id}/${s.modo}?r=${Date.now()}">Otra ronda</a></div>`;
}

// ---------- Router ----------
function router() {
  const [, , id, vista] = location.hash.split("?")[0].split("/");
  const ud = id && udPorId(id);
  if (!ud) return vistaInicio();
  if (vista === "guia" || !vista) return vistaGuia(ud);
  iniciarSesion(ud, vista);
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", router);
router();

// Tema claro/oscuro manual
document.getElementById("tema-btn").onclick = () => {
  const r = document.documentElement;
  const oscuro = r.dataset.theme ? r.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  r.dataset.theme = oscuro ? "light" : "dark";
  try { localStorage.setItem("qi-tema", r.dataset.theme); } catch {}
};
try { const t = localStorage.getItem("qi-tema"); if (t) document.documentElement.dataset.theme = t; } catch {}
