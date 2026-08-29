import {
  appendFile
} from "node:fs/promises";
import path from "node:path";
import {
  fileURLToPath
} from "node:url";

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

const RUTA_LOG = path.resolve(
  __dirname,
  "../../logs/transacciones.log"
);

export async function registrarFalloTransaccion(
  error,
  contexto = {}
) {
  const entrada = {
    fecha:
      new Date().toISOString(),
    tipo:
      "TRANSACCION_FALLIDA",
    mensaje:
      error.message,
    contexto
  };

  await appendFile(
    RUTA_LOG,
    JSON.stringify(entrada) + "\n",
    "utf8"
  );
}