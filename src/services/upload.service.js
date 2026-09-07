import {
  mkdir,
  unlink
} from "node:fs/promises";

import {
  randomUUID
} from "node:crypto";

import path
  from "node:path";

const DIRECTORIO_UPLOADS =
  path.resolve(
    process.cwd(),
    "public",
    "uploads"
  );

  const EXTENSIONES_PERMITIDAS =
  new Set([
    ".jpg",
    ".jpeg",
    ".png",
    ".webp"
  ]);

  const TAMANO_MAXIMO =
  5 * 1024 * 1024;

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

function obtenerExtension(
  nombre
) {
  return path
    .extname(
      nombre
    )
    .toLowerCase();
}

export function validarArchivo(
  archivo
) {
  if (!archivo) {
    throw crearError(
      "Debes enviar un archivo.",
      400
    );
  }

  const extension =
    obtenerExtension(
      archivo.name
    );

  if (
    !EXTENSIONES_PERMITIDAS.has(
      extension
    )
  ) {
    throw crearError(
      "La extensión del archivo no está permitida.",
      415
    );
  }

 // if (
 //   !MIME_PERMITIDOS.has(
 //     archivo.mimetype
  //  )
 // ) {
 //   throw crearError(
  //    "El tipo de archivo no está permitido.",
  //    415
  //  );
  //}

  if (
    archivo.size >
    TAMANO_MAXIMO
  ) {
    throw crearError(
      "El archivo supera el tamaño máximo permitido de 5 MB.",
      413
    );
  }

  return {
    extension
  };
}

function generarNombreArchivo(
  extension
) {
  return `${randomUUID()}${extension}`;
}

async function asegurarDirectorioUploads() {
  await mkdir(
    DIRECTORIO_UPLOADS,
    {
      recursive:
        true
    }
  );
}


export async function guardarArchivo(
  archivo
) {
  const {
    extension
  } =
    validarArchivo(
      archivo
    );

  await asegurarDirectorioUploads();

  const nombre =
    generarNombreArchivo(
      extension
    );

  const ruta =
    path.join(
      DIRECTORIO_UPLOADS,
      nombre
    );

  await archivo.mv(
    ruta
  );

  return {
    nombre,
    nombreOriginal:
      archivo.name,
    mimetype:
      archivo.mimetype,
    size:
      archivo.size,
    md5:
      archivo.md5,
    url:
      `/uploads/${nombre}`
  };
}

function obtenerNombreSeguro(
  nombre
) {
  const limpio =
    path.basename(
      String(
        nombre ?? ""
      )
    );

  if (!limpio) {
    throw crearError(
      "Nombre de archivo inválido.",
      400
    );
  }

  return limpio;
}

export async function eliminarArchivo(
  nombre
) {
  const seguro =
    obtenerNombreSeguro(
      nombre
    );

  const ruta =
    path.join(
      DIRECTORIO_UPLOADS,
      seguro
    );

  try {
    await unlink(
      ruta
    );
  } catch (error) {
    if (
      error.code ===
      "ENOENT"
    ) {
      throw crearError(
        "Archivo no encontrado.",
        404
      );
    }

    throw error;
  }

  return {
    nombre:
      seguro
  };
}