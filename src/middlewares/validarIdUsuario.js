export function validarIdUsuario(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      status: "error",
      message: "El identificador debe ser un número entero positivo.",
      data: null
    });
    return;
  }

  req.usuarioId = id;
  next();
}
