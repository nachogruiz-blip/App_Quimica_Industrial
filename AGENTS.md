# Guía para agentes (Claude Code, Codex y otros)

App web estática de estudio para Química Industrial (FP Grado Superior): guía de estudio, banco de preguntas, examen y
test. Todo el contenido y la documentación van en **español**. `CLAUDE.md` solo importa este archivo: edita aquí.

## Comandos
| Para qué | Comando |
|---|---|
| Comprobar la app (obligatorio tras cualquier cambio) | `node tests/comprobar.js` → «✅ Todo correcto» |
| Repetir una ejecución que falló | `SEMILLA=<n> node tests/comprobar.js` (la semilla sale en el error) |
| Tipos de los datos (si hay TypeScript a mano; la CI lo hace siempre) | `npx tsc -p jsconfig.json` |
| Copias literales de los PDFs (necesita el repo de materiales al lado y `pdftotext`) | `node tests/derechos.js` |
| Ver la app | abrir `index.html` en el navegador (`file://`, sin servidor) |

La CI (`.github/workflows/comprobar.yml`) ejecuta los tests y los tipos en cada push y PR. Publicar = fusionar el PR en
`main` (cuando el usuario lo pida y la CI esté en verde): Cloudflare despliega solo (`docs/despliegue_cloudflare.md`).

## Arquitectura en breve
- `index.html` carga scripts clásicos en orden: `js/utilidades.js` → `js/usuarios.js` → `datos/registro.js` →
  `datos/novedades.js` → `datos/<modulo>_udN.js` → `js/app.js`. No hay módulos ES ni `fetch` de datos: con `file://` no funcionan.
- `js/app.js`: router por hash y vistas (Estudio, Examen, Test, Ajustes). `js/usuarios.js`: perfiles locales y progreso
  en `localStorage`. `worker.mjs`: en Cloudflare pide usuario y contraseña (hashes PBKDF2 en el secreto `USUARIOS`, límite de
  intentos por IP) y pone las cabeceras de seguridad (CSP incluida). `herramientas/generar_usuario.html` genera las
  líneas de `USUARIOS`.
- Tipos de los datos en `tipos.d.ts` (comprobados con `jsconfig.json`); esquema explicado en `docs/formato_datos.md`.

## Antes de empezar
1. **`docs/ESTADO.md`**: qué está hecho, qué falta y decisiones tomadas (no reabrirlas sin preguntar). Actualízalo al terminar.
2. `docs/flujo_trabajo.md` (PDF → unidad), `docs/formato_datos.md` (esquema), `docs/derechos_autor.md` (qué se puede
   publicar), `docs/despliegue_cloudflare.md` (publicación y acceso).

## Reglas
- **Sin dependencias ni build en la app**: HTML + CSS + JS puro que funcione abriendo `index.html`. Las herramientas de
  la CI (Playwright, TypeScript) no forman parte de la app.
- Contenido en `datos/<modulo>_udN.js` con `registrarUD({...})`, enlazado en `index.html` (el test lo exige). Ejemplo de
  referencia: `datos/tsf_ud5.js`. PDFs fuente en el repo privado `App_Quimica_Industrial_materials`.
- Seguir la notación de los apuntes de clase («Decisiones» en `docs/ESTADO.md`). Unidades sin apuntes de teoría: teoría
  general y `apuntes` que remite a los ejercicios; lo que no viene en los apuntes se marca como ampliación
  (`docs/flujo_trabajo.md`, paso 3).
- **IDs de pregunta estables** (`tsf5-12`, `tsf5-n3`): nunca renumerar ni reutilizar; el progreso se guarda por ID.
- Cada pregunta lleva `explicacion` y `seccion`; las numéricas, el desarrollo con los valores concretos. Cada sección de
  la guía lleva `apuntes` (dónde está en los apuntes) para «Dónde estudiarlo».
- **Novedades**: todo cambio que note el usuario (unidad nueva, función nueva, cambio de uso) añade una entrada AL
  PRINCIPIO de `datos/novedades.js` (id = fecha, título, 2–4 puntos sencillos). No cambies ids publicados. La primera
  entrada es también la «versión» que se ve en Ajustes.
- Estilo de código: el de `.editorconfig` (2 espacios, LF, UTF-8). Comentarios y nombres en español.
- **Git**: trabaja en la rama que indique la sesión (si no indica ninguna, crea una) y avisa al usuario; `main` despliega
  en producción. Commits en español, en imperativo y con una línea de resumen clara. Autor de los commits: el alias
  neutro `patatasss` (`git config user.name patatasss && git config user.email patatasss@noreply.invalid`), nunca un
  nombre o correo reales.
- **Sin licencia** (decisión del usuario): no añadas `LICENSE` ni avisos de licencia.

## Lista antes de cada commit
Trata este repo como **público**: aunque sea privado y la app se sirva con contraseña, puede volver a abrirse.

**Errores**
- [ ] `node tests/comprobar.js` → «✅ Todo correcto» (login, datos, estructura, respuestas en Chromium, navegación,
  modo Cloudflare con la CSP real y control de acceso).
- [ ] Revisado a mano lo que el test no ve: explicaciones correctas y rangos de `variables` realistas.

**Seguridad** (el test comprueba lo automatizable)
- [ ] Nada de recursos externos (CDN, fuentes, analítica, iframes): la app es 100 % local.
- [ ] Nada de `eval`, `new Function`, `document.write`, ni `style="…"`, `on…="…"` o `<script>`/`<style>` en línea: la CSP
  (sin `'unsafe-inline'`) los bloquea. Anchuras dinámicas con `data-pct`, estilos con clases.
- [ ] `innerHTML` solo con contenido propio de `datos/`; **nunca** con texto del usuario, de la URL (`location.hash`) o de
  `localStorage` (usa `textContent`).
- [ ] Ningún secreto, token ni dato personal (nombre, correo, centro, notas) en código, documentación ni commits.
- [ ] El progreso solo vive en `localStorage`: no añadir servidores ni envío de datos sin preguntar al usuario.
- [ ] Login local (`js/usuarios.js`): contraseñas solo como hash con sal (PBKDF2); nombre de usuario con `textContent`.
  Separa el progreso de cada persona; no es la protección del contenido (esa es `worker.mjs`).
- [ ] No tocar sin motivo `worker.mjs`, `.assetsignore` ni `wrangler.jsonc`: deciden qué se publica, quién entra y con
  qué cabeceras (única fuente: `SEGURIDAD` en `worker.mjs`). `worker.mjs` debe fallar cerrado: sin el secreto `USUARIOS`
  no entra nadie. Nunca escribas contraseñas ni líneas de `USUARIOS` reales en el repo. No activar GitHub Pages.

**Derechos de autor**
- [ ] Sin PDFs ni `materiales/` en `git ls-files` (lo comprueba el test).
- [ ] `node tests/derechos.js` → «✅ Sin copias literales ni términos privados» (también busca el centro y los nombres de
  `CONTEXTO_PRIVADO.md` del repo privado). Avisos ⚠️ de frases técnicas cortas: aceptables. ❌ (≥ 12 palabras seguidas
  iguales): redactar de nuevo.
- [ ] Sin enunciados, tablas, figuras ni capturas copiadas de los PDFs; sin enlaces a los PDFs ni al repo privado desde
  la app (`index.html`, `datos/`).
- [ ] Si dudas de si algo se puede publicar, pregunta al usuario antes de hacer push.
