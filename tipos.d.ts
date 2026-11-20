// Tipos de los datos de la app, solo para el editor (VS Code) y la comprobación con TypeScript (ver jsconfig.json).
// No se cargan en el navegador ni se publican. Esquema explicado en docs/formato_datos.md.

/** Asignatura (módulo) en datos/registro.js. */
interface Modulo {
  id: string;
  codigo: string;
  icono: string;
  nombre: string;
}

/** Sección de la guía de estudio de una unidad. */
interface SeccionGuia {
  titulo: string;
  /** Dónde está en los apuntes de clase (solo la referencia, nunca texto copiado). */
  apuntes: string;
  html: string;
}

interface PreguntaBase {
  /** Estable: nunca renumerar ni reutilizar (el progreso se guarda por id). */
  id: string;
  /** Nº de sección de la guía (empieza en 1). */
  seccion: number;
  enunciado: string;
  fuente?: string;
}
interface PreguntaTest extends PreguntaBase {
  tipo: "test";
  opciones: string[];
  correcta: number;
  explicacion: string;
}
interface PreguntaVF extends PreguntaBase {
  tipo: "vf";
  correcta: boolean;
  explicacion: string;
}
/** Valores de las variables de una numérica, por nombre. */
type Valores = Record<string, number>;
interface PreguntaNumerica extends PreguntaBase {
  tipo: "numerica";
  /** Rango de cada variable: [mínimo, máximo, paso]. */
  variables: Record<string, [number, number, number]>;
  resolver: (v: Valores) => number;
  unidad?: string;
  /** Tolerancia relativa (por defecto 0,02). */
  tolerancia?: number;
  toleranciaAbs?: number;
  explicacion: string | ((v: Valores) => string);
}
type Pregunta = PreguntaTest | PreguntaVF | PreguntaNumerica;

/** Procedimiento del juego «Ordena los pasos»: los pasos van en su único orden correcto. */
interface Procedimiento {
  /** Estable: el récord se guarda por id (<abreviatura><nº UD>-p<n>, p. ej. tsf5-p1). */
  id: string;
  titulo: string;
  pasos: string[];
}

/** Unidad didáctica: datos/<modulo>_udN.js. */
interface Unidad {
  id: string;
  modulo: string;
  codigo: string;
  titulo: string;
  descripcion?: string;
  ejercicios?: string;
  guia: SeccionGuia[];
  /** Juego «Parejas»: [fórmula o concepto, su pareja]. Textos cortos y todos distintos. */
  parejas?: [string, string][];
  /** Juego «Ordena los pasos». */
  pasos?: Procedimiento[];
  preguntas: Pregunta[];
}

/** Entrada de datos/novedades.js. */
interface Novedad {
  /** Fecha AAAA-MM-DD, con sufijo -N si hay varias el mismo día. Nunca cambiar uno publicado. */
  id: string;
  titulo: string;
  puntos: string[];
}

interface Window {
  MODULOS: Modulo[];
  UNIDADES: Unidad[];
  NOVEDADES: Novedad[];
  registrarUD(ud: Unidad): void;
  /** Pregunta en pantalla (la usa tests/). */
  __actual?: { q: Pregunta; v: Valores | null };
  /** Juego en curso (lo usa tests/). */
  __juego?: any;
}
declare var MODULOS: Modulo[];
declare var UNIDADES: Unidad[];
declare var NOVEDADES: Novedad[];
declare function registrarUD(ud: Unidad): void;
