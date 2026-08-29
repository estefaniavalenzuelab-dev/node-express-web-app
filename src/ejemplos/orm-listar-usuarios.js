import "dotenv/config";
import {
  sequelize
} from "../config/sequelize.js";
import {
  Usuario
} from "../models/Usuario.js";

try {
  const usuarios =
    await Usuario.findAll({ 
                attributes: [
            "id",
            "nombre",
            "correo",
            "activo"
            ],
         order: [[
            "id",
            "ASC"
            ]],
        limit: 10,
  where: {
    activo: true
  }
}
);

  console.table(
  usuarios.map(
    (usuario) =>
      usuario.toJSON()
  )
  );
} catch (error) {
  console.error(
    error.message
  );
} finally {
  await sequelize.close();
}