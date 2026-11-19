# Estado del proyecto

> **Agente que retoma el trabajo: empieza aquí.** Actualiza este archivo al terminar cada sesión.

Última actualización: 2026-11-19

## Objetivo
App de estudio de FP Grado Superior de Química Industrial. A partir de los PDFs
de cada unidad didáctica (UD) se elabora: guía de estudio, explicaciones y banco de preguntas para practicar.

## Hecho
- [x] Motor de la app (`js/app.js`): guía, práctica, examen (10 preguntas), repaso de fallos, progreso local.
- [x] Tipos de pregunta: `test`, `vf`, `numerica` (datos aleatorios + desarrollo de la solución).
- [x] Unidad de demostración `datos/ud_demo.js` (formato de referencia).
- [x] Documentación para agentes (`CLAUDE.md`, `AGENTS.md`, `docs/`).

## Pendiente (en orden)
1. [ ] Recibir los PDFs de **UD4, UD5 y UD7** (los nombres de cada unidad están en los PDFs).
2. [ ] Elaborar la primera UD completa y que el usuario la revise antes de seguir.
3. [ ] Resto de UDs con el formato validado.
4. [ ] Borrar `datos/ud_demo.js` y su `<script>` en `index.html` cuando haya UDs reales.
5. [ ] Activar GitHub Pages (Settings → Pages → main / root) — lo hace el usuario.

## Decisiones tomadas (no reabrir sin preguntar al usuario)
| Decisión | Motivo |
|---|---|
| Web estática, sin build ni dependencias | Gratis en GitHub Pages, funciona en móvil y abriendo `index.html` |
| Contenido en `.js`, no `.json` | `fetch` no funciona con `file://` |
| PDFs fuera de este repo | Posibles derechos de autor (ver `docs/derechos_autor.md`) |
| Progreso en `localStorage` | Un único usuario; sin servidor |
| Idioma: español; identificadores de código en español o inglés indistintamente | Usuario hispanohablante |

## Unidades
| UD | Título | Archivo | Secciones guía | Preguntas | Estado |
|---|---|---|---|---|---|
| UD4 | (por determinar al leer el PDF) | `datos/ud4.js` | – | – | sin empezar |
| UD5 | (por determinar) | `datos/ud5.js` | – | – | sin empezar |
| UD7 | (por determinar) | `datos/ud7.js` | – | – | sin empezar |
