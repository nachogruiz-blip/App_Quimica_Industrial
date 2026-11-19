# App_Quimica_Industrial

App de estudio para asignaturas del Grado Superior de Química Industrial: **guía de estudio**,
**banco de preguntas** (test, verdadero/falso y problemas numéricos con datos aleatorios),
**modo examen** y **repaso de fallos**. Web estática: funciona abriendo `index.html` o desde GitHub Pages.

## Contenido
| Módulo | Unidades |
|---|---|
| Transporte de sólidos y fluidos (0190) | UD5 Flujo de fluidos |
| Mantenimiento electromecánico (0191) | próximamente |
| Formulación y preparación de mezclas | próximamente |

## Uso
- Local: abre `index.html` en el navegador.
- Online: *Settings → Pages → Deploy from branch → main / (root)*.

El progreso se guarda en el navegador (localStorage).

## Documentación
Para retomar el trabajo (personas o agentes de IA): [`CLAUDE.md`](CLAUDE.md) y [`docs/ESTADO.md`](docs/ESTADO.md).

## Estructura
```
index.html          carga los datos y la app
css/estilos.css     estilos (claro/oscuro)
js/app.js           motor: guía, práctica, examen, fallos, progreso
js/utilidades.js    funciones de cálculo compartidas (Reynolds, 4f, …)
datos/registro.js   módulos y registro de unidades
datos/<mod>_udN.js  contenido de cada unidad didáctica (guía + preguntas)
tests/comprobar.js  comprobación automática (node tests/comprobar.js)
docs/               documentación del proyecto (estado, formato, flujo, derechos)
materiales/         PDFs originales — ignorado por git, NO se sube
```

## Derechos de autor
Los PDFs originales no se suben al repositorio. Todo el contenido de `datos/` es elaboración propia
(resúmenes, explicaciones y preguntas redactadas de nuevo), sin copiar texto, tablas ni imágenes literales.
