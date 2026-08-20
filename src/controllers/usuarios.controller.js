import {
  crearUsuario,
  eliminarUsuario,
  modificarUsuario,
  obtenerUsuarioPorId,
  obtenerUsuarios,
  obtenerUsuariosConFiltros
} from "../services/usuarios.service.js";

import { crearErrorHttp } from "../utils/errores.js";

export async function listarUsuarios(
  req,
  res,
  next
) {
  try {
    const usuarios =
      await obtenerUsuariosConFiltros(
        req.query
      );

    res.status(200).json({
      status: "ok",
      message: "Usuarios encontrados",
      data: usuarios,
      meta: {
        total: usuarios.length,
        filters: {
          nombre:
            req.query.nombre ?? null,
          activo:
            req.query.activo ?? null
        }
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function buscarUsuario(req, res, next) {
  try {
    const usuario = await obtenerUsuarioPorId(req.usuarioId);

    if (!usuario) {
      throw crearErrorHttp("Usuario no encontrado.", 404);
    }

    res.status(200).json({
      status: "ok",
      message: "Usuario encontrado",
      data: usuario
    });
  } catch (error) {
    next(error);
  }
}

export async function mostrarUsuarios(req, res, next) {
  try {
    let usuarios = await obtenerUsuarios();
    const { activo, nombre } = req.query;

    if (activo === "true" || activo === "false") {
      const valorActivo = activo === "true";

      usuarios = usuarios.filter(
        (usuario) => usuario.activo === valorActivo
      );
    }

    if (nombre) {
      const texto = nombre.trim().toLowerCase();

      usuarios = usuarios.filter((usuario) =>
        usuario.nombre.toLowerCase().includes(texto)
      );
    }

    res.status(200).render("usuarios", {
      titulo: "Gestión de usuarios",
      usuarios,
      hayUsuarios: usuarios.length > 0,
      totalUsuarios: usuarios.length,
      filtros: {
        activo: activo ?? "",
        nombre: nombre ?? ""
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function mostrarUsuario(req, res, next) {
  try {
    const usuario = await obtenerUsuarioPorId(req.usuarioId);

    if (!usuario) {
      throw crearErrorHttp("Usuario no encontrado.", 404);
    }

    res.status(200).render("usuario", {
      titulo: usuario.nombre,
      usuario
    });
  } catch (error) {
    next(error);
  }
}

export async function registrarUsuario(
  req,
  res,
  next
) {
  try {
    const usuario = await crearUsuario(req.body);

    res.status(201).json({
      status: "ok",
      message: "Usuario creado correctamente.",
      data: usuario
    });
  } catch (error) {
    next(error);
  }
}

export async function actualizarUsuario(
  req,
  res,
  next
) {
  try {
    const usuario = await modificarUsuario(
      req.usuarioId,
      req.body
    );

    res.status(200).json({
      status: "ok",
      message: "Usuario modificado correctamente.",
      data: usuario
    });
  } catch (error) {
    next(error);
  }
}

export async function borrarUsuario(
  req,
  res,
  next
) {
  try {
    const usuario = await eliminarUsuario(
      req.usuarioId
    );

    res.status(200).json({
      status: "ok",
      message: "Usuario eliminado correctamente.",
      data: usuario
    });
  } catch (error) {
    next(error);
  }
}

export async function crearUsuarioController(
  req,
  res,
  next
) {
  try {
    const usuario =
      await crearUsuario(req.body);

    res.status(201).json({
      status: "ok",
      message: "Usuario creado",
      data: usuario
    });
  } catch (error) {
    next(error);
  }
}