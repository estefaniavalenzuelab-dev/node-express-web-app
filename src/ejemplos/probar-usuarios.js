import {
  obtenerUsuarioPorId,
  obtenerUsuarios
} from "../services/usuarios.service.js";

async function ejecutar() {
  try {
    const usuarios = await obtenerUsuarios();

    console.table(usuarios);

    const usuario = await obtenerUsuarioPorId(2);

    console.log("Usuario encontrado:", usuario);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

ejecutar();