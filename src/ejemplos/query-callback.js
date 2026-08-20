import "dotenv/config";
import {
  pool
} from "../config/database.js";

console.log("Inicio");

pool.query(
  `
    SELECT
      id,
      nombre,
      correo,
      activo
    FROM usuarios
    ORDER BY id
  `,
  async (error, resultado) => {
    if (error) {
      console.error(
        "Error de consulta:",
        error.message
      );

      await pool.end();
      return;
    }

    console.table(resultado.rows);

    await pool.end();
  }
);

console.log("Fin del código síncrono");