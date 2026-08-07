console.log("Inicio");

process.on("exit", (codigo) => {
  console.log(`Proceso finalizado con código ${codigo}`);
});

console.log("Fin");

