import {
  obtenerUsuariosOrm,
  obtenerUsuarioConRelaciones,
  obtenerUsuarioConPedidos
} from "../services/usuarios-orm.service.js";

export async function listarUsuariosOrm(
  req,
  res,
  next
) {
  try {
    const usuarios =
      await obtenerUsuariosOrm();

    res.status(200).json({
      status:
        "ok",
      message:
        "Usuarios obtenidos mediante Sequelize",
      data:
        usuarios,
      meta: {
        total:
          usuarios.length,
        acceso:
          "ORM"
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function obtenerUsuarioRelacionado(
  req,
  res,
  next
) {
  try {
    const usuario =
      await obtenerUsuarioConRelaciones(
        req.params.id
      );

    if (!usuario) {
      return res.status(
        404
      ).json({
        status:
          "error",
        message:
          "Usuario no encontrado.",
        data:
          null
      });
    }

    return res.status(
      200
    ).json({
      status:
        "ok",
      message:
        "Usuario y relaciones obtenidos.",
      data:
        usuario
    });
  } catch (error) {
    next(error);
  }
}

export async function obtenerUsuarioConPedidosController(
  req,
  res,
  next
) {
  try {
    const usuario =
      await obtenerUsuarioConPedidos(
        req.params.id
      );

    if (!usuario) {
      return res.status(404).json({
        status:
          "error",
        message:
          "Usuario no encontrado",
        data:
          null
      });
    }

    return res.status(200).json({
      status:
        "ok",
      message:
        "Usuario con pedidos",
      data:
        usuario
    });
  } catch (error) {
    next(error);
  }
}