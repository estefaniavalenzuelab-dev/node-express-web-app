import {
  DataTypes,
  Model
} from "sequelize";

import {
  sequelize
} from "../config/sequelize.js";

export class Perfil extends Model {
}

Perfil.init(
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
      unique:
        true,
      field:
        "usuario_id"
    },

    telefono: {
      type:
        DataTypes.STRING(40),
      allowNull:
        true
    },

    direccion: {
      type:
        DataTypes.STRING(250),
      allowNull:
        true
    },

    fechaNacimiento: {
      type:
        DataTypes.DATEONLY,
      allowNull:
        true,
      field:
        "fecha_nacimiento"
    },

    imagen: {
  type:
    DataTypes.STRING(255),

  allowNull:
    true,

  field:
    "imagen"
}
  },
  {
    sequelize,
    modelName:
      "Perfil",
    tableName:
      "perfiles",
    timestamps:
      true,
    underscored:
      true
  }
);