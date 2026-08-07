import { readFile } from "node:fs/promises";
import { RUTA_USUARIOS } from "../utils/rutas.js";

async function ejecutar() {
  try {
    console.log("Inicio de lectura");

    const contenido = await readFile(RUTA_USUARIOS, "utf8");

    console.log("Archivo leído");
    console.log(contenido);
  } catch (error) {
    console.error("No fue posible leer el archivo:", error.message);
  }
}

ejecutar();