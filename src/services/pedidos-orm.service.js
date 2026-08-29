import {
  Pedido,
  Usuario
} from "../models/index.js";


export async function listarPedidosOrm() {
  const pedidos =
    await Pedido.findAll({
      include: [
        {
          model:
            Usuario,
          as:
            "usuario",
          attributes: [
            "id",
            "nombre",
            "correo"
          ]
        }
      ],
      order: [
        [
          "id",
          "ASC"
        ]
      ]
    });

  return pedidos.map(
    (pedido) =>
      pedido.toJSON()
  );
}

export async function obtenerPedidoOrm(
  id
) {
  const pedido =
    await Pedido.findByPk(
      id,
      {
        include: [
          {
            model:
              Usuario,
            as:
              "usuario",
            attributes: [
              "id",
              "nombre",
              "correo"
            ]
          }
        ]
      }
    );

  return pedido
    ? pedido.toJSON()
    : null;
}

export async function crearPedidoOrm(
  datos
) {
  const usuario =
    await Usuario.findByPk(
      datos.usuarioId
    );

  if (!usuario) {
    const error =
      new Error(
        "El usuario asociado no existe."
      );

    error.statusCode =
      400;

    throw error;
  }

  const pedido =
    await Pedido.create({
      usuarioId:
        datos.usuarioId,
      estado:
        datos.estado ??
        "pendiente",
      total:
        datos.total,
      fecha:
        datos.fecha ??
        new Date() 
    });

  return pedido.toJSON();
}

export async function actualizarPedidoOrm(
  id,
  cambios
) {
  const pedido =
    await Pedido.findByPk(
      id
    );

  if (!pedido) {
    return null;
  }

  const permitidos = [
    "estado",
    "total",
    "fecha"
  ];

  const datos =
    Object.fromEntries(
      Object.entries(
        cambios ?? {}
      ).filter(
        ([clave]) =>
          permitidos.includes(
            clave
          )
      )
    );

  await pedido.update(
    datos
  );

  return pedido.toJSON();
}

export async function eliminarPedidoOrm(
  id
) {
  const pedido =
    await Pedido.findByPk(
      id
    );

  if (!pedido) {
    return null;
  }

  const eliminado =
    pedido.toJSON();

  await pedido.destroy();

  return eliminado;
}