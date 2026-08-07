import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
crearUsuario,
eliminarUsuario,
modificarUsuario,
obtenerUsuarioPorId,
obtenerUsuarios
} from "./services/usuarios.service.js";
import {
mostrarError,
mostrarExito,
mostrarTitulo
} from "./utils/consola.js";

function mostrarUsuario(usuario) {
console.table([usuario]);
}

await yargs(hideBin(process.argv))
.scriptName("usuarios")
.usage("$0 <comando> [opciones]")

.command({
command: "listar",
describe: "Muestra todos los usuarios",
handler: async () => {
const usuarios = await obtenerUsuarios();

mostrarTitulo(
`Usuarios encontrados: ${usuarios.length}`
);

console.table(usuarios);
}
})

.command({
command: "buscar",
describe: "Busca un usuario por ID",
builder: {
id: {
describe: "Identificador del usuario",
type: "number",
demandOption: true
}
},
handler: async (argv) => {
const usuario = await obtenerUsuarioPorId(
argv.id
);

if (!usuario) {
throw new Error("Usuario no encontrado.");
}

mostrarUsuario(usuario);
}
})

.command({
command: "crear",
describe: "Crea un usuario",
builder: {
nombre: {
describe: "Nombre del usuario",
type: "string",
demandOption: true
},
correo: {
describe: "Correo del usuario",
type: "string",
demandOption: true
},
activo: {
describe: "Estado del usuario",
type: "boolean",
default: true
}
},
handler: async (argv) => {
const usuario = await crearUsuario({
nombre: argv.nombre,
correo: argv.correo,
activo: argv.activo
});

mostrarExito(
`Usuario ${usuario.id} creado.`
);

mostrarUsuario(usuario);
}
})

.command({
command: "modificar",
describe: "Modifica un usuario",
builder: {
id: {
describe: "Identificador",
type: "number",
demandOption: true
},
nombre: {
describe: "Nuevo nombre",
type: "string"
},
correo: {
describe: "Nuevo correo",
type: "string"
},
activo: {
describe: "Nuevo estado",
type: "boolean"
}
},
handler: async (argv) => {
const tieneCambios =
argv.nombre !== undefined ||
argv.correo !== undefined ||
argv.activo !== undefined;

if (!tieneCambios) {
throw new Error(
"Debes indicar al menos un dato para modificar."
);
}

const usuario = await modificarUsuario(argv.id, {
nombre: argv.nombre,
correo: argv.correo,
activo: argv.activo
});

mostrarExito(
`Usuario ${usuario.id} modificado.`
);

mostrarUsuario(usuario);
}
})

.command({
command: "eliminar",
describe: "Elimina un usuario",
builder: {
id: {
describe: "Identificador",
type: "number",
demandOption: true
}
},
handler: async (argv) => {
const usuario = await eliminarUsuario(
argv.id
);

mostrarExito(
`Usuario ${usuario.id} eliminado.`
);

mostrarUsuario(usuario);
}
})

.demandCommand(
1,
"Debes indicar un comando."
)
.strict()
.help()
.fail((mensaje, error, yargsInstance) => {
if (mensaje) {
mostrarError(mensaje);
}

if (error) {
mostrarError(error.message);
}

console.log(yargsInstance.help());
process.exitCode = 1;
})
.parseAsync();