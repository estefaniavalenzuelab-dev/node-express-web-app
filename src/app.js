import "dotenv/config";
import express from "express";
import morgan from "morgan";
import hbs from "hbs";
import { pool, probarConexion } from "./config/database.js";
import { validarVariablesEntorno } from "./config/env.js";

validarVariablesEntorno(); 
import { registrarHelpersHandlebars } from "./config/handlebars.js";
import { agregarContextoPeticion } from "./middlewares/agregarContextoPeticion.js";
import { agregarDatosVista } from "./middlewares/agregarDatosVista.js";
import { manejarErrores } from "./middlewares/manejarErrores.js";
import {
  registrarAcceso
} from "./middlewares/registrarAcceso.js";
import { rutaNoEncontrada } from "./middlewares/rutaNoEncontrada.js";
import indexRouter from "./routes/index.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";
import webRouter from "./routes/web.routes.js";
import { obtenerMensajeInicio } from "./utils/mensajes.js";
import { RUTA_PARTIALS, RUTA_PUBLIC, RUTA_VIEWS } from "./utils/rutas.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.locals.nombreAplicacion = "Node & Express Web App";
app.locals.anioActual = new Date().getFullYear();

app.set("view engine", "hbs");
app.set("views", RUTA_VIEWS);

hbs.registerPartials(RUTA_PARTIALS);
registrarHelpersHandlebars();

app.use(morgan("dev"));
app.use(agregarContextoPeticion);
app.use(registrarAcceso);
app.use(agregarDatosVista);


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.static(RUTA_PUBLIC));

app.use("/", indexRouter);
app.use("/", webRouter);
app.use("/api/usuarios", usuariosRouter);

app.use(rutaNoEncontrada);
app.use(manejarErrores);

try {
  await probarConexion();
} catch (error) {
  console.error("La aplicación no puede iniciar sin base de datos.");

  console.error(error.message);

  process.exitCode = 1;
  throw error;
}


const servidor = app.listen(PORT, () => {
  console.log(obtenerMensajeInicio(PORT));
});

let cerrando = false;

async function cerrarAplicacion(senal) {
  if (cerrando) {
    return;
  }

  cerrando = true;

  console.log(`\nSe recibió ${senal}. Cerrando aplicación...`);

  servidor.close(async (error) => {
    try {
      await pool.end();
      console.log("Pool PostgreSQL cerrado.");
    } catch (dbError) {
      console.error("Error al cerrar PostgreSQL:", dbError.message);

      process.exitCode = 1;
    }

    if (error) {
      console.error("Error al cerrar Express:", error.message);

      process.exitCode = 1;
      return;
    }

    console.log("Aplicación cerrada.");
  });
}

process.on("SIGINT", () => {
  cerrarAplicacion("SIGINT");
});

process.on("SIGTERM", () => {
  cerrarAplicacion("SIGTERM");
});

process.on("SIGINT", () => {
  cerrarAplicacion("SIGINT");
});

process.on("SIGTERM", () => {
  cerrarServidor("SIGTERM");
});

// import "dotenv/config";
// import express from "express";
// import { obtenerMensajeInicio } from "./utils/mensajes.js";
// import { obtenerUsuarios, obtenerUsuarioPorId, obtenerUsuariosActivos } from "./services/usuarios.service.js";
// import morgan from "morgan";

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(morgan("dev"));

// app.get("/", (req, res) => {
//   res.send("<h1>Node & Express Web App</h1><p>Servidor funcionando.</p>");
// });

// app.get("/acerca", (req, res) => {
//   res.send(`
//     <h1>Acerca del proyecto</h1>
//     <p>Nombre: Node & Express Web App</p>
//     <p>Versión: 1.0.0</p>
//     <p>Autor: Francisco</p>
//   `);
// });

// app.get("/status", (req, res) => {
//   res.json({
//     status: "ok",
//     message: "Servidor funcionando",
//     data: {
//       node: process.version,
//       pid: process.pid,
//       uptime: process.uptime(),
//       environment: process.env.NODE_ENV || "development"
//     }
//   });
// });

// app.get("/api/usuarios", async (req, res) => {
//   try {
//     const usuarios = await obtenerUsuarios();

//     res.json({
//       status: "ok",
//       message: "Usuarios encontrados",
//       data: usuarios
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       status: "error",
//       message: "No fue posible obtener los usuarios",
//       data: null
//     });
//   }
// });

// app.get("/api/usuarios/:id", async (req, res) => {
//   try {
//     const usuario = await obtenerUsuarioPorId(req.params.id);

//     if (!usuario) {
//       res.status(404).json({
//         status: "error",
//         message: "Usuario no encontrado",
//         data: null
//       });
//       return;
//     }

//     res.json({
//       status: "ok",
//       message: "Usuario encontrado",
//       data: usuario
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "error",
//       message: error.message,
//       data: null
//     });
//   }
// });

// app.get("/api/usuarios-activos", async (req, res) => {
// try {
// const usuariosActivos = await obtenerUsuariosActivos();

// res.json({
// status: "ok",
// message: "Usuarios activos encontrados",
// data: usuariosActivos
// });
// } catch (error) {
// console.error(error);

// res.status(500).json({
// status: "error",
// message: "No fue posible obtener usuarios activos",
// data: null
// });
// }
// });

// app.listen(PORT, () => {
//   console.log(obtenerMensajeInicio(PORT));
// });
