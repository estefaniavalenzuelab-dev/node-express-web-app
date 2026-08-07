import { crearErrorHttp } from "../utils/errores.js";

export function rutaNoEncontrada(req, res, next) {
  next(
    crearErrorHttp(
      `La ruta ${req.method} ${req.originalUrl} no existe.`,
      404
    )
  );
}