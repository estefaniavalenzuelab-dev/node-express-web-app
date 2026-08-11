import "dotenv/config";
import {
  pool,
  probarConexion
} from "../config/database.js";

try {
  await probarConexion();
} catch (error) {
  console.error(error.message);
} finally {
  await pool.end();
}