// Comprobación de derechos de autor: busca frases copiadas literalmente de los PDFs en datos/*.js.
// Uso: node tests/derechos.js [carpeta_materiales]   (por defecto ../App_Quimica_Industrial_materials)
// Requiere pdftotext (poppler-utils) y el repo privado de materiales clonado. Sin dependencias npm.
// Falla si algún fragmento de ≥ 12 palabras seguidas coincide con un PDF; avisa de los de 8–11 (frases técnicas cortas suelen ser inevitables).
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
const raiz = path.resolve(__dirname, "..");
const mat = path.resolve(process.argv[2] || ["App_Quimica_Industrial_materials", "app_quimica_industrial_materials"]
  .map(d => path.join(raiz, "..", d)).find(d => fs.existsSync(d)) || path.join(raiz, "..", "App_Quimica_Industrial_materials"));
const N = 8, LIMITE = 12;

if (!fs.existsSync(mat)) { console.log(`⚠️  No encuentro los materiales en ${mat}: comprobación omitida.`); process.exit(0); }
const toks = t => t.replace(/<[^>]+>/g, " ").normalize("NFKC").toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];

const fuente = new Map(); // n-grama → nombre del PDF
for (const pdf of fs.readdirSync(mat).filter(f => f.toLowerCase().endsWith(".pdf"))) {
  let texto = "";
  try { texto = execFileSync("pdftotext", ["-q", path.join(mat, pdf), "-"]).toString(); }
  catch { console.log("⚠️  pdftotext no disponible: comprobación omitida."); process.exit(0); }
  const t = toks(texto);
  for (let i = 0; i + N <= t.length; i++) fuente.set(t.slice(i, i + N).join(" "), pdf);
}

let graves = 0;
for (const f of fs.readdirSync(path.join(raiz, "datos")).filter(f => f.endsWith(".js"))) {
  const t = toks(fs.readFileSync(path.join(raiz, "datos", f), "utf8"));
  const tramos = [];
  for (let i = 0; i + N <= t.length; i++) {
    const pdf = fuente.get(t.slice(i, i + N).join(" "));
    if (!pdf) continue;
    const ult = tramos[tramos.length - 1];
    if (ult && i <= ult.fin) ult.fin = i + N; else tramos.push({ ini: i, fin: i + N, pdf });
  }
  for (const r of tramos) {
    const largo = r.fin - r.ini, grave = largo >= LIMITE;
    if (grave) graves++;
    console.log(`${grave ? "❌" : "⚠️ "} ${f} ↔ «${r.pdf}» (${largo} palabras): ${t.slice(r.ini, r.fin).join(" ")}`);
  }
}
// Privacidad: términos prohibidos (centro, nombres) definidos en el repo privado, para no escribirlos aquí.
const ctx = path.join(mat, "CONTEXTO_PRIVADO.md");
if (fs.existsSync(ctx)) {
  const md = fs.readFileSync(ctx, "utf8").split(/^## Términos prohibidos.*$/m)[1] || "";
  const terminos = [...md.matchAll(/^- (.+)$/gm)].map(m => m[1].trim().toLowerCase()).filter(Boolean);
  const rastreados = execFileSync("git", ["ls-files"], { cwd: raiz }).toString().split("\n").filter(Boolean);
  for (const f of rastreados) {
    const txt = fs.readFileSync(path.join(raiz, f), "utf8").toLowerCase();
    for (const t of terminos) if (txt.includes(t)) { graves++; console.log(`❌ ${f}: contiene un término privado («${t}»)`); }
  }
} else console.log("⚠️  Sin CONTEXTO_PRIVADO.md: no se comprueban términos privados.");

if (graves) { console.error(`❌ ${graves} problema(s): copias literales (redáctalas de nuevo) o términos privados (quítalos).`); process.exit(1); }
console.log("✅ Sin copias literales ni términos privados");
