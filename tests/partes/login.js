// Login local (crear usuario, contraseña incorrecta, invitado, volver a entrar), migración de hashes antiguos,
// recuadro de novedades, guía con ?s=N e importar progreso. Deja la sesión abierta en ctx.p para las demás partes.
const { URL_LOCAL, cerrarNovedades } = require("./comun");

module.exports = async ctx => {
  const p = ctx.p = await ctx.nuevaPagina();
  const mal = e => ctx.problemas.push("login: " + e);
  await p.goto(URL_LOCAL);

  const login = async (u, c) => {
    await p.fill("#l-usuario", u); await p.fill("#l-clave", c); await p.click("#l-entrar");
    await p.waitForFunction(() => document.querySelector(".barra-prog") || document.getElementById("l-error")?.textContent);
  };
  if (!(await p.$("#f-login"))) mal("sin sesión no aparece el login");
  await login("prueba", "clave-1");
  if (!(await p.$(".card .barra-prog"))) mal("no entra tras crear usuario");
  if ((await p.evaluate(() => almacen.leer(USUARIOS, {}).prueba?.alg)) !== "pbkdf2-600k") mal("los usuarios nuevos no usan PBKDF2 con 600 000 iteraciones");
  if (!(await p.$("#novedades"))) mal("al entrar por primera vez no salen las novedades");
  await cerrarNovedades(p);
  await p.reload(); await p.waitForSelector(".barra-prog");
  if (await p.$("#novedades")) mal("las novedades vuelven a salir después de cerrarlas");
  if (!(await p.textContent("#usuario-barra")).includes("prueba")) mal("la barra no muestra el usuario");
  await p.evaluate(() => { const ud = UNIDADES[0]; guardar({ [ud.preguntas[0].id]: { a: 1, f: 0, ultimo: true } }); });
  await p.click("#salir");
  await login("prueba", "mala");
  if (!(await p.textContent("#l-error")).includes("incorrectos")) mal("acepta una contraseña incorrecta");
  await p.click("#l-invitado"); await p.waitForSelector(".barra-prog"); await cerrarNovedades(p);
  if ((await p.evaluate(() => Object.keys(cargar()).length)) !== 0) mal("el invitado ve el progreso de otro usuario");
  await p.click("#salir");

  // Perfil antiguo (PBKDF2 con 100 000 iteraciones): debe seguir entrando y actualizarse al hash actual.
  await p.evaluate(async () => {
    const lista = almacen.leer(USUARIOS, {});
    lista.antiguo = { nombre: "antiguo", sal: "00ff", alg: "pbkdf2", hash: await hashClave("vieja-1", "00ff", "pbkdf2") };
    almacen.escribir(USUARIOS, lista);
  });
  if ((await p.evaluate(() => entrar("antiguo", "mala"))) !== null) mal("un perfil antiguo acepta una contraseña incorrecta");
  if ((await p.evaluate(() => entrar("antiguo", "vieja-1"))) !== "antiguo") mal("un perfil antiguo (pbkdf2) ya no puede entrar");
  const migrado = await p.evaluate(() => almacen.leer(USUARIOS, {}).antiguo);
  if (migrado.alg !== "pbkdf2-600k") mal("el perfil antiguo no se actualiza al hash actual al entrar");
  if ((await p.evaluate(() => entrar("antiguo", "vieja-1"))) !== "antiguo") mal("tras actualizar el hash, el perfil antiguo no entra");

  await login("Prueba", "clave-1");
  if ((await p.evaluate(() => Object.keys(cargar()).length)) !== 1) mal("al volver a entrar no recupera su progreso");
  if (await p.$("#novedades")) mal("salen novedades ya vistas por este usuario");
  await p.goto(URL_LOCAL + "#/ud/tsf-ud5/guia?s=3"); await p.waitForSelector("#sec-3");
  if (!(await p.$eval("#sec-3", e => e.open)) || (await p.$eval("#sec-1", e => e.open))) mal("la guía no abre la sección pedida (?s=3)");
  const mezcla = await p.evaluate(() => JSON.stringify(mezclarProgreso({ x: { a: 1, f: 0, ultimo: true } },
    { x: { a: 2, f: 1, ultimo: false }, y: { a: "<img>", f: 0 }, z: { a: 0, f: 1, ultimo: false } })));
  if (mezcla !== JSON.stringify({ x: { a: 2, f: 1, ultimo: false }, z: { a: 0, f: 1, ultimo: false } })) mal("importar progreso mezcla mal: " + mezcla);
  await p.evaluate(() => guardar({}));
};
