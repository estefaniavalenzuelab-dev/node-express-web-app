import {
  pool
} from "../config/database.js";

const resultado = await pool.query(
  "SELECT * FROM usuarios"
);