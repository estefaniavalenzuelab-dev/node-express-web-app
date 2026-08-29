import {
  buscarUsuariosOrm,
  crearUsuarioOrm,
  eliminarUsuarioOrm,
  modificarUsuarioOrm,
  obtenerUsuarioOrm,
  obtenerUsuarioConPedidos
} from "../services/usuarios-orm.service.js";

function crearLinksUsuario(
  usuario
) {
  return {
    self:
      `/api/v1/usuarios/${usuario.id}`,
    pedidos:
      `/api/v1/usuarios/${usuario.id}/pedidos`
  };
}

function serializarUsuario(
  usuario
) {
  const plano =
    typeof usuario?.toJSON ===
    "function"
      ? usuario.toJSON()
      : usuario;

  return {
    ...plano,
    links:
      crearLinksUsuario(
        plano
      )
  };
}

export async function listarUsuariosV1(
  req,
  res,
  next
) {
  try {
    const usuarios =
      await buscarUsuariosOrm({
        nombre:
          req.query.nombre,
        activo:
          req.query.activo
      });

    return res
      .status(200)
      .json({
        status:
          "ok",
        message:
          "Usuarios encontrados.",
        data:
          usuarios.map(
            serializarUsuario
          )
      });
  } catch (error) {
    next(error);
  }
}

export async function buscarUsuarioV1(
  req,
  res,
  next
) {
  try {
    const usuario =
      await obtenerUsuarioOrm(
        req.params.id
      );

    if (!usuario) {
      return res
        .status(404)
        .json({
          status:
            "error",
          message:
            "Usuario no encontrado.",
          data:
            null
        });
    }

    return res
      .status(200)
      .json({
        status:
          "ok",
        message:
          "Usuario encontrado.",
        data:
          serializarUsuario(
            usuario
          )
      });
  } catch (error) {
    next(error);
  }
}

export async function crearUsuarioV1(
  req,
  res,
  next
) {
  try {
    const usuario =
      await crearUsuarioOrm(
        req.body
      );

    return res
      .status(201)
      .json({
        status:
          "ok",
        message:
          "Usuario creado.",
        data:
          serializarUsuario(
            usuario
          )
      });
  } catch (error) {
    next(error);
  }
}

export async function actualizarUsuarioV1(
  req,
  res,
  next
) {
  try {
    const usuario =
      await modificarUsuarioOrm(
        req.params.id,
        req.body
      );

    if (!usuario) {
      return res
        .status(404)
        .json({
          status:
            "error",
          message:
            "Usuario no encontrado.",
          data:
            null
        });
    }

    return res
      .status(200)
      .json({
        status:
          "ok",
        message:
          "Usuario actualizado.",
        data:
          serializarUsuario(
            usuario
          )
      });
  } catch (error) {
    next(error);
  }
}

export async function eliminarUsuarioV1(
  req,
  res,
  next
) {
  try {
    const usuario =
      await eliminarUsuarioOrm(
        req.params.id
      );

    if (!usuario) {
      return res
        .status(404)
        .json({
          status:
            "error",
          message:
            "Usuario no encontrado.",
          data:
            null
        });
    }

    return res
      .status(200)
      .json({
        status:
          "ok",
        message:
          "Usuario eliminado.",
        data:
          serializarUsuario(
            usuario
          )
      });
  } catch (error) {
    next(error);
  }
}

export async function listarPedidosDeUsuarioV1(
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
      return res
        .status(404)
        .json({
          status:
            "error",
          message:
            "Usuario no encontrado.",
          data:
            null
        });
    }

    const plano =
      typeof usuario.toJSON ===
      "function"
        ? usuario.toJSON()
        : usuario;

    return res
      .status(200)
      .json({
        status:
          "ok",
        message:
          "Pedidos del usuario encontrados.",
        data: {
          ...plano,
          links: {
            self:
              `/api/v1/usuarios/${plano.id}`,
            pedidos:
              `/api/v1/usuarios/${plano.id}/pedidos`
          }
        }
      });
  } catch (error) {
    next(error);
  }
}