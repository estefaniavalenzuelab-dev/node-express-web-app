import {
  actualizarPedidoOrm,
  crearPedidoOrm,
  eliminarPedidoOrm,
  listarPedidosOrm,
  obtenerPedidoOrm
} from "../services/pedidos-orm.service.js";

function serializarPedido(
  pedido
) {
  const plano =
    typeof pedido?.toJSON ===
    "function"
      ? pedido.toJSON()
      : pedido;

  return {
    ...plano,
    links: {
      self:
        `/api/v1/pedidos/${plano.id}`,
      usuario:
        `/api/v1/usuarios/${plano.usuarioId}`
    }
  };
}

export async function listarPedidosV1(
  req,
  res,
  next
) {
  try {
    const pedidos =
      await listarPedidosOrm();

    return res
      .status(200)
      .json({
        status:
          "ok",
        message:
          "Pedidos encontrados.",
        data:
          pedidos.map(
            serializarPedido
          )
      });
  } catch (error) {
    next(error);
  }
}

export async function buscarPedidoV1(
  req,
  res,
  next
) {
  try {
    const pedido =
      await obtenerPedidoOrm(
        req.params.id
      );

    if (!pedido) {
      return res
        .status(404)
        .json({
          status:
            "error",
          message:
            "Pedido no encontrado.",
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
          "Pedido encontrado.",
        data:
          serializarPedido(
            pedido
          )
      });
  } catch (error) {
    next(error);
  }
}

export async function crearPedidoV1(
  req,
  res,
  next
) {
  try {
    const pedido =
      await crearPedidoOrm(
        req.body
      );

    return res
      .status(201)
      .json({
        status:
          "ok",
        message:
          "Pedido creado.",
        data:
          serializarPedido(
            pedido
          )
      });
  } catch (error) {
    next(error);
  }
}

export async function actualizarPedidoV1(
  req,
  res,
  next
) {
  try {
    const pedido =
      await actualizarPedidoOrm(
        req.params.id,
        req.body
      );

    if (!pedido) {
      return res
        .status(404)
        .json({
          status:
            "error",
          message:
            "Pedido no encontrado.",
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
          "Pedido actualizado.",
        data:
          serializarPedido(
            pedido
          )
      });
  } catch (error) {
    next(error);
  }
}

export async function eliminarPedidoV1(
  req,
  res,
  next
) {
  try {
    const pedido =
      await eliminarPedidoOrm(
        req.params.id
      );

    if (!pedido) {
      return res
        .status(404)
        .json({
          status:
            "error",
          message:
            "Pedido no encontrado.",
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
          "Pedido eliminado.",
        data:
          serializarPedido(
            pedido
          )
      });
  } catch (error) {
    next(error);
  }
}