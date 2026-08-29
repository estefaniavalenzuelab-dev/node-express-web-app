import {
  Router
} from "express";

import {
  actualizarUsuarioV1,
  buscarUsuarioV1,
  crearUsuarioV1,
  eliminarUsuarioV1,
  listarUsuariosV1,
  listarPedidosDeUsuarioV1
} from "../controllers/usuarios-v1.controller.js";

const router =
  Router();

router.get(
  "/",
  listarUsuariosV1
);

router.post(
  "/",
  crearUsuarioV1
);

router.get(
  "/:id/pedidos",
  listarPedidosDeUsuarioV1
);

router.get(
  "/:id",
  buscarUsuarioV1
);

router.put(
  "/:id",
  actualizarUsuarioV1
);

router.delete(
  "/:id",
  eliminarUsuarioV1
);

export default router;