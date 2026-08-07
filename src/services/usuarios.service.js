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
  validarId
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

export async function obtenerUsuarios() {
  const usuarios = await leerJson(RUTA_USUARIOS);

  if (!Array.isArray(usuarios)) {
    throw new Error(
      "El archivo de usuarios debe contener un arreglo."
    );
  }

  return usuarios;
}

export async function obtenerUsuarioPorId(id) {
  const usuarios = await obtenerUsuarios();
  const idNumerico = validarId(id);

  return (
    usuarios.find(
      (usuario) => usuario.id === idNumerico
    ) ?? null
  );
}

export async function crearUsuario(datos) {
  const usuarios = await obtenerUsuarios();

  const nombre = normalizarTexto(datos.nombre);
  const correo = normalizarTexto(
    datos.correo
  ).toLowerCase();

  const activo =
    datos.activo === undefined
      ? true
      : convertirBooleano(datos.activo);

  if (!nombre) {
    throw crearErrorHttp(
      "El nombre es obligatorio.",
      400
    );
  }

  if (!correo) {
    throw crearErrorHttp(
      "El correo es obligatorio.",
      400
    );
  }

  if (!esCorreoValido(correo)) {
    throw crearErrorHttp(
      "El correo no tiene un formato válido.",
      400
    );
  }

  if (existeCorreo(usuarios, correo)) {
    throw crearErrorHttp(
      "Ya existe un usuario con ese correo.",
      409
    );
  }

  const usuario = {
    id: generarSiguienteId(usuarios),
    nombre,
    correo,
    activo
  };

  usuarios.push(usuario);
  await guardarUsuarios(usuarios);

  return usuario;
}

export async function modificarUsuario(
  id,
  cambios
) {
  const usuarios = await obtenerUsuarios();
  const idNumerico = validarId(id);

  const indice = usuarios.findIndex(
    (usuario) => usuario.id === idNumerico
  );

  if (indice === -1) {
    throw crearErrorHttp(
      "Usuario no encontrado.",
      404
    );
  }

  const usuarioActual = usuarios[indice];

  const nombre =
    cambios.nombre === undefined
      ? usuarioActual.nombre
      : normalizarTexto(cambios.nombre);

  const correo =
    cambios.correo === undefined
      ? usuarioActual.correo
      : normalizarTexto(
          cambios.correo
        ).toLowerCase();

  const activo =
    cambios.activo === undefined
      ? usuarioActual.activo
      : convertirBooleano(cambios.activo);

  if (!nombre) {
    throw crearErrorHttp(
      "El nombre no puede quedar vacío.",
      400
    );
  }

  if (!esCorreoValido(correo)) {
    throw crearErrorHttp(
      "El correo no tiene un formato válido.",
      400
    );
  }

  if (
    existeCorreo(
      usuarios,
      correo,
      idNumerico
    )
  ) {
    throw crearErrorHttp(
      "Ya existe otro usuario con ese correo.",
      409
    );
  }

  const usuarioModificado = {
    ...usuarioActual,
    nombre,
    correo,
    activo
  };

  usuarios[indice] = usuarioModificado;
  await guardarUsuarios(usuarios);

  return usuarioModificado;
}

export async function eliminarUsuario(id) {
  const usuarios = await obtenerUsuarios();
  const idNumerico = validarId(id);

  const indice = usuarios.findIndex(
    (usuario) => usuario.id === idNumerico
  );

  if (indice === -1) {
    throw crearErrorHttp(
      "Usuario no encontrado.",
      404
    );
  }

  const [usuarioEliminado] = usuarios.splice(
    indice,
    1
  );

  await guardarUsuarios(usuarios);

  return usuarioEliminado;
}