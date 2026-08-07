import {
  crearUsuario,
  eliminarUsuario,
  modificarUsuario,
  obtenerUsuarios
} from "../services/usuarios.service.js";

async function ejecutar() {
  try {
    const creado = await crearUsuario({
      nombre: "Usuario temporal",
      correo: "temporal@example.com",
      activo: true
    });

    console.log("Creado:", creado);

    const modificado = await modificarUsuario(
      creado.id,
      {
        nombre: "Usuario modificado"
      }
    );

    console.log("Modificado:", modificado);

    const eliminado = await eliminarUsuario(
      creado.id
    );

    console.log("Eliminado:", eliminado);

    console.table(await obtenerUsuarios());
  } catch (error) {
    console.error(error.message);
  }
}

ejecutar();