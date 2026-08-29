class Usuario {
  constructor(
    nombre,
    correo,
    activo = true
  ) {
    this.nombre = nombre;
    this.correo = correo;
    this.activo = activo;
  }

  get estado() {
    return this.activo
      ? "Activo"
      : "Inactivo";
  }

  desactivar() {
    this.activo = false;
  }

  obtenerResumen() {
    return [
      this.nombre,
      this.correo,
      this.estado
    ].join(" | ");
  }
}

const usuario =
  new Usuario(
    "Ana Torres",
    "ana@example.com"
  );

console.log(
  usuario.obtenerResumen()
);

usuario.desactivar();

console.log(
  usuario.obtenerResumen()
);