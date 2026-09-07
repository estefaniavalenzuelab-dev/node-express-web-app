import {
  eliminarArchivo,
  guardarArchivo
} from "../services/upload.service.js";

export async function subirArchivo(
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
      await guardarArchivo(
        archivo
      );

    return res
      .status(201)
      .json({
        status:
          "ok",
        message:
          "Archivo subido correctamente.",
        data:
          resultado
      });
  } catch (error) {
    next(error);
  }
}

export async function eliminarArchivoController(
  req,
  res,
  next
) {
  try {
    const resultado =
      await eliminarArchivo(
        req.params.nombre
      );

    return res
      .status(200)
      .json({
        status:
          "ok",
        message:
          "Archivo eliminado correctamente.",
        data:
          resultado
      });
  } catch (error) {
    next(error);
  }
}