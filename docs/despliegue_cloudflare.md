# Publicar la app con acceso controlado (Cloudflare Workers + Cloudflare Access)

Objetivo: que **solo las personas que tú autorices** (por correo) puedan abrir la app, y que el repo de GitHub pueda ser
**privado**. Sustituye a GitHub Pages, que siempre publica en abierto.

**Coste: 0 €** (comprobado en noviembre de 2026):
- Cloudflare Workers / Pages, plan gratuito: más que suficiente para una web estática pequeña como esta.
- Cloudflare Zero Trust (Access), plan gratuito: hasta **50 usuarios**. A partir de ahí es de pago (unos 7 $ por usuario y mes).
- Al activar Zero Trust, Cloudflare puede pedir una tarjeta aunque elijas el plan gratuito; no cobra nada mientras sigas en él.

> Los menús de Cloudflare cambian de nombre a menudo: si algo no aparece exactamente así, busca la opción equivalente.
> **Privacidad:** el nombre del proyecto y el del equipo forman parte de las URLs. Usa nombres neutros
> (p. ej. `estudio-qi`), sin tu nombre ni el del centro.

## 1. Crear la cuenta
1. Entra en `dash.cloudflare.com` y crea una cuenta gratuita (correo y contraseña). Activa la verificación en dos pasos.

## 2. Publicar la app (Cloudflare Workers con archivos estáticos)
Está hecho así (noviembre de 2026): *Workers & Pages → Create → Import a repository* con el repo `App_Quimica_Industrial`.
Cloudflare ejecuta `npx wrangler deploy` en cada push a `main`. La configuración está en el repo:
- `wrangler.jsonc`: nombre `app-quimica-industrial`, sirve la carpeta raíz y **sin URLs de vista previa**
  (`preview_urls: false`), para que solo haya una dirección que proteger.
- `.assetsignore`: solo se publican `index.html`, `css/`, `js/` y `datos/`. Ni `docs/`, ni `tests/`, ni `*.md`, ni `.git`.
- `_headers`: cabeceras de seguridad (CSP, etc.).

Dirección: `https://app-quimica-industrial.<subdominio>.workers.dev`.
**Privacidad:** el `<subdominio>` es el de la cuenta y por defecto lleva el nombre de usuario. Cámbialo por uno neutro en
*Workers & Pages → (panel derecho) Subdomain → Change*. La dirección de la app cambia en consecuencia.

## 3. Cerrar el acceso (Cloudflare Access)
1. En el panel: *Zero Trust*. Elige un nombre de equipo neutro y el plan **Free**.
2. *Zero Trust → Access controls → Applications → Add an application → Self-hosted*.
   - Nombre: `Química Industrial`.
   - Dominio: `app-quimica-industrial.<subdominio>.workers.dev`.
   - Atajo: en el Worker, *Settings → Domains & Routes → workers.dev* puede haber un interruptor «Cloudflare Access» que crea
     la aplicación; después añade los correos en su política.
   - Duración de la sesión: p. ej. `1 month`, para no pedir el código cada día.
3. Añade una política:
   - Nombre: `Personas autorizadas`
   - Acción: **Allow**
   - Include → **Emails** → escribe los correos autorizados (el tuyo el primero).
4. Método de acceso: **One-time PIN**, que viene por defecto. La persona escribe su correo y recibe un código.
   No hace falta crear ninguna contraseña en Cloudflare.
5. Guarda y prueba en una ventana de incógnito: debe pedirte el correo antes de mostrar la app.

## 4. Hacer privado el repo de GitHub
Solo cuando el paso 3 funcione:
1. En GitHub: *Settings → General → Danger Zone → Change visibility → Private*.
2. Comprueba que en *Settings → Pages* **no** está activado GitHub Pages.
Cloudflare sigue publicando cada push porque tiene acceso por su integración con GitHub.

## Gestión del día a día
| Quiero… | Dónde |
|---|---|
| **Aceptar** a alguien | *Access → Applications → Química Industrial → Policies → Personas autorizadas*: añade su correo |
| **Denegar o quitar** el acceso | Quita su correo de la política. Para echarle ya: *Zero Trust → Users →* su usuario *→ Revoke session* |
| Ver quién ha entrado o lo ha intentado | *Zero Trust → Logs → Access* (en el plan gratuito el historial es corto) |

No hay un botón de «solicitar acceso» dentro de la app: la persona te pide acceso (por mensaje o correo) y tú añades su
correo. Si alguien no autorizado intenta entrar, Cloudflare no le envía el código y no ve nada.

## Cómo encaja con la app
- **Cloudflare Access** decide **quién puede abrir** la app.
- **El login de la app** (`js/usuarios.js`) solo separa el **progreso** de cada persona en su navegador.
- La app sigue funcionando también descargada y abriendo `index.html` (en local no hay control de acceso).
