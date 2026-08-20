import { Router } from "express";
import {
  mostrarUsuario,
  mostrarUsuarios
} from "../controllers/usuarios.controller.js";
import { validarIdUsuario } from "../middlewares/validarIdUsuario.js";
import { crearUsuario } from "../services/usuarios.service.js";
import { mostrarFormularioNuevoUsuario, crearUsuarioWeb, mostrarFormularioEditarUsuario, actualizarUsuarioWeb, eliminarUsuarioWeb } from "../controllers/usuarios-web.controller.js";

const router = Router();

router.get("/usuarios", mostrarUsuarios);
router.get(
  "/usuarios/:id",
  validarIdUsuario,
  mostrarUsuario
);

router.get(
  "/usuarios-nuevo",
  mostrarFormularioNuevoUsuario
);

router.post(
  "/usuarios",
  crearUsuarioWeb
);

router.get(
  "/usuarios/:id/editar",
  mostrarFormularioEditarUsuario
);

router.post(
  "/usuarios/:id/editar",
  actualizarUsuarioWeb
);

router.post(
  "/usuarios/:id/eliminar",
  eliminarUsuarioWeb
);

export default router;