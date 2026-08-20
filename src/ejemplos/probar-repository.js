import "dotenv/config";
import {
  pool
} from "../config/database.js";
import {
  buscarTodos
} from "../repositories/usuarios.repository.js";

try {
  const usuarios = await buscarTodos();

  console.table(usuarios);
} catch (error) {
  console.error(
    "Error:",
    error.message
  );
} finally {
  await pool.end();
}