import { Router } from "express";
import {
  mostrarUsuario,
  mostrarUsuarios
} from "../controllers/usuarios.controller.js";
import { validarIdUsuario } from "../middlewares/validarIdUsuario.js";

const router = Router();

router.get("/usuarios", mostrarUsuarios);
router.get(
  "/usuarios/:id",
  validarIdUsuario,
  mostrarUsuario
);

export default router;