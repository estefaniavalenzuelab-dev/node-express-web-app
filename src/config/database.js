import pg from "pg";

const { Pool } = pg;

const DB_PORT = Number(
  process.env.DB_PORT || 5432
);

if (!Number.isInteger(DB_PORT)) {
  throw new Error(
    "DB_PORT debe contener un número válido."
  );
}

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000
});

pool.on("error", (error) => {
  console.error(
    "Error inesperado en el pool PostgreSQL:",
    error.message
  );
});

export async function probarConexion() {
  try {
    const resultado = await pool.query(
      "SELECT CURRENT_DATABASE() AS database, NOW() AS fecha"
    );

    console.log(
      `PostgreSQL conectado: ${resultado.rows[0].database}`
    );

    return true;
  } catch (error) {
    console.error(
      "No fue posible conectar con PostgreSQL."
    );

    throw error;
  }
}

export async function cerrarPool() {
  await pool.end();
}