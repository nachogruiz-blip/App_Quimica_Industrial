// Motor de la app: rutas por hash, login local, guía, práctica, repaso de fallos y progreso (cargar/guardar en js/usuarios.js).
"use strict";
const $app = document.getElementById("app");
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
  const tarjeta = u => `
    <a class="card" href="#/ud/${u.id}/guia">
      <b>${u.codigo} · ${u.titulo}</b><div class="sub">${u.descripcion || ""} · ${u.preguntas.length} preguntas</div>
      <div class="barra-prog"><div style="width:${Math.round(dominio(u) * 100)}%"></div></div>
    </a>`;
  $app.innerHTML = MODULOS.map(m => {
    const uds = UNIDADES.filter(u => u.modulo === m.id);
    return `<h2>${m.nombre}${m.codigo ? ` <span class="sub">(${m.codigo})</span>` : ""}</h2>` +
      (uds.length ? uds.map(tarjeta).join("") : `<p class="sub">Próximamente.</p>`);
  }).join("") +
    `<div class="card"><b>Tu progreso</b>
      <p class="sub">Se guarda en este navegador y se mantiene al cerrarlo. Se pierde si borras los datos de navegación o usas
      el modo incógnito, y no pasa solo a otro navegador o dispositivo: para eso, expórtalo a un archivo e impórtalo allí.</p>
      <div class="pestanas"><button id="exportar">⬇️ Exportar progreso</button><label class="btn">⬆️ Importar progreso
      <input type="file" id="importar" accept=".json,application/json" hidden></label><button id="reset">Borrar progreso</button></div>
      <p class="sub" id="msg-progreso"></p></div>`;
  const msg = document.getElementById("msg-progreso");
  document.getElementById("reset").onclick = () => { if (confirm("¿Borrar todo tu progreso?")) { guardar({}); vistaInicio(); } };
  document.getElementById("exportar").onclick = () => {
    const u = usuarioActual();
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
      guardar(mezclarProgreso(cargar(), datos.progreso)); vistaInicio();
      document.getElementById("msg-progreso").textContent = `✅ Importadas ${Object.keys(datos.progreso).length} preguntas.`;
    } catch { msg.textContent = "❌ El archivo no es un progreso exportado por esta app."; }
  };
}

// Login local: entrar, crear usuario o entrar como invitado (ver js/usuarios.js).
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
  const nombre = document.createElement("span"); nombre.className = "sub"; nombre.textContent = "👤 " + u.nombre;
  const salir = document.createElement("button"); salir.className = "btn-icono"; salir.id = "salir"; salir.textContent = "Salir";
  salir.onclick = () => { cerrarSesion(); if (location.hash && location.hash !== "#/") location.hash = "#/"; else router(); };
  zona.append(nombre, " ", salir);
}

function cabeceraUD(ud, activa) {
  const t = [["guia", "📖 Guía"], ["practicar", "✍️ Practicar"], ["examen", "⏱️ Examen"], ["fallos", "🔁 Fallos"]];
  const m = MODULOS.find(x => x.id === ud.modulo);
  return `<p class="sub"><a href="#/">← Inicio</a>${m ? " · " + m.nombre : ""}</p><h1>${ud.codigo} · ${ud.titulo}</h1>
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
  const q = s.lista[s.i]; const examen = s.modo === "examen";
  const v = q.tipo === "numerica" ? prepararNumerica(q) : null;
  window.__actual = { q, v }; // usado por tests/comprobar.js
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
  pintarUsuario();
  if (!usuarioActual()) return vistaLogin();
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
