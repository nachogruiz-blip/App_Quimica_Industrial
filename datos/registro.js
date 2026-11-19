// Registro global de módulos (asignaturas) y unidades. Cada datos/<modulo>_udN.js llama a registrarUD({...}).
window.MODULOS = [
  { id: "tsf", codigo: "0190", nombre: "Transporte de sólidos y fluidos" },
  { id: "mei", codigo: "0191", nombre: "Mantenimiento electromecánico en industrias de proceso" },
  { id: "fpm", codigo: "", nombre: "Formulación y preparación de mezclas" }
];
window.UNIDADES = [];
window.registrarUD = function (ud) { window.UNIDADES.push(ud); };
