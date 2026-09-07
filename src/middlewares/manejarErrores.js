export function manejarErrores(
  error,
  req,
  res,
  next
) {
  if (
    error.name ===
    "UnauthorizedError"
  ) {
    let message =
      "Token inválido o ausente.";

    if (
      error.code ===
      "credentials_required"
    ) {
      message =
        "Token de autenticación requerido.";
    }

    if (
      error.code ===
      "invalid_token"
    ) {
      message =
        "Token inválido o expirado.";
    }

    return res
      .status(401)
      .json({
        status:
          "error",
        message,
        data:
          null
      });
  }

  const statusCode =
    error.statusCode ??
    500;

  const message =
    statusCode >= 500
      ? "Error interno del servidor."
      : error.message;

  console.error(
    error
  );

  return res
    .status(statusCode)
    .json({
      status:
        "error",
      message,
      data:
        null
    });
}

/*
export function manejarErrores(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const esDesarrollo =
    process.env.NODE_ENV === "development";

  console.error({
    message: error.message,
    stack: esDesarrollo ? error.stack : undefined
  });

  const mensaje =
    statusCode === 500
      ? "Ocurrió un error interno en el servidor."
      : error.message;

  const aceptaHtml = req.accepts(["html", "json"]) === "html";
  const esRutaApi = req.originalUrl.startsWith("/api/");

  if (aceptaHtml && !esRutaApi) {
    res.status(statusCode).render("error", {
      titulo: "No fue posible completar la solicitud",
      statusCode,
      mensaje,
      detalles: esDesarrollo
        ? error.detalles
        : null
    });
    return;
  }

  res.status(statusCode).json({
    status: "error",
    message: mensaje,
    data: null,
    details: esDesarrollo
      ? error.detalles
      : undefined
  });
}
  */