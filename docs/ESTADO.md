# Estado del proyecto

> **Agente que retoma el trabajo: empieza aquí.** Actualiza este archivo al terminar cada sesión.

Última actualización: 2026-11-20

## Objetivo
App de estudio de FP Grado Superior de Química Industrial. El contexto privado (centro, usuarios) está en el repo
privado de materiales, archivo `CONTEXTO_PRIVADO.md`: no lo copies aquí.
A partir de los PDFs de cada unidad didáctica (UD) se elabora: guía de estudio, explicaciones y banco de preguntas.

## Hecho
- [x] Motor de la app (`js/app.js`): menú de 4 secciones **Estudio · Examen · Test · Ajustes** (barra inferior fija en
  móvil ≤ 700 px, en la cabecera en pantallas anchas). Examen y Test: asignatura → aleatorias o temas (unidades y
  apartados) → nº de preguntas (10/20/30/todas); Test con «solo falladas»; Examen con cronómetro; resultado con «Otra
  ronda» y «Repetir las falladas». Ajustes: tema automático/día/noche, exportar/importar/borrar progreso, cerrar sesión.
  Avisa antes de abandonar una ronda empezada. Rutas antiguas `#/ud/<id>/practicar|examen|fallos` siguen funcionando.
- [x] Tipos de pregunta: `test`, `vf`, `numerica` (datos aleatorios + desarrollo de la solución).
- [x] `js/utilidades.js`: fmt, área, Reynolds, régimen, factor 4f (Colebrook), pérdida de carga.
- [x] **TSF UD5 Flujo de fluidos** (`datos/tsf_ud5.js`): 8 secciones de guía, 40 preguntas (17 test, 8 V/F, 15 numéricas).
- [x] **TSF completa, 92 preguntas** (2026-11-20): UD3 Estática (17), UD4 Dinámica (12), UD6 Impulsión/NPSH (7) y UD7 Gases
  industriales (16). UD3, UD4 y UD6 solo tienen ejercicios: guía con teoría general y `apuntes` que remite a los problemas de
  la relación. UD7: apuntes + recursos adicionales; su sección 6 (cálculos de compresión) es ampliación. Las numéricas
  reproducen las soluciones de las relaciones de clase (comprobado).
- [x] **MEI UD4, 86 preguntas** (2026-11-20, `datos/mei_ud4.js`): 12 secciones (magnitudes, Ohm, potencia y Joule,
  Kirchhoff, asociación, CC/CA/trifásica, medida, protecciones, seguridad, generación, método y formulario); 56
  conceptuales y 30 numéricas de circuitos. El valor eficaz (V₀/√2) es ampliación. El test comprueba ahora que ninguna
  sección de guía se salga de la pantalla del móvil (tablas de más de 3–4 columnas: mejor como lista).
- [x] **FPM UD4.1, 78 preguntas** (2026-11-20, `datos/fpm_ud4.js`): disoluciones y valoraciones. Sin apuntes de teoría:
  guía de química general (7 secciones) con `apuntes` que remite a los ejercicios. 33 conceptuales y 45 numéricas que
  reproducen las soluciones de las relaciones de clase (comprobado). Masas molares redondeadas como en clase.
- [x] Comprobación automática `node tests/comprobar.js`.
- [x] Una sola pantalla de acceso en Cloudflare: `worker.mjs` expone `/__usuario` y la app usa ese usuario (sin login local);
  el login local solo aparece al abrir `index.html` en local. Recuadro de novedades al entrar (`datos/novedades.js`).
  Desplegable «💡 Explicación» con «Dónde estudiarlo» (guía en nueva pestaña, apuntes con apartado y página, ejercicios).
- [x] Login local con usuario/contraseña (`js/usuarios.js`): perfiles por navegador, modo invitado, progreso por usuario,
  exportar/importar progreso a `.json`. El test prueba el login.
- [x] Privacidad: sin referencias al centro ni a personas en el repo público (historial reescrito); el contexto privado está en
  `CONTEXTO_PRIVADO.md` del repo de materiales y `tests/derechos.js` comprueba sus «términos prohibidos».
- [x] Documentación para agentes: `AGENTS.md` es la única fuente (`CLAUDE.md` solo contiene `@AGENTS.md`) y `docs/`.
- [x] Revisión de errores, seguridad y derechos (2026-11-19): corregido el lector de respuestas numéricas (antes «45.000»
  se leía como 45 aunque la app muestra así las soluciones); `tests/comprobar.js` revisa seguridad; nuevo `tests/derechos.js`
  (0 copias ≥ 12 palabras en TSF UD5). Lista «antes de cada commit» en `AGENTS.md`.
