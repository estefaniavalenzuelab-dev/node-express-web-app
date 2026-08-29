import {
    registrarUsuarioCompleto
} from "../services/usuarios.service.js";

export async function registrarUsuarioCompletoController(
  req,
  res,
  next
) {
  try {
    const resultado =
      await registrarUsuarioCompleto(
        req.body
      );

    res.status(201).json({
      status: "ok",
      message:
        "Usuario e historial creados",
      data: resultado
    });
  } catch (error) {
    next(error);
  }
}