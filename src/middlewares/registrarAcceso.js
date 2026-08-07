import {
  agregarLinea
} from "../utils/archivos.js";
import {
  RUTA_LOG_ACCESOS
} from "../utils/rutas.js";

export async function registrarAcceso(
  req,
  res,
  next
) {
  const fechaHora =
    req.requestTime ||
    new Date().toISOString();

  const linea = [
    fechaHora,
    req.method,
    req.originalUrl
  ].join(" | ");

  try {
    await agregarLinea(
      RUTA_LOG_ACCESOS,
      linea
    );
  } catch (error) {
    console.error(
      "No fue posible registrar el acceso:",
      error.message
    );
  }

  next();
}