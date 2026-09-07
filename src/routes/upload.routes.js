import {
  Router
} from "express";

import {
  eliminarArchivoController,
  subirArchivo
} from "../controllers/upload.controller.js";

const router =
  Router();

router.post(
  "/",
  subirArchivo
);

router.delete(
  "/:nombre",
  eliminarArchivoController
);

export default router;