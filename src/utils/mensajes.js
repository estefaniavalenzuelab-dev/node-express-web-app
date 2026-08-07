export function obtenerMensajeInicio(puerto) {
  return `Servidor disponible en http://localhost:${puerto}`;
}

export function obtenerMensajeError(error) {
  return `Ocurrió un error: ${error.message}`;
}