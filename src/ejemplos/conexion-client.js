import "dotenv/config";
import pg from "pg";

const { Client } = pg;

const client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

try {
  console.log("Conectando a PostgreSQL...");

  await client.connect();

  console.log("Conexión establecida.");

  const resultado = await client.query(
    "SELECT CURRENT_DATABASE() AS database, NOW() AS fecha"
  );

  console.table(resultado.rows);
} catch (error) {
  console.error(
    "No fue posible conectar con PostgreSQL."
  );

  console.error(error.message);
} finally {
  await client.end();
  console.log("Conexión cerrada.");
}