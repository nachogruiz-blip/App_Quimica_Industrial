// Revisión de los archivos del repo (sin navegador): derechos, seguridad del código y que index.html cargue todas las UD.
const fs = require("fs"), path = require("path"), { execSync } = require("child_process");
const { RAIZ } = require("./comun");

module.exports = async ctx => {
  const mal = e => ctx.problemas.push(e);
  const leer = f => fs.readFileSync(path.join(RAIZ, f), "utf8");

  // Sin material original en git (posibles derechos de autor).
  try {
    for (const f of execSync("git ls-files", { cwd: RAIZ }).toString().split("\n"))
      if (/\.(pdf|docx?|pptx?|odt)$/i.test(f) || f.startsWith("materiales/")) mal(`derechos: material original en git: ${f}`);
  } catch { /* sin git: se omite */ }

  // Código de la app: sin recursos externos, código dinámico, credenciales ni estilos/scripts en línea (la CSP los bloquea).
  const fuentes = ["index.html", ...["js", "datos", "css"].flatMap(d => fs.readdirSync(path.join(RAIZ, d)).map(f => `${d}/${f}`))];
  for (const f of fuentes) {
    const txt = leer(f);
    if (/<(script|link|img|iframe)[^>]+(src|href)=["']?(https?:)?\/\//i.test(txt)) mal(`seguridad: ${f} carga un recurso externo`);
    if (/\beval\(|new Function\(|document\.write\(/.test(txt)) mal(`seguridad: ${f} usa eval/Function/document.write`);
    if (/(api[_-]?key|token|password|secret)\s*[:=]\s*["'][^"']{8,}/i.test(txt)) mal(`seguridad: ${f} parece contener una credencial`);
    if (/<[a-z][^>]*\sstyle=/i.test(txt)) mal(`CSP: ${f} usa style="" en el HTML (usa una clase o data-pct)`);
    if (/<[a-z][^>]*\son[a-z]+=/i.test(txt)) mal(`CSP: ${f} usa un atributo on…= (usa addEventListener / .onclick)`);
  }
  if (/<script(?![^>]*\bsrc=)[^>]*>/i.test(leer("index.html"))) mal("CSP: index.html tiene un <script> en línea");
  if (/<style\b/i.test(leer("index.html"))) mal("CSP: index.html tiene un <style> en línea");

  // Cada datos/<modulo>_udN.js debe estar enlazado en index.html (entre registro.js y app.js).
  const html = leer("index.html"), orden = s => html.indexOf(`src="${s}"`);
  for (const f of fs.readdirSync(path.join(RAIZ, "datos")).filter(f => /_ud\d+\.js$/.test(f))) {
    const i = orden(`datos/${f}`);
    if (i < 0) mal(`estructura: datos/${f} no está enlazado en index.html`);
    else if (!(i > orden("datos/registro.js") && i < orden("js/app.js"))) mal(`estructura: datos/${f} debe ir entre registro.js y app.js en index.html`);
  }

  // Lo que no se publica en Cloudflare.
  const ignorados = leer(".assetsignore").split("\n");
  for (const f of ["worker.mjs", "docs", "tests", "*.md", ".git", ".github", "jsconfig.json", "*.d.ts", ".editorconfig", ".gitattributes"])
    if (!ignorados.includes(f)) mal(`seguridad: .assetsignore no excluye ${f}`);
  if (fs.existsSync(path.join(RAIZ, "_headers"))) mal("seguridad: las cabeceras van solo en worker.mjs (SEGURIDAD), no en _headers");

  // CLAUDE.md debe seguir apuntando a AGENTS.md (una sola fuente de instrucciones para agentes).
  if (!/^@AGENTS\.md\s*$/m.test(leer("CLAUDE.md"))) mal("docs: CLAUDE.md debe importar AGENTS.md (@AGENTS.md)");
};
