# Publicar la app con acceso controlado (Cloudflare Workers + usuario y contraseña)

Objetivo: que **solo las personas que tú autorices** puedan abrir la app, y que el repo de GitHub pueda ser
**privado**. Sustituye a GitHub Pages, que siempre publica en abierto.

**Coste: 0 €** (comprobado en noviembre de 2026):
- Cloudflare Workers / Pages, plan gratuito: más que suficiente para una web estática pequeña como esta.
- El control de acceso con `worker.mjs` entra en el plan gratuito de Workers (100 000 peticiones al día) y **no pide tarjeta**.
- Cloudflare Access (alternativa) es gratis hasta 50 usuarios, pero pide tarjeta.

> Los menús de Cloudflare cambian de nombre a menudo: si algo no aparece exactamente así, busca la opción equivalente.
> **Privacidad:** el nombre del proyecto y el del equipo forman parte de las URLs. Usa nombres neutros
> (p. ej. `estudio-qi`), sin tu nombre ni el del centro.

## 1. Crear la cuenta
1. Entra en `dash.cloudflare.com` y crea una cuenta gratuita (correo y contraseña). Activa la verificación en dos pasos.

## 2. Publicar la app (Cloudflare Workers con archivos estáticos)
Está hecho así (noviembre de 2026): *Workers & Pages → Create → Import a repository* con el repo `App_Quimica_Industrial`.
Cloudflare ejecuta `npx wrangler deploy` en cada push a `main`. La configuración está en el repo:
- `worker.mjs`: pide usuario y contraseña antes de servir nada (ver paso 3) y pone las cabeceras de seguridad (CSP sin
  `'unsafe-inline'`, etc.) en todas las respuestas. Es la única fuente de cabeceras: no hay archivo `_headers`.
- `wrangler.jsonc`: nombre `app-quimica-industrial`, ejecuta `worker.mjs` antes que los archivos, sirve la carpeta raíz y **sin URLs de vista previa**
  (`preview_urls: false`), para que solo haya una dirección que proteger.
- `.assetsignore`: solo se publican `index.html`, `manifest.webmanifest`, `css/`, `js/`, `datos/` e `iconos/`. Ni `docs/`, ni `tests/`, ni `*.md`, ni `.git`.

Dirección: `https://app-quimica-industrial.<subdominio>.workers.dev`.
**Privacidad:** el `<subdominio>` es el de la cuenta y por defecto lleva el nombre de usuario. Cámbialo por uno neutro en
*Workers & Pages → (panel derecho) Subdomain → Change*. La dirección de la app cambia en consecuencia.

## 3. Cerrar el acceso: usuario y contraseña en el Worker (sin tarjeta) ✅ opción elegida
Cloudflare Access pide tarjeta para el plan Free de Zero Trust. El usuario prefirió no ponerla, así que el acceso lo
controla `worker.mjs`: antes de servir cualquier archivo pide usuario y contraseña (ventana estándar del navegador, HTTP
Basic sobre HTTPS) y los compara con el secreto `USUARIOS`. Sin `USUARIOS`, nadie entra: la app responde «Acceso cerrado».

**Dar de alta los usuarios** (una vez):
1. *Workers & Pages → app-quimica-industrial → Settings → Variables and Secrets → Add*.
2. Tipo: **Secret** (no «Text»: los secretos no se ven tras guardarlos y `wrangler deploy` no los borra).
3. Para cada persona, genera su línea con **`herramientas/generar_usuario.html`** (descarga el repo o ese archivo y ábrelo
   con doble clic; funciona sin internet y no envía nada). Escribe el usuario, pulsa «🎲 Contraseña aleatoria» (o pon una
   de 12 caracteres o más) y «Generar línea». Sale algo así:
   ```
   ana:pbkdf2-sha256$10000$9f2c…$41ab…
   ```
   Es un **hash**: sirve para comprobar la contraseña, pero no para recuperarla, así que la contraseña no queda guardada
   en ningún sitio (ni siquiera en Cloudflare). Apunta la contraseña para pasársela a esa persona por un canal privado.
4. Nombre del secreto: `USUARIOS`. Valor: las líneas generadas, una persona por línea. El usuario no distingue mayúsculas.
5. **Deploy** o *Save*. Funciona en unos segundos.

> Formato antiguo: el worker sigue aceptando líneas `usuario:contraseña` en claro para no dejar a nadie fuera, pero
> conviene cambiarlas por líneas con hash (generando una contraseña nueva, o la misma si ya era larga).

| Quiero… | Qué hago |
|---|---|
| **Aceptar** a alguien | Edita el secreto `USUARIOS` y añade su línea; pásale su usuario y contraseña por un canal privado |
| **Denegar o quitar** el acceso | Borra su línea del secreto. Deja de entrar en cuanto se guarda |
| Cambiar una contraseña | Genera una línea nueva y sustituye la suya |

**Límite de intentos**: cada IP puede comprobar 20 contraseñas por minuto (binding `LIMITE_INTENTOS` en `wrangler.jsonc`,
gratuito y sin configurar nada en el panel). Después recibe «Demasiados intentos» (429) durante un minuto. Las
credenciales ya comprobadas no cuentan, así que usar la app normalmente no gasta intentos. El contador es por centro
de datos de Cloudflare: frena a quien intenta adivinar contraseñas, pero no es un tope exacto. Si algún día el despliegue
fallara por este binding, quita el bloque `ratelimits` de `wrangler.jsonc`: el worker funciona igual sin él.

**Sin contraseña** solo se sirven el manifest y los iconos (lista exacta `PUBLICOS` en `worker.mjs`): Android los descarga
sin las credenciales del usuario para crear el icono de la app instalada. No contienen nada del contenido de estudio.

Es la **única** pantalla de acceso: la app pregunta al worker (`/__usuario`) quién ha entrado y guarda el progreso con
ese usuario, sin pedir otro login. Para «cerrar sesión» hay que cerrar el navegador (es como funciona HTTP Basic).

### Alternativa con tarjeta: Cloudflare Access
Si algún día se pone la tarjeta (el plan Free de Zero Trust no cobra hasta 50 usuarios): *Zero Trust → Access controls →
Applications → Add an application → Self-hosted*, dominio `app-quimica-industrial.<subdominio>.workers.dev`, política
**Allow → Include → Emails** y método **One-time PIN**. Entonces se puede quitar `worker.mjs` (borrar `main` y
`run_worker_first` de `wrangler.jsonc`).

## 4. Hacer privado el repo de GitHub
Solo cuando el paso 3 funcione (en incógnito debe pedir usuario y contraseña):
1. En GitHub: *Settings → General → Danger Zone → Change visibility → Private*.
2. Comprueba que en *Settings → Pages* **no** está activado GitHub Pages.
Cloudflare sigue publicando cada push porque tiene acceso por su integración con GitHub.

## Cómo encaja con la app
- **`worker.mjs` + secreto `USUARIOS`** decide **quién puede abrir** la app (o Cloudflare Access, si se pone tarjeta).
- En Cloudflare, el progreso se guarda con el usuario de `USUARIOS`. El login local de la app (`js/usuarios.js`) solo
  aparece al abrir `index.html` descargado, sin servidor.
- La app sigue funcionando también descargada y abriendo `index.html` (en local no hay control de acceso).
