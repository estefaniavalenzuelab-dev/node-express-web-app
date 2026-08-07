import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const archivoActual = fileURLToPath(import.meta.url);
const directorioUtils = dirname(archivoActual);

export const RUTA_SRC = join(directorioUtils, "..");
export const RUTA_RAIZ = join(RUTA_SRC, "..");

export const RUTA_PUBLIC = join(RUTA_RAIZ, "public");
export const RUTA_VIEWS = join(RUTA_RAIZ, "views");
export const RUTA_PARTIALS = join(RUTA_VIEWS, "partials");

export const RUTA_USUARIOS = join(
  RUTA_SRC,
  "data",
  "usuarios.json"
);

export const RUTA_LOGS = join(
  RUTA_RAIZ,
  "logs"
);

export const RUTA_LOG_ACCESOS = join(
  RUTA_LOGS,
  "log.txt"
);