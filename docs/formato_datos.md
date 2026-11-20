# Formato de los datos de una unidad

Cada UD vive en `datos/<modulo>_udN.js` (p. ej. `tsf_ud5.js`) y se registra así (ejemplo completo: `datos/tsf_ud5.js`):

```js
registrarUD({
  id: "tsf-ud5",             // único; se usa en la URL (#/ud/tsf-ud5/guia)
  modulo: "tsf",             // id de MODULOS en datos/registro.js (tsf, mei, fpm)
  codigo: "UD5",
  titulo: "Flujo de fluidos",
  descripcion: "Una línea",
  ejercicios: "Relación de ejercicios de la UD5",   // opcional: se cita en «Dónde estudiarlo» de las numéricas
  guia: [ { titulo: "1. Sección", apuntes: "Apuntes UD5, apartado 1 (pág. 1)", html: `<p>…</p>` }, … ],
  preguntas: [ … ]
});
```
Añade `<script src="datos/<modulo>_udN.js"></script>` en `index.html` después de `registro.js` y antes de `app.js`.
Un módulo nuevo se añade a `MODULOS` en `datos/registro.js`.

**Tipos**: el esquema está también en `tipos.d.ts`. VS Code marca los errores al editar (p. ej. `tipo: "tset"` o un campo
que falta) gracias a `jsconfig.json`, y la CI lo comprueba con `npx tsc -p jsconfig.json`.

## Guía (`guia[]`)
- `apuntes`: dónde está ese contenido en los apuntes de clase (apartado y páginas del PDF; solo la referencia, nunca texto copiado).
  Se muestra en la guía y en «Dónde estudiarlo» de cada pregunta de esa sección.
- Una sección por apartado del PDF, en el mismo orden. Al final: «Método para resolver problemas» y «Formulario».
- Clases HTML disponibles:
  - `<div class="formula">…</div>` fórmula destacada (`<sub>`, `<sup>`, `·`, `Δ`, `√`…).
  - `<p class="clave"><b>Idea clave:</b> …</p>` lo imprescindible.
  - `<span class="formula en-linea">…</span>` fórmula dentro de un párrafo.
  - `<table class="tabla">`, `<h4>`, `<ul>/<ol>`, `<details><summary>` desplegables.
- **Sin `style="…"` ni atributos `on…`**: la CSP los bloquea en Cloudflare (el test lo comprueba). Usa las clases de arriba
  o añade una en `css/estilos.css`.

## Preguntas (`preguntas[]`)
Campos comunes: `id`, `tipo`, `seccion` (nº de sección de la guía, empieza en 1; **obligatorio**: alimenta «Dónde estudiarlo»),
`enunciado`, `explicacion`. Opcional: `fuente` (texto extra para «Dónde estudiarlo», p. ej. «Relación de ejercicios UD5, problema tipo 3»).

Al responder, la explicación sale en un desplegable «💡 Explicación» con «Dónde estudiarlo»: enlace a la sección de la guía
(nueva pestaña), `apuntes` de esa sección y, en las numéricas, `ejercicios` de la UD.

**IDs**: `<abreviatura módulo><nº UD>-<n>` para conceptuales y `-n<n>` para numéricas (`tsf5-12`, `tsf5-n3`).
**Nunca renumerar ni reutilizar** un id: el progreso del usuario se guarda por id. Para quitar una pregunta, bórrala y no reutilices su id.

| tipo | campos propios | notas |
|---|---|---|
| `test` | `opciones: [..]`, `correcta: índice` | se barajan al mostrarse; 4 opciones, distractores plausibles |
| `vf` | `correcta: true/false` | la explicación dice *por qué* |
| `numerica` | `variables: {x:[min,max,paso]}`, `resolver: v => número`, `unidad`, `tolerancia` (relativa, por defecto 0.02), `toleranciaAbs` (opcional) | `{x}` en el enunciado se sustituye; `explicacion: v => html` con el desarrollo paso a paso |

## Utilidades (`js/utilidades.js`, globales)
`G` (9,8), `fmt(n, cifras=4)`, `area(D)`, `reynolds(ρ,v,D,μ)`, `regimen(Re)`, `cuatroF(Re, ε/D)`, `perdidaCarga(4f,L,D,v)`.
Si una UD necesita cálculos repetidos (p. ej. electricidad), añádelos aquí con comentario.

## Criterios de calidad
- 30–40 preguntas por UD, todas las secciones cubiertas; ≥ 1/3 numéricas si la UD tiene cálculos.
- Las numéricas reproducen los tipos de problema de la relación de ejercicios de clase.
- Rangos de `variables` físicamente razonables. Respuestas con signo: usa `toleranciaAbs` por si la solución sale ≈ 0.
- Antes de redactar, verifica las fórmulas reproduciendo las soluciones de la relación de ejercicios.
- `node tests/comprobar.js` debe terminar en «✅ Todo correcto».
