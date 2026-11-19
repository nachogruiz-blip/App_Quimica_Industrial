# Guía para agentes

App web estática de estudio (Química Industrial, FP Grado Superior). Documentación y contenido en **español**.

## Reglas
- Sin dependencias ni build: HTML + CSS + JS puro; debe funcionar abriendo `index.html` (file://).
- Contenido en `datos/udN.js` con `registrarUD({...})` (no JSON: file:// no permite fetch). Formato de
  ejemplo en `datos/ud_demo.js`. Tipos de pregunta: `test`, `vf`, `numerica` (variables aleatorias + `resolver`).
- IDs de pregunta estables (`ud4-12`): el progreso del usuario se guarda por ID.
- **Derechos de autor**: nunca subir los PDFs (`materiales/` está en .gitignore) ni copiar texto, tablas o
  figuras literales; redactar con palabras propias. Datos físicos (cp, constantes) sí se pueden usar.
- Cada pregunta lleva explicación; las numéricas, el desarrollo con los valores concretos.
- Probar con Playwright (chromium headless) que no hay errores de consola tras cambios.
