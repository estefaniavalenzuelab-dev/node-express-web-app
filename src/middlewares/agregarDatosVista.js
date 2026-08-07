export function agregarDatosVista(req, res, next) {
  res.locals.rutaActual = req.path;
  res.locals.requestTime = req.requestTime;

  next();
}