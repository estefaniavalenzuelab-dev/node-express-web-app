import {
  Usuario
} from "./Usuario.js";

import {
  Perfil
} from "./Perfil.js";

import {
  Pedido
} from "./Pedido.js";

import {
  Rol
} from "./Rol.js";

import {
  UsuarioRol
} from "./UsuarioRol.js";

Usuario.hasOne(
  Perfil,
  {
    foreignKey:
      "usuarioId",
    as:
      "perfil",
    onDelete:
      "CASCADE"
  }
);

Perfil.belongsTo(
  Usuario,
  {
    foreignKey:
      "usuarioId",
    as:
      "usuario"
  }
);

Usuario.hasMany(
  Pedido,
  {
    foreignKey:
      "usuarioId",
    as:
      "pedidos",
    onDelete:
      "CASCADE"
  }
);

Pedido.belongsTo(
  Usuario,
  {
    foreignKey:
      "usuarioId",
    as:
      "usuario"
  }
);

Usuario.belongsToMany(
  Rol,
  {
    through:
      UsuarioRol,
    foreignKey:
      "usuarioId",
    otherKey:
      "rolId",
    as:
      "roles"
  }
);

Rol.belongsToMany(
  Usuario,
  {
    through:
      UsuarioRol,
    foreignKey:
      "rolId",
    otherKey:
      "usuarioId",
    as:
      "usuarios"
  }
);

export {
  Usuario,
  Perfil,
  Pedido,
  Rol,
  UsuarioRol
};
