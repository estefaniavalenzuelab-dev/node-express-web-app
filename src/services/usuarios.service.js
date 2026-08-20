import {
  actualizar,
  buscarPorId,
  buscarTodos,
  buscarConFiltros,
  insertar,
  eliminar
} from "../repositories/usuarios.repository.js";

import {
  escribirJson,
  leerJson
} from "../utils/archivos.js";
import { crearErrorHttp } from "../utils/errores.js";
import { RUTA_USUARIOS } from "../utils/rutas.js";
import {
  convertirBooleano,
  esCorreoValido,
  normalizarTexto,
  validarId,
  validarNombre,
  validarCorreo
} from "../utils/validaciones.js";




async function guardarUsuarios(usuarios) {
  await escribirJson(RUTA_USUARIOS, usuarios);
}

function generarSiguienteId(usuarios) {
  if (usuarios.length === 0) {
    return 1;
  }

  return Math.max(
    ...usuarios.map((usuario) => usuario.id)
  ) + 1;
}

function existeCorreo(
  usuarios,
  correo,
  idIgnorado = null
) {
  const correoNormalizado = correo.toLowerCase();

  return usuarios.some((usuario) => {
    return (
      usuario.correo.toLowerCase() === correoNormalizado &&
      usuario.id !== idIgnorado
    );
  });
}

export async function obtenerUsuarios(
  filtros = {}
) {
  const nombre =
    filtros.nombre?.trim() || undefined;

  let activo;

  if (filtros.activo !== undefined) {
    activo = convertirBooleano(
      filtros.activo
    );
  }

  if (
    nombre === undefined &&
    activo === undefined
  ) {
    return buscarTodos();
  }

  return buscarConFiltros({
    nombre,
    activo
  });


}



//export async function obtenerUsuarios() {
  //const usuarios = await leerJson(RUTA_USUARIOS);

  //if (!Array.isArray(usuarios)) {
    //throw new Error(
      //"El archivo de usuarios debe contener un arreglo."
    //);
  //}

  //return usuarios;
//}

export async function obtenerUsuarioPorId(
  id
) {
  const idNumerico = validarId(id);

  return buscarPorId(idNumerico);
}

export async function crearUsuario(datos) {
  const nombre =
    validarNombre(datos.nombre);

  const correo =
    validarCorreo(datos.correo);

  const activo =
    datos.activo === undefined
      ? true
      : convertirBooleano(
          datos.activo
        );

  return insertar({
    nombre,
    correo,
    activo
  });
}


//export async function crearUsuario(datos) {
//  const usuarios = await obtenerUsuarios();

//  const nombre = normalizarTexto(datos.nombre);
//  const correo = normalizarTexto(
//    datos.correo
//  ).toLowerCase();

//  const activo =
//    datos.activo === undefined
//      ? true
//      : convertirBooleano(datos.activo);

//  if (!nombre) {
//    throw crearErrorHttp(
//      "El nombre es obligatorio.",
//      400
//    );
//  }

//  if (!correo) {
//    throw crearErrorHttp(
//      "El correo es obligatorio.",
//      400
//    );
//  }

//  if (!esCorreoValido(correo)) {
//    throw crearErrorHttp(
//      "El correo no tiene un formato válido.",
//      400
//    );
//  }

 // if (existeCorreo(usuarios, correo)) {
  //  throw crearErrorHttp(
 //     "Ya existe un usuario con ese correo.",
 //     409
//    );
  //}


//  const usuario = {
//    id: generarSiguienteId(usuarios),
//    nombre,
//    correo,
//    activo
//  };

  //usuarios.push(usuario);
  //await guardarUsuarios(usuarios);

//return usuario;
//}

export async function modificarUsuario(
  id,
  datos
) {
  const idNumerico =
    validarId(id);

  const cambios = {};

  if (datos.nombre !== undefined) {
    cambios.nombre =
      validarNombre(datos.nombre);
  }

  if (datos.correo !== undefined) {
    cambios.correo =
      validarCorreo(datos.correo);
  }

  if (datos.activo !== undefined) {
    cambios.activo =
      convertirBooleano(
        datos.activo
      );
  }

  if (
    Object.keys(cambios).length === 0
  ) {
    throw new Error(
      "Debes enviar al menos un campo modificable."
    );
  }

  const usuario =
    await actualizar(
      idNumerico,
      cambios
    );

  return usuario;
}

export async function eliminarUsuario(id) {
  const idNumerico =
    validarId(id);

  const existente =
    await buscarPorId(idNumerico);

  if (!existente) {
    return null;
  }

  return eliminar(idNumerico);
}

//export async function eliminarUsuario(id) {
//  const usuarios = await obtenerUsuarios();
//  const idNumerico = validarId(id);

//  const indice = usuarios.findIndex(
//    (usuario) => usuario.id === idNumerico
//  );

//  if (indice === -1) {
//    throw crearErrorHttp(
//      "Usuario no encontrado.",
//      404
//    );
//  }

//  const [usuarioEliminado] = usuarios.splice(
//    indice,
//    1
 // );

//  await guardarUsuarios(usuarios);

//  return usuarioEliminado;
//}

export async function obtenerUsuariosConFiltros(
  filtros
) {
  const nombre =
    filtros.nombre?.trim() || undefined;

  let activo;

  if (filtros.activo !== undefined) {
    activo = convertirBooleano(
      filtros.activo
    );
  }

  return buscarConFiltros({
    nombre,
    activo
  });
}