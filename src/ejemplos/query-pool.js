import "dotenv/config";
import {
  pool
} from "../config/database.js";

try {
  const resultado = await pool.query(`
    SELECT
      id,
      nombre,
      correo,
      activo
    FROM usuarios
    ORDER BY id
  `);

console.dir(resultado, {
  depth: 4
});
  
  console.table(resultado.rows);
} catch (error) {
  console.error(
    "No fue posible consultar usuarios:",
    error.message
  );
} finally {
  await pool.end();
}