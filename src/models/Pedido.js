import {
  DataTypes,
  Model
} from "sequelize";

import {
  sequelize
} from "../config/sequelize.js";

export class Pedido extends Model {
}

Pedido.init(
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

    fecha: {
      type:
        DataTypes.DATE,
      allowNull:
        false,
      defaultValue:
        DataTypes.NOW
    },

    estado: {
      type:
        DataTypes.STRING(40),
      allowNull:
        false,
      defaultValue:
        "pendiente"
    },

    total: {
      type:
        DataTypes.DECIMAL(
          12,
          2
        ),
      allowNull:
        false,
      defaultValue:
        0
    }
  },
  {
    sequelize,
    modelName:
      "Pedido",
    tableName:
      "pedidos",
    timestamps:
      true,
    underscored:
      true
  }
);