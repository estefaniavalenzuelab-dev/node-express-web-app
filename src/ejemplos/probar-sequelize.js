import {
  Sequelize
} from "sequelize";
export async function probarSequelize() {
  try {
    await sequelize.authenticate();

    console.log(
      "Sequelize conectado correctamente."
    );

    return true;
  } catch (error) {
    console.error(
      "Error de conexión Sequelize:",
      error.message
    );

    throw error;
  }
}