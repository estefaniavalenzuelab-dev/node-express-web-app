import { Router } from "express";
import {
  actualizarUsuario,
  borrarUsuario,
  buscarUsuario,
  listarUsuarios,
  registrarUsuario,
} from "../controllers/usuarios.controller.js";
import {
  validarIdUsuario
} from "../middlewares/validarIdUsuario.js";

import {
  registrarUsuarioCompletoController
} from "../controllers/usuarios-api.controller.js";

const router = Router();



router.get("/", listarUsuarios);

router.get(
  "/:id",
  validarIdUsuario,
  buscarUsuario
);

router.post(
  "/registro-completo",
  registrarUsuarioCompletoController
);

router.post("/", registrarUsuario);

router.put(
  "/:id",
  validarIdUsuario,
  actualizarUsuario
);

//router.patch(
 // "/:id",
//  validarIdUsuario,
//  actualizarUsuario
//);

router.delete(
  "/:id",
  validarIdUsuario,
  borrarUsuario
);

export default router;