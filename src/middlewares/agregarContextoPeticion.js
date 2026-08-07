export function agregarContextoPeticion(req, res, next) {
  req.requestTime = new Date().toISOString();

  res.setHeader("X-Request-Time", req.requestTime);

  next();
}