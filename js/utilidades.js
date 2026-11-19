// Utilidades globales usadas por los archivos de datos (cargar ANTES de datos/*.js).
"use strict";
const G = 9.8; // gravedad usada en los apuntes (m/s²)

/** Formato español con 4 cifras significativas. */
function fmt(x, cifras = 4) {
  if (!isFinite(x)) return String(x);
  return Number(x.toPrecision(cifras)).toLocaleString("es-ES", { maximumFractionDigits: 10 });
}

/** Área de una sección circular de diámetro D (m²). */
function area(D) { return Math.PI * D * D / 4; }

/** Número de Reynolds Re = ρ·v·D/μ (unidades SI). */
function reynolds(rho, v, D, mu) { return rho * v * D / mu; }

/** Régimen según los apuntes de TSF UD5: laminar < 2000, transición 2000–4000, turbulento > 4000. */
function regimen(Re) { return Re < 2000 ? "laminar" : Re <= 4000 ? "de transición" : "turbulento"; }

/**
 * Factor de fricción «4f» de los apuntes (= factor de Darcy).
 * Laminar: 4f = 64/Re. Turbulento: ecuación de Colebrook resuelta por iteración
 * (sustituye a la lectura del diagrama de Moody, por eso las numéricas turbulentas usan tolerancia ≥ 5 %).
 */
function cuatroF(Re, rugRel) {
  if (Re < 2000) return 64 / Re;
  let f = 0.02;
  for (let i = 0; i < 60; i++) f = Math.pow(-2 * Math.log10(rugRel / 3.7 + 2.51 / (Re * Math.sqrt(f))), -2);
  return f;
}

/** Pérdida de carga de Fanning/Darcy: hf = 4f·(L/D)·v²/(2g) (m de columna de fluido). */
function perdidaCarga(f4, L, D, v) { return f4 * (L / D) * v * v / (2 * G); }
