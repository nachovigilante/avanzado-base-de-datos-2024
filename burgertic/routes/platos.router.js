import Router from "express";
import PlatosController from "../controllers/platos.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/platos", PlatosController.getPlatos);
router.get("/platos/:id", PlatosController.getPlatoById);
router.get("/platos/tipo/:tipo", PlatosController.getPlatosByTipo);
router.post("/platos/", verifyToken, verifyAdmin, PlatosController.createPlato);
router.put("/platos/:id", verifyToken, verifyAdmin, PlatosController.updatePlato);
router.delete("/platos/:id", verifyToken, verifyAdmin, PlatosController.deletePlato);

export default router;
