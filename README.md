# App_Quimica_Industrial

App de estudio para asignaturas del Grado Superior de Química Industrial: **guía de estudio**,
**banco de preguntas** (test, verdadero/falso y problemas numéricos con datos aleatorios),
**modo examen** y **repaso de fallos**. Web estática: funciona abriendo `index.html` o publicada en Cloudflare con usuario y contraseña (no se usa GitHub Pages).

## Contenido
| Módulo | Unidades |
|---|---|
| Transporte de sólidos y fluidos (0190) | UD5 Flujo de fluidos |
| Mantenimiento electromecánico (0191) | próximamente |
| Formulación y preparación de mezclas | próximamente |

## Uso
- Local: abre `index.html` en el navegador.
- Online con acceso solo para personas autorizadas (usuario y contraseña): Cloudflare Workers, ver
  [`docs/despliegue_cloudflare.md`](docs/despliegue_cloudflare.md).

Menú con cuatro secciones (en el móvil, botones en la parte inferior; en el ordenador, en la barra de arriba):
- **Estudio**: asignatura → unidad → guía de estudio.
- **Examen**: asignatura → preguntas aleatorias o de temas/apartados elegidos → nota y tiempo al final.
- **Test**: igual, pero corrige y explica cada pregunta; opción «solo las que he fallado».
- **Ajustes**: modo día/noche, exportar/importar progreso, cerrar sesión, novedades.

En Cloudflare se entra con el usuario y la contraseña del secreto `USUARIOS`. Abriendo `index.html` en local se crea un
usuario local (o se entra como invitado). El progreso se guarda solo en ese navegador (localStorage): se mantiene al
cerrarlo, pero se pierde si se borran los datos de navegación. Para pasarlo a otro dispositivo: *Ajustes → Exportar
progreso* (archivo `.json`) e *Importar progreso* en el otro.

## Documentación
Para retomar el trabajo (personas o agentes de IA): [`CLAUDE.md`](CLAUDE.md) y [`docs/ESTADO.md`](docs/ESTADO.md).

## Estructura
```
index.html          carga los datos y la app
_headers            cabeceras de seguridad para Cloudflare
worker.mjs          en Cloudflare, pide usuario y contraseña antes de servir la app (secreto USUARIOS)
wrangler.jsonc      configuración de Cloudflare (Workers con archivos estáticos)
.assetsignore       lo que NO se publica (docs, tests, .md, .git)
css/estilos.css     estilos (claro/oscuro)
js/app.js           motor: menú (Estudio, Examen, Test, Ajustes), guía, rondas de preguntas, progreso
js/utilidades.js    funciones de cálculo compartidas (Reynolds, 4f, …)
js/usuarios.js      login local (usuario/contraseña con hash), progreso por usuario, importar
datos/registro.js   módulos y registro de unidades
datos/novedades.js  novedades que se muestran al entrar (la más reciente primero)
datos/<mod>_udN.js  contenido de cada unidad didáctica (guía + preguntas)
tests/comprobar.js  comprobación automática: errores y seguridad (node tests/comprobar.js)
tests/derechos.js   busca copias literales de los PDFs (node tests/derechos.js)
docs/               documentación del proyecto (estado, formato, flujo, derechos)
materiales/         PDFs originales — ignorado por git, NO se sube
```

## Derechos de autor
Los PDFs originales no se suben al repositorio. Todo el contenido de `datos/` es elaboración propia
(resúmenes, explicaciones y preguntas redactadas de nuevo), sin copiar texto, tablas ni imágenes literales.
