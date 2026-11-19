# Formato de los datos de una unidad

Cada UD vive en `datos/udN.js` y se registra así (ver ejemplo completo en `datos/ud_demo.js`):

```js
registrarUD({
  id: "ud4",                 // único, minúsculas; se usa en la URL (#/ud/ud4/guia)
  codigo: "UD4",
  titulo: "Título de la unidad",
  descripcion: "Una línea",
  guia: [ { titulo: "1. Sección", html: `<p>…</p>` }, … ],
  preguntas: [ … ]
});
```
Y se añade `<script src="datos/udN.js"></script>` en `index.html` **después** de `registro.js` y antes de `app.js`.

## Guía (`guia[]`)
- Una sección por apartado del PDF, en el mismo orden y numeración.
- `html` admite cualquier HTML. Clases disponibles:
  - `<div class="formula">…</div>` fórmula destacada (usar `<sub>`, `<sup>`, `·`, `Δ`, `→`…).
  - `<p class="clave"><b>Idea clave:</b> …</p>` lo imprescindible para el examen.
  - `<table>`, `<ul>`, `<details>` para desplegables dentro de la sección.

## Preguntas (`preguntas[]`)
Campos comunes: `id` (estable, `ud4-1`, `ud4-2`… **nunca renumerar**, el progreso se guarda por id),
`tipo`, `seccion` (nº de sección de la guía), `enunciado`, `explicacion`.

| tipo | campos propios | notas |
|---|---|---|
| `test` | `opciones: [..]`, `correcta: índice` | se barajan al mostrarse; 4 opciones, distractores plausibles |
| `vf` | `correcta: true/false` | la explicación debe decir *por qué* |
| `numerica` | `variables: {x:[min,max,paso]}`, `resolver: v => número`, `unidad`, `tolerancia` (relativa, por defecto 0.02) | `{x}` en el enunciado se sustituye; `explicacion` puede ser `v => html` con el desarrollo |

La función global `fmt(n)` formatea números al estilo español (4 cifras significativas).

## Criterios de calidad
- Objetivo orientativo: 25–40 preguntas por UD, todas las secciones cubiertas, ≥ 25 % numéricas si la UD tiene cálculos.
- Rangos de `variables` físicamente razonables (sin temperaturas negativas absurdas, rendimientos > 100 %, etc.).
- Comprobar cada `resolver` a mano con un caso.
