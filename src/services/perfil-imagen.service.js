import {
  Perfil
} from "../models/index.js";

import {
  eliminarArchivo,
  guardarArchivo
} from "./upload.service.js";

function crearError(
  mensaje,
  statusCode
) {
  const error =
    new Error(
      mensaje
    );

  error.statusCode =
    statusCode;

  return error;
}

export async function guardarImagenPerfil(
  perfilId,
  archivo
) {
  const perfil =
    await Perfil.findByPk(
      perfilId
    );

  if (!perfil) {
    throw crearError(
      "Perfil no encontrado.",
      404
    );
  }

  const anterior =
    perfil.imagen;

 const nuevo =
  await guardarArchivo(
    archivo
  );

try {
  perfil.imagen =
    nuevo.nombre;

  await perfil.save();
} catch (error) {
  try {
    await eliminarArchivo(
      nuevo.nombre
    );
    } catch (error) {
      console.error(
        "No fue posible eliminar la imagen anterior:",
        error.message
      );
    }
  }

  return {
    perfil: {
      id:
        perfil.id,
      usuarioId:
        perfil.usuarioId,
      telefono:
        perfil.telefono,
      direccion:
        perfil.direccion,
      fechaNacimiento:
        perfil.fechaNacimiento,
      imagen:
        perfil.imagen
    },

    archivo:
      nuevo
  };
}