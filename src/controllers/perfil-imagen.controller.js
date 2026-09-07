import {
  guardarImagenPerfil
} from "../services/perfil-imagen.service.js";

export async function subirImagenPerfil(
  req,
  res,
  next
) {
  try {
    const archivo =
      req.files?.archivo;

    if (!archivo) {
      return res
        .status(400)
        .json({
          status:
            "error",
          message:
            "Debes enviar un archivo en el campo 'archivo'.",
          data:
            null
        });
    }

    const resultado =
      await guardarImagenPerfil(
        req.params.id,
        archivo
      );

    return res
      .status(200)
      .json({
        status:
          "ok",
        message:
          "Imagen asociada al perfil.",
        data:
          resultado
      });
  } catch (error) {
    next(error);
  }
}