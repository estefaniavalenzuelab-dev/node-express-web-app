import {
  Perfil,
  Pedido,
  Rol,
  Usuario
} from "../models/index.js";
import { validarNombre, validarCorreo, convertirBooleano } from "../utils/validaciones.js";
import {
  Op
} from "sequelize";

export async function obtenerUsuariosOrm() {
  const usuarios =
    await Usuario.findAll({
      attributes: [
        "id",
        "nombre",
        "correo",
        "activo",
        "createdAt",
        "updatedAt"
      ],
      order: [
        [
          "id",
          "ASC"
        ]
      ]
    });

  return usuarios.map(
    (usuario) =>
      usuario.toJSON()
  );
}

export async function obtenerUsuarioOrm(
  id
) {
  const idNumerico =
    (id);

  return Usuario.findByPk(
    idNumerico
  );
}
export async function crearUsuarioOrm(
  datos
) {
  const nombre =
    validarNombre(
      datos.nombre
    );

  const correo =
    validarCorreo(
      datos.correo
    );

  const activo =
    datos.activo === undefined
      ? true
      : convertirBooleano(
          datos.activo
        );

  return Usuario.create({
    nombre,
    correo,
    activo
  });
}

export async function modificarUsuarioOrm(
  id,
  datos
) {
  const idNumerico =
    (id);

  const usuario =
    await Usuario.findByPk(
      idNumerico
    );

  if (!usuario) {
    return null;
  }

  const cambios = {};

  if (datos.nombre !== undefined) {
    cambios.nombre =
      validarNombre(
        datos.nombre
      );
  }

  if (datos.correo !== undefined) {
    cambios.correo =
      validarCorreo(
        datos.correo
      );
  }

  if (datos.activo !== undefined) {
    cambios.activo =
      convertirBooleano(
        datos.activo
      );
  }

  await usuario.update(
    cambios
  );

  return usuario;
}

export async function eliminarUsuarioOrm(
  id
) {
  const idNumerico =
    (id);

  const usuario =
    await Usuario.findByPk(
      idNumerico
    );

  if (!usuario) {
    return null;
  }

  const datos =
    usuario.toJSON();

  await usuario.destroy();

  return datos;
}



export async function obtenerUsuarioConRelaciones(id) {
  const idNumerico = parseInt(id, 10);  // ← AGREGAR ESTA LÍNEA
  
  if (isNaN(idNumerico)) {
    return null;
  }
  
  const usuario =
    await Usuario.findByPk(
      idNumerico,  // ← USAR idNumerico en lugar de id
      {
        attributes: [
          "id",
          "nombre",
          "correo",
          "activo",
          "createdAt",
          "updatedAt"
        ],

        include: [
          {
            model:
              Perfil,
            as:
              "perfil"
          },

          {
            model:
              Pedido,
            as:
              "pedidos",
            separate:
              true,
            order: [
              [
                "createdAt",
                "DESC"
              ]
            ]
          },

          {
            model:
              Rol,
            as:
              "roles",
            through: {
              attributes: [
                "asignadoPor",
                "asignadoAt"
              ]
            }
          }
        ]
      }
    );

  return usuario
    ? usuario.toJSON()
    : null;
}

export async function obtenerUsuarioConPedidos(
  id
) {
  const idNumerico =
    (id);

  return Usuario.findByPk(
    idNumerico,
    {
      attributes: [
        "id",
        "nombre",
        "correo",
        "activo"
      ],

      include: [
        {
          model:
            Pedido,
          as:
            "pedidos",
          attributes: [
            "id",
            "fecha",
            "estado",
            "total"
          ]
        }
      ]
    }
  );
}

export async function buscarUsuariosOrm(
  filtros = {}
) {
  const where = {};

  if (
    filtros.nombre !==
    undefined
  ) {
    const nombre =
      String(
        filtros.nombre
      ).trim();

    if (nombre) {
      where.nombre = {
        [Op.iLike]:
          `%${nombre}%`
      };
    }
  }

  if (
    filtros.activo !==
    undefined
  ) {
    if (
      filtros.activo !==
        "true" &&
      filtros.activo !==
        "false"
    ) {
      const error =
        new Error(
          "El filtro activo debe ser true o false."
        );

      error.statusCode =
        400;

      throw error;
    }

    where.activo =
      filtros.activo ===
      "true";
  }

  const usuarios =
    await Usuario.findAll({
      where,
      attributes: [
        "id",
        "nombre",
        "correo",
        "activo",
        "createdAt",
        "updatedAt"
      ],
      order: [
        [
          "id",
          "ASC"
        ]
      ]
    });

  return usuarios.map(
    (usuario) =>
      usuario.toJSON()
  );
}