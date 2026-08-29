import {
  DataTypes,
  Model
} from "sequelize";

import {
  sequelize
} from "../config/sequelize.js";

export class UsuarioRol extends Model {
}

UsuarioRol.init(
  {
    id: {
      type:
        DataTypes.INTEGER,
      primaryKey:
        true,
      autoIncrement:
        true
    },

    usuarioId: {
      type:
        DataTypes.INTEGER,
      allowNull:
        false,
      field:
        "usuario_id"
    },

    rolId: {
      type:
        DataTypes.INTEGER,
      allowNull:
        false,
      field:
        "rol_id"
    },

    fechaAsignacion: {
      type:
        DataTypes.DATE,
      allowNull:
        false,
      defaultValue:
        DataTypes.NOW,
      field:
        "fecha_asignacion"
    },

    asignadoPor: {
      type:
        DataTypes.STRING(120),
      allowNull:
        true,
      field:
        "asignado_por"
    }
  },
  {
    sequelize,
    modelName:
      "UsuarioRol",
    tableName:
      "usuario_roles",
    timestamps:
      false,
    indexes: [
      {
        unique:
          true,
        fields: [
          "usuario_id",
          "rol_id"
        ]
      }
    ]
  }
);