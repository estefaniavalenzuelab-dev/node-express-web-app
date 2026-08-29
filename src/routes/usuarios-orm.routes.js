import {
  Router
} from "express";
import {
  listarUsuariosOrm,
  obtenerUsuarioRelacionado,
  obtenerUsuarioConPedidosController
} from "../controllers/usuarios-orm.controller.js";
import {
  obtenerUsuarioConRelaciones 
} from "../services/usuarios-orm.service.js";

const router =
  Router();

router.get(
  "/",
  listarUsuariosOrm
);

router.get(
  "/:id/relaciones",
  obtenerUsuarioConRelaciones
);

router.get(
  "/:id/pedidos",
  obtenerUsuarioConPedidosController
);

export default router;