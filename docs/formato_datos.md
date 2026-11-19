# Formato de los datos de una unidad

Cada UD vive en `datos/<modulo>_udN.js` (p. ej. `tsf_ud5.js`) y se registra así (ejemplo completo: `datos/tsf_ud5.js`):

```js
registrarUD({
  id: "tsf-ud5",             // único; se usa en la URL (#/ud/tsf-ud5/guia)
  modulo: "tsf",             // id de MODULOS en datos/registro.js (tsf, mei, fpm)
  codigo: "UD5",
  titulo: "Flujo de fluidos",
  descripcion: "Una línea",
  guia: [ { titulo: "1. Sección", html: `<p>…</p>` }, … ],
  preguntas: [ … ]
});
```
Añade `<script src="datos/<modulo>_udN.js"></script>` en `index.html` después de `registro.js` y antes de `app.js`.
Un módulo nuevo se añade a `MODULOS` en `datos/registro.js`.

## Guía (`guia[]`)
- Una sección por apartado del PDF, en el mismo orden. Al final: «Método para resolver problemas» y «Formulario».
- Clases HTML disponibles:
  - `<div class="formula">…</div>` fórmula destacada (`<sub>`, `<sup>`, `·`, `Δ`, `√`…).
  - `<p class="clave"><b>Idea clave:</b> …</p>` lo imprescindible.
  - `<table class="tabla">`, `<h4>`, `<ul>/<ol>`, `<details><summary>` desplegables.

## Preguntas (`preguntas[]`)
Campos comunes: `id`, `tipo`, `seccion` (nº de sección de la guía, empieza en 1), `enunciado`, `explicacion`.

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
