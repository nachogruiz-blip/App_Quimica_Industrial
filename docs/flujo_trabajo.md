# Flujo de trabajo: de un PDF a una unidad

1. **Obtener el PDF.** Los PDFs NO están en este repo (ver `docs/derechos_autor.md`). Se colocan en
   `materiales/` (ignorado por git), sea subidos por el usuario al chat o clonados del repo privado de materiales
   si existe (ver ese documento).
2. **Extraer texto**: `pdftotext -layout materiales/UD4.pdf -` (o `pypdf`). Si está escaneado, OCR
   (`ocrmypdf` / `tesseract -l spa`) y revisar fórmulas a mano.
3. **Planificar**: listar apartados del PDF → secciones de la guía; anotar fórmulas, definiciones y tipos de problema.
4. **Redactar `datos/udN.js`** con palabras propias (nada literal), siguiendo `docs/formato_datos.md`.
5. **Probar** con Playwright (Chromium ya instalado en el entorno de Claude Code):
   abrir `file://…/index.html#/ud/udN/practicar`, responder todas las preguntas y comprobar que no hay
   errores de consola y que las numéricas aceptan su propia solución.
6. **Actualizar `docs/ESTADO.md`** (tabla de unidades y pendientes) y hacer commit + push a `main`.
7. Pedir al usuario que revise la unidad y anotar sus correcciones de estilo en `docs/ESTADO.md` → «Decisiones».
