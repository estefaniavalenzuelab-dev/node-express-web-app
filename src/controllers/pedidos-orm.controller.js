import {
  actualizarPedidoOrm,
  crearPedidoOrm,
  eliminarPedidoOrm,
  listarPedidosOrm,
  obtenerPedidoOrm
} from "../services/pedidos-orm.service.js";

export async function listarPedidos(
  req,
  res,
  next
) {
  try {
    res.status(
      200
    ).json({
      status:
        "ok",
      message:
        "Pedidos encontrados.",
      data:
        await listarPedidosOrm()
    });
  } catch (error) {
    next(error);
  }
}

export async function buscarPedido(
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
      return res.status(
        404
      ).json({
        status:
          "error",
        message:
          "Pedido no encontrado.",
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
        "Pedido encontrado.",
      data:
        pedido
    });
  } catch (error) {
    next(error);
  }
}

export async function registrarPedido(
  req,
  res,
  next
) {
  try {
    const pedido =
      await crearPedidoOrm(
        req.body
      );

    res.status(
      201
    ).json({
      status:
        "ok",
      message:
        "Pedido creado.",
      data:
        pedido
    });
  } catch (error) {
    next(error);
  }
}

export async function modificarPedido(
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
      return res.status(
        404
      ).json({
        status:
          "error",
        message:
          "Pedido no encontrado.",
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
        "Pedido actualizado.",
      data:
        pedido
    });
  } catch (error) {
    next(error);
  }
}

export async function borrarPedido(
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
      return res.status(
        404
      ).json({
        status:
          "error",
        message:
          "Pedido no encontrado.",
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
        "Pedido eliminado.",
      data:
        pedido
    });
  } catch (error) {
    next(error);
  }
}