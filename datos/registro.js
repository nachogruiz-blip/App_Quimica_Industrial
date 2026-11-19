// Registro global de unidades. Cada datos/udN.js llama a registrarUD({...}).
window.UNIDADES = [];
window.registrarUD = function (ud) { window.UNIDADES.push(ud); };
