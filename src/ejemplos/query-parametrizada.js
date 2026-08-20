import "dotenv/config";
import {
  pool
} from "../config/database.js";

const id = 1;

try {
  const resultado = await pool.query(
    `
      SELECT
        id,
        nombre,
        correo,
        activo
      FROM usuarios
      WHERE id = $1
    `,
    [id]
  );

  console.table(resultado.rows);
} catch (error) {
  console.error(error.message);
} finally {
  await pool.end();
}