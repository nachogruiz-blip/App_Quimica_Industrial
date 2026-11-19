# Estado del proyecto

> **Agente que retoma el trabajo: empieza aquí.** Actualiza este archivo al terminar cada sesión.

Última actualización: 2026-11-19

## Objetivo
App de estudio de FP Grado Superior de Química Industrial. El contexto privado (centro, usuarios) está en el repo
privado de materiales, archivo `CONTEXTO_PRIVADO.md`: no lo copies aquí.
A partir de los PDFs de cada unidad didáctica (UD) se elabora: guía de estudio, explicaciones y banco de preguntas.

## Hecho
- [x] Motor de la app (`js/app.js`): inicio por módulos, guía, práctica (20 preg.), examen (10), repaso de fallos, progreso local.
- [x] Tipos de pregunta: `test`, `vf`, `numerica` (datos aleatorios + desarrollo de la solución).
- [x] `js/utilidades.js`: fmt, área, Reynolds, régimen, factor 4f (Colebrook), pérdida de carga.
- [x] **TSF UD5 Flujo de fluidos** (`datos/tsf_ud5.js`): 8 secciones de guía, 40 preguntas (17 test, 8 V/F, 15 numéricas).
- [x] Comprobación automática `node tests/comprobar.js`.
- [x] Login local con usuario/contraseña (`js/usuarios.js`): perfiles por navegador, modo invitado, progreso por usuario,
  exportar/importar progreso a `.json`. El test prueba el login.
- [x] Privacidad: sin referencias al centro ni a personas en el repo público (historial reescrito); el contexto privado está en
  `CONTEXTO_PRIVADO.md` del repo de materiales y `tests/derechos.js` comprueba sus «términos prohibidos».
- [x] Documentación para agentes (`CLAUDE.md`, `AGENTS.md`, `docs/`).
- [x] Revisión de errores, seguridad y derechos (2026-11-19): corregido el lector de respuestas numéricas (antes «45.000»
  se leía como 45 aunque la app muestra así las soluciones); `tests/comprobar.js` revisa seguridad; nuevo `tests/derechos.js`
  (0 copias ≥ 12 palabras en TSF UD5). Sección «Revisiones obligatorias» en `CLAUDE.md`.

## Pendiente (en orden)
1. [ ] **El usuario revisa TSF UD5** → aplicar sus correcciones y anotar las preferencias en «Decisiones».
2. [ ] TSF UD7 Gases industriales (teoría + recursos adicionales; el PDF «UD7 Transporte industrial de gases» es casi todo imágenes: leer renderizando páginas).
3. [ ] MEI UD4 Máquinas eléctricas (44 págs.) + ejercicios de teoría de circuitos.
4. [ ] TSF UD4 Dinámica de fluidos: solo hay ejercicios; la guía se redacta a partir de ellos (continuidad, Bernoulli). Confirmar con el usuario si quiere teoría.
5. [ ] Resto de material disponible (ver inventario): TSF UD3, UD6; FPM disoluciones/valoraciones.
6. [ ] Publicar con acceso controlado: Cloudflare Pages + Access y luego repo privado, siguiendo `docs/despliegue_cloudflare.md`.
   Lo hace el usuario: requiere su cuenta de Cloudflare. **No activar GitHub Pages.**
7. [ ] (Menor) Pulsar la pestaña activa (p. ej. «Practicar» estando en Practicar) no reinicia la ronda, porque el hash no cambia.

## Inventario de materiales (repo privado `App_Quimica_Industrial_materials`)
| Archivo | Módulo | Contenido | Usado en |
|---|---|---|---|
| `U.D 5 Flujo de fluidos.pdf` | TSF 0190 | Teoría, 11 págs. | `tsf_ud5.js` ✅ |
| `Ejercicios U.D 5 Flujo de fluidos.pdf` | TSF | 9 problemas con solución | `tsf_ud5.js` ✅ (tipos n13, n15) |
| `U.D 7 Gases industriales.pdf` | TSF | Teoría compresores, 10 págs. | pendiente |
| `UD7 Transporte industrial de gases.pdf` | TSF | Recursos adicionales (imágenes), 11 págs. | pendiente |
| `Ejercicios U.D 3 Estática de fluidos.pdf` | TSF | Ejercicios | pendiente |
| `Ejercicios U.D 4 Dinámica de fluidos.pdf` | TSF | Ejercicios con solución | pendiente |
| `Ejercicios U.D 6 Elementos de impulsión.pdf` | TSF | Ejercicios (NPSH) | pendiente |
| `UD 4 Máquinas Eléctricas 2526.pdf` | MEI 0191 | Teoría, 44 págs. | pendiente |
| `UD 4 Ejercicios teoría de circuitos.pdf` | MEI | Ejercicios | pendiente |
| `Ejercicios de disoluciones.pdf` | FPM | UD4.1 Disoluciones | pendiente |
| `Ejercicios valoraciones.pdf`, `Ejercicio Normalización y valoraciones (1).pdf` | FPM | Valoraciones | pendiente |

## Decisiones tomadas (no reabrir sin preguntar al usuario)
| Decisión | Motivo |
|---|---|
| Web estática, sin build ni dependencias | Gratis, funciona en móvil y abriendo `index.html` |
| Hosting: Cloudflare Pages + Cloudflare Access (no GitHub Pages) | Decidido por el usuario: controla quién entra (lista de correos) y deja el repo privado. Gratis hasta 50 usuarios |
| Contenido en `.js`, no `.json` | `fetch` no funciona con `file://` |
| PDFs en repo privado aparte; este repo público | Posibles derechos de autor (`docs/derechos_autor.md`) |
| Progreso en `localStorage`, por usuario | Sin servidor; se pasa entre dispositivos exportando/importando un `.json` |
| Login = perfiles locales (no cuentas en la nube) | Decidido por el usuario. No protege el contenido (la app es pública), solo separa el progreso de cada persona en un mismo navegador |
| Nada del centro ni de personas en el repo público | Decidido por el usuario; contexto privado en el repo de materiales |
| Tres módulos: TSF (0190), MEI (0191), FPM | Decidido por el usuario; ids en `datos/registro.js` |
| Prioridad inicial: UD4, UD5, UD7; se empezó por TSF UD5 | Decidido por el usuario |
| Notación de los apuntes: g = 9,8; Re 2000/4000; «4f» = factor de Darcy; h_f = 4f(L/D)v²/2g | Coherencia con clase |
| Turbulento: 4f por Colebrook y tolerancia 10 % | En clase se lee el diagrama de Moody; las soluciones de los ejercicios difieren hasta ~12 % de Colebrook |
| Longitudes equivalentes: se dan en el enunciado | La tabla de L_eq no está en los apuntes |

## Unidades
| Módulo | UD | Título | Archivo | Secciones | Preguntas | Estado |
|---|---|---|---|---|---|---|
| TSF | UD5 | Flujo de fluidos | `datos/tsf_ud5.js` | 8 | 40 | hecha, pendiente de revisión del usuario |
| TSF | UD7 | Gases industriales | `datos/tsf_ud7.js` | – | – | sin empezar |
| MEI | UD4 | Máquinas eléctricas | `datos/mei_ud4.js` | – | – | sin empezar |
