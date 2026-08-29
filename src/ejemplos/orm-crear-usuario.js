import "dotenv/config";
import {
  sequelize
} from "../config/sequelize.js";
import {
  Usuario
} from "../models/Usuario.js";

try {
  const usuario =
    await Usuario.create({
      nombre:
        "Javier Mora",
      correo:
        "javier@example.com",
      activo:
        true
    });

  console.log(
    usuario.toJSON()
  );
} catch (error) {
  console.error(
    error.message
  );
} finally {
  await sequelize.close();
}