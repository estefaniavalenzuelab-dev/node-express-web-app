import { Router } from "express";
import {
  mostrarEstado,
  mostrarInicio
} from "../controllers/index.controller.js";

const router = Router();

router.get("/", mostrarInicio);
router.get("/status", mostrarEstado);

export default router;