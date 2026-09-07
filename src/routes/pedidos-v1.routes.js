import {
  Router
} from "express";

import {
  actualizarPedidoV1,
  buscarPedidoV1,
  crearPedidoV1,
  eliminarPedidoV1,
  listarPedidosV1
} from "../controllers/pedidos-v1.controller.js";

import {
  //verificarJwtManual,
  protegerRuta
} from "../middlewares/auth.middleware.js";

const router =
  Router();

router.get(
  "/",
  listarPedidosV1
);

router.post(
  "/",
  protegerRuta,
  crearPedidoV1
);

router.get(
  "/:id",
  buscarPedidoV1
);

router.put(
  "/:id",
  protegerRuta,
  actualizarPedidoV1
);

router.delete(
  "/:id",
  protegerRuta,
  eliminarPedidoV1
);


export default router;