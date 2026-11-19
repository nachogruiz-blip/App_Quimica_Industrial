# Guía para agentes (Claude Code y otros)

App web estática de estudio para Química Industrial (FP Grado Superior). Documentación y contenido en **español**.

## Antes de nada
1. **`docs/ESTADO.md`** — qué está hecho, qué falta, decisiones tomadas. Actualízalo al terminar.
2. `docs/flujo_trabajo.md` — cómo convertir un PDF en una unidad.
3. `docs/formato_datos.md` — esquema de guía y preguntas.
4. `docs/derechos_autor.md` — dónde están los PDFs y qué se puede publicar.
5. `docs/despliegue_cloudflare.md` — cómo se publica la app y quién puede entrar (Cloudflare Access).

## Reglas
- Sin dependencias ni build: HTML + CSS + JS puro; debe funcionar abriendo `index.html` (file://).
- Contenido en `datos/<modulo>_udN.js` con `registrarUD({...})`. Ejemplo de referencia: `datos/tsf_ud5.js`.
- PDFs fuente: repo privado `App_Quimica_Industrial_materials` (ver `docs/flujo_trabajo.md`).
- Seguir la notación de los apuntes de clase (ver «Decisiones» en `docs/ESTADO.md`).
- IDs de pregunta estables (`tsf5-12`, `tsf5-n3`): nunca renumerar, el progreso del usuario se guarda por ID.
- **Nunca** subir PDFs ni copiar texto/tablas/figuras literales de los materiales.
- Cada pregunta lleva explicación; las numéricas, el desarrollo con los valores concretos.
- Tras cambios: `node tests/comprobar.js` debe terminar en «✅ Todo correcto».
- Commits en español, push a `main` (si la sesión indica otra rama, usa esa y avisa al usuario).

## Revisiones obligatorias antes de cada commit
Trata este repo como **público**: aunque pase a privado y la app se sirva tras Cloudflare Access
(`docs/despliegue_cloudflare.md`), puede volver a abrirse. No actives GitHub Pages; no toques `_headers` sin motivo.

**Errores**
- `node tests/comprobar.js` → «✅ Todo correcto» (formato, numéricas, respuestas en Chromium, lector de números, seguridad).
- Revisa a mano lo que el test no ve: que las explicaciones sean correctas y que los rangos de `variables` sean realistas.

**Seguridad** (`tests/comprobar.js` comprueba lo automatizable)
- Nada de recursos externos (CDN, fuentes, analítica, iframes): la app es 100 % local (además, la CSP de `_headers` lo bloquea).
- Nada de `eval`, `new Function`, `document.write`. `innerHTML` solo con contenido propio de `datos/`; **nunca** con texto
  que venga del usuario, de la URL (`location.hash`) o de `localStorage` (escápalo o usa `textContent`).
- Ningún secreto, token ni dato personal (nombre, correo, centro, notas) en el código, la documentación ni los commits.
- El progreso solo vive en `localStorage` del navegador: no añadir servidores ni envío de datos sin preguntar al usuario.
- Login (`js/usuarios.js`): las contraseñas nunca se guardan en claro (hash con sal); el nombre de usuario se pinta con
  `textContent`. No presentar el login como protección del contenido: la app es pública. El test de login debe seguir pasando.

**Derechos de autor**
- `git ls-files` no debe contener PDFs ni `materiales/` (lo comprueba `tests/comprobar.js`).
- `node tests/derechos.js` (necesita el repo de materiales clonado al lado y `pdftotext`) → «✅ Sin copias literales ni términos privados» (también busca el centro y nombres listados en `CONTEXTO_PRIVADO.md` del repo privado).
  Los avisos ⚠️ de frases técnicas cortas son aceptables; los ❌ (≥ 12 palabras seguidas iguales) hay que redactarlos de nuevo.
- No copiar enunciados, tablas, figuras ni capturas de los PDFs; no enlazar los PDFs ni el repo privado desde la app (`index.html`, `datos/`).
- Si dudas de si algo se puede publicar, pregunta al usuario antes de hacer push.
