import {
  Router
} from "express";

import {
  decodificarToken,
  login,
  registrar
} from "../controllers/auth.controller.js";

const router =
  Router();

router.post(
  "/registro",
  registrar
);

router.post(
  "/login",
  login
);

router.post(
  "/decode",
  decodificarToken
);

export default router;
