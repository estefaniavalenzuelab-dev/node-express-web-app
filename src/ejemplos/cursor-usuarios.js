import "dotenv/config";
import Cursor from "pg-cursor";
import {
  pool
} from "../config/database.js";

const client =
  await pool.connect();

let cursor;

try {
  cursor = client.query(
    new Cursor(`
      SELECT
        id,
        nombre,
        correo,
        activo
      FROM usuarios
      ORDER BY id
    `)
  );

  let terminado = false;

  while (!terminado) {
    const filas =
      await cursor.read(2);

    if (filas.length === 0) {
      terminado = true;
      continue;
    }

    console.table(filas);
  }
} catch (error) {
  console.error(
    "Error al procesar cursor:",
    error.message
  );
} finally {
  if (cursor) {
    await cursor.close();
  }

  client.release();
  await pool.end();
}