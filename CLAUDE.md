# Guía para agentes (Claude Code y otros)

App web estática de estudio para Química Industrial (FP Grado Superior). Documentación y contenido en **español**.

## Antes de nada
1. **`docs/ESTADO.md`** — qué está hecho, qué falta, decisiones tomadas. Actualízalo al terminar.
2. `docs/flujo_trabajo.md` — cómo convertir un PDF en una unidad.
3. `docs/formato_datos.md` — esquema de guía y preguntas.
4. `docs/derechos_autor.md` — dónde están los PDFs y qué se puede publicar.

## Reglas
- Sin dependencias ni build: HTML + CSS + JS puro; debe funcionar abriendo `index.html` (file://).
- Contenido en `datos/<modulo>_udN.js` con `registrarUD({...})`. Ejemplo de referencia: `datos/tsf_ud5.js`.
- PDFs fuente: repo privado `App_Quimica_Industrial_materials` (ver `docs/flujo_trabajo.md`).
- Seguir la notación de los apuntes de clase (ver «Decisiones» en `docs/ESTADO.md`).
- IDs de pregunta estables (`tsf5-12`, `tsf5-n3`): nunca renumerar, el progreso del usuario se guarda por ID.
- **Nunca** subir PDFs ni copiar texto/tablas/figuras literales de los materiales.
- Cada pregunta lleva explicación; las numéricas, el desarrollo con los valores concretos.
- Tras cambios: `node tests/comprobar.js` debe terminar en «✅ Todo correcto».
- Commits en español, push a `main`.
