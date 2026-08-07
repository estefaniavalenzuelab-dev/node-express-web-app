export function mostrarInicio(req, res) {
  res.status(200).render("home", {
    titulo: "Node & Express Web App",
    mensaje: "Servidor funcionando correctamente.",
    tecnologias: [
      "Node.js",
      "Express",
      "Handlebars",
      "File System"
    ],
    anioActual: new Date().getFullYear()
  });
}

export function mostrarEstado(req, res) {
  res.status(200).json({
    status: "ok",
    message: "Servidor funcionando",
    data: {
      node: process.version,
      pid: process.pid,
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      requestTime: req.requestTime
    }
  });
}