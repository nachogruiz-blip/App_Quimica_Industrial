# Flujo de trabajo: de un PDF a una unidad

1. **Obtener los PDFs** del repo privado `App_Quimica_Industrial_materials` (en Claude Code:
   `add_repo` y clonar en `../App_Quimica_Industrial_materials`, al lado de este repo). Nunca copiarlos a este repo.
2. **Extraer texto**: `pdftotext -layout "archivo.pdf" -`. Las tablas, diagramas y figuras suelen ser imágenes:
   renderiza las páginas (`pdftoppm -r 110 -f N -l N -png archivo.pdf salida`) y míralas.
   Si `pdftotext` devuelve casi nada, el PDF es escaneado o de imágenes: léelo renderizado.
3. **Planificar**: apartados del PDF → secciones de la guía; fórmulas; tipos de problema de la relación de ejercicios.
   Objetivo: unas **80 preguntas por asignatura** (decisión del usuario), repartidas entre sus unidades.
   - **Si solo hay ejercicios** (sin apuntes de teoría, como TSF UD3, UD4, UD6 y FPM): la guía resume la teoría general que
     necesitan esos ejercicios, con la notación de clase. En `apuntes` se dice que no hay apuntes y qué problemas de la
     relación practicar (p. ej. «No hay apuntes de teoría de la UD3: relación de ejercicios, problemas 4–7»).
   - **Lo que no viene en los apuntes** pero ayuda (p. ej. cálculos de compresión en TSF UD7, valor eficaz en MEI) se marca
     como **ampliación**: en el título o el texto de la sección, en su `apuntes` y en el enunciado de la pregunta.
4. **Verificar fórmulas**: reproduce en node las soluciones de la relación de ejercicios con las funciones de
   `js/utilidades.js` antes de escribir preguntas numéricas, y después comprueba que cada `resolver` da la solución de
   clase con los datos de clase. Usa las mismas masas molares y constantes que los ejercicios (g = 9,8; masas redondeadas).
   Anota discrepancias en `docs/ESTADO.md`. Forma rápida de cargar una unidad en node:
   ```js
   global.window = global; const fs = require("fs"), vm = require("vm");
   for (const f of ["js/utilidades.js", "datos/registro.js", "datos/tsf_ud3.js"])
     vm.runInThisContext(fs.readFileSync(f, "utf8").replace(/^"use strict";/m, "").replace(/^const /gm, "var "));
   const q = id => UNIDADES[0].preguntas.find(p => p.id === id);
   q("tsf3-n1").resolver({ mm: 750 }); // → 99960 (solución de clase)
   ```
5. **Redactar `datos/<modulo>_udN.js`** con palabras propias, siguiendo `docs/formato_datos.md`, y añadir el `<script>` en `index.html`.
   Incluye también `parejas` y `pasos` para los juegos («Juegos» en `docs/formato_datos.md`). Si la asignatura es nueva,
   añade sus generadores de Reto rápido y Conversiones en `js/juegos.js` (`RETOS` y `CONVERSIONES`).
6. **Comprobar**: `node tests/comprobar.js` (valida formato, muestrea numéricas, responde todas en Chromium y revisa seguridad)
   y `node tests/derechos.js` (busca frases copiadas de los PDFs). Ver «Lista antes de cada commit» en `AGENTS.md`.
   El test ya comprueba que ninguna sección de guía se salga de un móvil de 320 px. Opcional: captura en móvil para revisar el aspecto.
7. **Añadir la novedad** al principio de `datos/novedades.js` (p. ej. «Nueva unidad: TSF UD7 Gases industriales»).
   **Actualizar `docs/ESTADO.md`** (hecho, pendiente, inventario, tabla de unidades) y `README.md` (tabla de contenido).
8. **Publicar**: commit en la rama de trabajo, push y PR a `main`. Fusionar solo cuando el usuario lo pida y la CI esté en
   verde; al fusionar, Cloudflare despliega solo. Comprueba que el despliegue («Workers Builds» en `main`) termina bien.
9. Pedir al usuario que revise la unidad; sus preferencias van a «Decisiones» de `docs/ESTADO.md`.
