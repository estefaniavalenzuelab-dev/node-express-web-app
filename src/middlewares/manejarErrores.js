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