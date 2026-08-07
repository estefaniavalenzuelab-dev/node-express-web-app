export function crearErrorHttp(
  mensaje,
  statusCode = 500,
  detalles = null
) {
  const error = new Error(mensaje);

  error.statusCode = statusCode;
  error.detalles = detalles;

  return error;
}