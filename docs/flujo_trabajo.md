# Flujo de trabajo: de un PDF a una unidad

1. **Obtener los PDFs** del repo privado `App_Quimica_Industrial_materials` (en Claude Code:
   `add_repo` y clonar en `../App_Quimica_Industrial_materials`, al lado de este repo). Nunca copiarlos a este repo.
2. **Extraer texto**: `pdftotext -layout "archivo.pdf" -`. Las tablas, diagramas y figuras suelen ser imágenes:
   renderiza las páginas (`pdftoppm -r 110 -f N -l N -png archivo.pdf salida`) y míralas.
   Si `pdftotext` devuelve casi nada, el PDF es escaneado o de imágenes: léelo renderizado.
3. **Planificar**: apartados del PDF → secciones de la guía; fórmulas; tipos de problema de la relación de ejercicios.
4. **Verificar fórmulas**: reproduce en node 3–4 soluciones de la relación de ejercicios con las funciones de
   `js/utilidades.js` antes de escribir preguntas numéricas. Anota discrepancias en `docs/ESTADO.md`.
5. **Redactar `datos/<modulo>_udN.js`** con palabras propias, siguiendo `docs/formato_datos.md`, y añadir el `<script>` en `index.html`.
6. **Comprobar**: `node tests/comprobar.js` (valida formato, muestrea numéricas, responde todas en Chromium y revisa seguridad)
   y `node tests/derechos.js` (busca frases copiadas de los PDFs). Ver «Revisiones obligatorias» en `CLAUDE.md`.
   Opcional: captura en móvil (390×844) para revisar el aspecto.
7. **Actualizar `docs/ESTADO.md`** (hecho, pendiente, inventario, tabla de unidades) y commit + push a `main`.
8. Pedir al usuario que revise la unidad; sus preferencias van a «Decisiones» de `docs/ESTADO.md`.
