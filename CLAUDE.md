# Guía para agentes (Claude Code y otros)

App web estática de estudio para Química Industrial (FP Grado Superior). Documentación y contenido en **español**.

## Antes de nada
1. **`docs/ESTADO.md`** — qué está hecho, qué falta, decisiones tomadas. Actualízalo al terminar.
2. `docs/flujo_trabajo.md` — cómo convertir un PDF en una unidad.
3. `docs/formato_datos.md` — esquema de guía y preguntas.
4. `docs/derechos_autor.md` — dónde están los PDFs y qué se puede publicar.

## Reglas
- Sin dependencias ni build: HTML + CSS + JS puro; debe funcionar abriendo `index.html` (file://).
- Contenido en `datos/udN.js` con `registrarUD({...})`. Ejemplo de referencia: `datos/ud_demo.js`.
- IDs de pregunta estables (`ud4-12`): nunca renumerar, el progreso del usuario se guarda por ID.
- **Nunca** subir PDFs ni copiar texto/tablas/figuras literales de los materiales.
- Cada pregunta lleva explicación; las numéricas, el desarrollo con los valores concretos.
- Tras cambios, probar con Playwright (chromium headless): sin errores de consola, numéricas autoconsistentes.
- Commits en español, push a `main`.
