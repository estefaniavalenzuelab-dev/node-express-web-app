const variablesRequeridas = [
  "DB_HOST",
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD"
];

export function validarVariablesEntorno() {
  const faltantes = variablesRequeridas.filter(
    (nombre) => !process.env[nombre]
  );

  if (faltantes.length > 0) {
    throw new Error(
      `Faltan variables de entorno: ${faltantes.join(", ")}`
    );
  }
}