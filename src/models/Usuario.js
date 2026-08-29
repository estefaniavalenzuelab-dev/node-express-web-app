import {
  DataTypes,
  Model
} from "sequelize";
import {
  sequelize
} from "../config/sequelize.js";

export class Usuario extends Model {
}

Usuario.init(
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
        DataTypes.STRING(120),
      allowNull:
        false
    },

    correo: {
      type:
        DataTypes.STRING(180),
      allowNull:
        false,
      unique:
        true
    },

    activo: {
      type:
        DataTypes.BOOLEAN,
      allowNull:
        false,
      defaultValue:
        true
    }
  },
  {
    sequelize,
    modelName:
      "Usuario",
    tableName:
      "usuarios",
    timestamps:
      true,
    underscored:
      true
  }
);