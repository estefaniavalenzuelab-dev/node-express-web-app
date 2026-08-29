import {
  Router
} from "express";

import {
  borrarPedido,
  buscarPedido,
  listarPedidos,
  modificarPedido,
  registrarPedido
} from "../controllers/pedidos-orm.controller.js";

const router =
  Router();

router.get(
  "/",
  listarPedidos
);

router.post(
  "/",
  registrarPedido
);

router.get(
  "/:id",
  buscarPedido
);

router.put(
  "/:id",
  modificarPedido
);

router.delete(
  "/:id",
  borrarPedido
);

export default router;