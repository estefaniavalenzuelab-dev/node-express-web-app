import {
  Router
} from "express";

import {
  decodificarToken,
  login,
  registrar,
  obtenerSesionJwt
} from "../controllers/auth.controller.js";

import { protegerRuta } from "../middlewares/auth.middleware.js";

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

router.get(
  "/me",
  protegerRuta,
  obtenerSesionJwt
);

export default router;
