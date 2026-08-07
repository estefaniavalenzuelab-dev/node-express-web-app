const colores = {
  reset: "\x1b[0m",
  rojo: "\x1b[31m",
  verde: "\x1b[32m",
  amarillo: "\x1b[33m",
  azul: "\x1b[34m"
};

function colorear(texto, color) {
  return `${colores[color]}${texto}${colores.reset}`;
}

export function mostrarExito(mensaje) {
  console.log(colorear(`✔ ${mensaje}`, "verde"));
}

export function mostrarError(mensaje) {
  console.error(colorear(`✖ ${mensaje}`, "rojo"));
}

export function mostrarAdvertencia(mensaje) {
  console.warn(
    colorear(`⚠ ${mensaje}`, "amarillo")
  );
}

export function mostrarTitulo(mensaje) {
  console.log(colorear(mensaje, "azul"));
}