- [x] Profesionalización (2026-11-20): CI de GitHub (`.github/workflows/comprobar.yml`: tests + tipos); test dividido en
  `tests/partes/` con semilla reproducible (`SEMILLA=n`) y nuevas comprobaciones (UD enlazadas en `index.html`, sin
  estilos/scripts en línea, cabeceras en todas las respuestas del worker, diálogo de abandonar ronda, migración de hashes);
  cabeceras solo en `worker.mjs` (`_headers` eliminado) con CSP sin `'unsafe-inline'` (barras con `data-pct`);
  tipos de los datos (`tipos.d.ts` + `jsconfig.json`); `.editorconfig` y `.gitattributes`; CSS consolidado; diálogo
  propio en vez de `confirm()`; emojis decorativos ocultos al lector de pantalla; versión en Ajustes; perfiles locales con
  PBKDF2 de 600 000 iteraciones (los antiguos se actualizan al entrar).

## Pendiente (en orden)
1. [ ] **El usuario revisa el contenido** (TSF, MEI y FPM; empezó por TSF UD5) → aplicar sus correcciones y anotar las preferencias en «Decisiones».
2. [x] TSF UD7 Gases industriales (2026-11-20).
3. [x] MEI UD4 (2026-11-20), 86 preguntas.
4. [x] TSF UD4 Dinámica de fluidos (2026-11-20), con teoría general (decisión del usuario).
5. [x] FPM UD4.1 (2026-11-20), 78 preguntas. Las tres asignaturas tienen ya unas 80–90 preguntas.
6. [ ] Publicar con acceso controlado: Cloudflare Workers con contraseña y luego repo privado. Publicada en workers.dev (2026-11-19). Acceso con `worker.mjs` (usuario/contraseña, secreto `USUARIOS`): falta que el
   usuario cree el secreto, confirmar el subdominio neutro y poner el repo en privado, siguiendo `docs/despliegue_cloudflare.md`.
   Lo hace el usuario: requiere su cuenta de Cloudflare. **No activar GitHub Pages.**
   GitHub Pages estaba activado desde `main` (copia de la app sin contraseña): el usuario lo despublicó el 2026-11-20
   (Settings → Pages → Unpublish, origen «None»; la dirección github.io da 404).
7. [x] Pulsar la pestaña activa vuelve a cargar la sección (resuelto con el nuevo menú).
8. [x] Instalable como app (PWA): `manifest.webmanifest` + `iconos/` (dibujo propio `icono.svg`; los PNG se generan
   renderizándolo con Playwright). El manifest se enlaza desde `js/app.js` solo en http(s). `worker.mjs` sirve sin
   contraseña solo esas rutas exactas (`PUBLICOS`). Ajustes → «Instalar como app» (botón en Chrome/Android e instrucciones).
   Sin service worker: no funciona sin conexión (decisión pendiente si el usuario lo pide).
9. [x] Decisiones del usuario tras la profesionalización (2026-11-20): **sin licencia**; autor de los commits = alias
   `patatasss`; secreto `USUARIOS` con hashes (`herramientas/generar_usuario.html`) y límite de intentos
   (`LIMITE_INTENTOS`, 20/min por IP). Descartados por ahora: `package.json` con Prettier/ESLint y service worker.
10. [ ] **Lo hace el usuario**: cambiar las líneas en claro del secreto `USUARIOS` por líneas con hash (paso 3 de
    `docs/despliegue_cloudflare.md`). Mientras tanto el worker sigue aceptando las antiguas.

## Inventario de materiales (repo privado `App_Quimica_Industrial_materials`)
| Archivo | Módulo | Contenido | Usado en |
|---|---|---|---|
| `U.D 5 Flujo de fluidos.pdf` | TSF 0190 | Teoría, 11 págs. | `tsf_ud5.js` ✅ |
| `Ejercicios U.D 5 Flujo de fluidos.pdf` | TSF | 9 problemas con solución | `tsf_ud5.js` ✅ (tipos n13, n15) |
| `U.D 7 Gases industriales.pdf` | TSF | Teoría compresores, 10 págs. | `tsf_ud7.js` ✅ |
| `UD7 Transporte industrial de gases.pdf` | TSF | Recursos adicionales (imágenes), 11 págs. | `tsf_ud7.js` ✅ |
| `Ejercicios U.D 3 Estática de fluidos.pdf` | TSF | Ejercicios | `tsf_ud3.js` ✅ |
| `Ejercicios U.D 4 Dinámica de fluidos.pdf` | TSF | Ejercicios con solución | `tsf_ud4.js` ✅ |
| `Ejercicios U.D 6 Elementos de impulsión.pdf` | TSF | Ejercicios (NPSH) | `tsf_ud6.js` ✅ |
| `UD 4 Máquinas Eléctricas 2526.pdf` | MEI 0191 | Teoría, 44 págs. | `mei_ud4.js` ✅ |
| `UD 4 Ejercicios teoría de circuitos.pdf` | MEI | Ejercicios | `mei_ud4.js` ✅ (sección 11 y numéricas de circuitos) |
| `Ejercicios de disoluciones.pdf` | FPM | UD4.1 Disoluciones | `fpm_ud4.js` ✅ |
| `Ejercicios valoraciones.pdf`, `Ejercicio Normalización y valoraciones (1).pdf` | FPM | Valoraciones | `fpm_ud4.js` ✅ |

