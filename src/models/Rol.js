import {
  DataTypes,
  Model
} from "sequelize";

import {
  sequelize
} from "../config/sequelize.js";

export class Rol extends Model {
}

Rol.init(
  {
    id: {
      type:
        DataTypes.INTEGER,
      primaryKey:
        true,
      autoIncrement:
        true
    },

    nombre: {
      type:
        DataTypes.STRING(80),
      allowNull:
        false,
      unique:
        true
    }
  },
  {
    sequelize,
    modelName:
      "Rol",
    tableName:
      "roles",
    timestamps:
      true,
    underscored:
      true
  }
);