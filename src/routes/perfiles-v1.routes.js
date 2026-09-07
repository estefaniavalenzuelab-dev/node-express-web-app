import {
  Router
} from "express";

import {
  subirImagenPerfil
} from "../controllers/perfil-imagen.controller.js";

const router =
  Router();

router.post(
  "/:id/imagen",
  subirImagenPerfil
);

export default router;