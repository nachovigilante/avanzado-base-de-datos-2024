import Router from "express";
import authController from "../controllers/auth.controller.js";
import AuthController from "../controllers/auth.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";


const router = Router();

// ------------- COMPLETAR LAS RUTAS DE LOGIN Y REGISTER -------------

router.post("/register", authController.register );
router.post("/login", authController.login);
router.put("/admin/:id",verifyToken,verifyAdmin,authController.updateAdmin)

 
export default router;
