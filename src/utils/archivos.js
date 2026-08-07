import {
  appendFile,
  mkdir,
  readFile,
  writeFile
} from "node:fs/promises";
import { dirname } from "node:path";

export async function leerJson(rutaArchivo) {
  try {
    const contenido = await readFile(rutaArchivo, "utf8");
    return JSON.parse(contenido);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("El archivo solicitado no existe.");
    }

    if (error instanceof SyntaxError) {
      throw new Error(
        "El archivo JSON contiene un formato inválido."
      );
    }

    throw new Error(
      `No fue posible leer el archivo: ${error.message}`
    );
  }
}

export async function escribirJson(rutaArchivo, datos) {
  try {
    const contenido = JSON.stringify(datos, null, 2);

    await writeFile(rutaArchivo, `${contenido}\n`, "utf8");
  } catch (error) {
    throw new Error(
      `No fue posible escribir el archivo: ${error.message}`
    );
  }
}

export async function agregarLinea(rutaArchivo, linea) {
  try {
    await mkdir(dirname(rutaArchivo), {
      recursive: true
    });

    await appendFile(
      rutaArchivo,
      `${linea}\n`,
      "utf8"
    );
  } catch (error) {
    throw new Error(
      `No fue posible agregar información al archivo: ${error.message}`
    );
  }
}