## Decisiones tomadas (no reabrir sin preguntar al usuario)
| Decisión | Motivo |
|---|---|
| Web estática, sin build ni dependencias | Gratis, funciona en móvil y abriendo `index.html` |
| Hosting: Cloudflare Workers con archivos estáticos (no GitHub Pages) | Decidido por el usuario: permite controlar quién entra y dejar el repo privado. Gratis |
| Acceso: `worker.mjs` con HTTP Basic y secreto `USUARIOS`, no Cloudflare Access | Decidido por el usuario: Access pide tarjeta. Aceptar/denegar = editar el secreto |
| Contenido en `.js`, no `.json` | `fetch` no funciona con `file://` |
| PDFs en repo privado aparte; este repo público | Posibles derechos de autor (`docs/derechos_autor.md`) |
| Progreso en `localStorage`, por usuario | Sin servidor; se pasa entre dispositivos exportando/importando un `.json` |
| Login local = perfiles locales (no cuentas en la nube) | Decidido por el usuario. Solo se usa abriendo `index.html` en local y separa el progreso de cada persona en un mismo navegador; el contenido lo protege `worker.mjs` en Cloudflare |
| Contraseñas de `USUARIOS` como hash PBKDF2-SHA256 (10 000 iteraciones) + límite de intentos por IP | Decidido por el usuario (2026-11-20). Pocas iteraciones por el límite de CPU del plan gratuito (10 ms); compensado con contraseñas de ≥ 12 caracteres y el límite de intentos |
| Sin licencia | Decidido por el usuario (2026-11-20): todos los derechos reservados |
| Autor de los commits: alias `patatasss` | Decidido por el usuario (2026-11-20): nada de nombres reales en el repo |
| Nada del centro ni de personas en el repo público | Decidido por el usuario; contexto privado en el repo de materiales |
| Tres módulos: TSF (0190), MEI (0191), FPM | Decidido por el usuario; ids en `datos/registro.js` |
| Prioridad inicial: UD4, UD5, UD7; se empezó por TSF UD5 | Decidido por el usuario |
| Unas 80 preguntas por asignatura; orden TSF → MEI → FPM | Decidido por el usuario (2026-11-20) |
| Unidades sin apuntes de teoría (solo ejercicios): guía con teoría general, marcada en `apuntes` | Decidido por el usuario (2026-11-20), para FPM y aplicado también a TSF UD3, UD4 y UD6 |
| Estilo: paleta lila (acento #6d4fc2 día / #b9a4f5 noche, tonos `--lila-2`, `--lila-3`); verde/rojo solo para acierto/fallo | Decidido por el usuario (2026-11-19) |
| Emoticonos: menú 🔬 ⏱️ 🧪 ⚙️; asignaturas con `icono` en `datos/registro.js` (💧 TSF, ⚡ MEI, ⚗️ FPM) | Decidido por el usuario |
| Notación de los apuntes: g = 9,8; Re 2000/4000; «4f» = factor de Darcy; h_f = 4f(L/D)v²/2g | Coherencia con clase |
| Turbulento: 4f por Colebrook y tolerancia 10 % | En clase se lee el diagrama de Moody; las soluciones de los ejercicios difieren hasta ~12 % de Colebrook |
| Longitudes equivalentes: se dan en el enunciado | La tabla de L_eq no está en los apuntes |

## Unidades
| Módulo | UD | Título | Archivo | Secciones | Preguntas | Estado |
|---|---|---|---|---|---|---|
| TSF | UD3 | Estática de fluidos | `datos/tsf_ud3.js` | 6 | 17 | hecha (solo ejercicios + teoría general), pendiente de revisión |
| TSF | UD4 | Dinámica de fluidos | `datos/tsf_ud4.js` | 5 | 12 | hecha (solo ejercicios + teoría general), pendiente de revisión |
| TSF | UD5 | Flujo de fluidos | `datos/tsf_ud5.js` | 8 | 40 | hecha, pendiente de revisión del usuario |
| TSF | UD6 | Elementos de impulsión | `datos/tsf_ud6.js` | 3 | 7 | hecha (solo ejercicios de NPSH + teoría general), pendiente de revisión |
| TSF | UD7 | Gases industriales | `datos/tsf_ud7.js` | 6 | 16 | hecha, pendiente de revisión |
| MEI | UD4 | Identificación y caracterización de máquinas eléctricas | `datos/mei_ud4.js` | 12 | 86 | hecha, pendiente de revisión |
| FPM | UD4.1 | Disoluciones y valoraciones | `datos/fpm_ud4.js` | 7 | 78 | hecha (solo ejercicios + teoría general), pendiente de revisión |
