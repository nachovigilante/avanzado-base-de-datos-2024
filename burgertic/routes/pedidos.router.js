import Router from "express";
import PedidosController from "../controllers/pedidos.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE PEDIDOS -------------
// IMPORTANTE: La ruta /usuario debe ir antes que la ruta /:id
// Si no, Express interpretará "usuario" como un id y no funcionará correctamente

// Recordar utilizar los middleware verifyToken y/o verifyAdmin en las rutas que correspondan

router.get("/pedidos", verifyToken, verifyAdmin, PedidosController.getPedidos );
router.get("/pedidos/usuario", verifyToken, PedidosController.getPedidoById);
router.get("/pedidos/:id",verifyAdmin, PedidosController.getPedidosByUser);
router.post("/pedidos", verifyToken, verifyAdmin,PedidosController.createPedido );
router.put("/pedidos/:id/aceptar", verifyToken, verifyAdmin, PedidosController.aceptarPedido);
router.put("/pedidos/:id/comenzar", verifyToken, verifyAdmin, PedidosController.comenzarPedido);
router.put("/pedidos/:id/entregar", verifyToken, verifyAdmin, PedidosController.entregarPedido);
router.delete("/pedidos/:id", verifyToken, verifyAdmin,PedidosController.deletePedido);


export default router;
