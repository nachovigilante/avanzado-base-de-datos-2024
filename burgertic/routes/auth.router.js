import Router from "express";
import authController from "../controllers/auth.controller.js";
import AuthController from "../controllers/auth.controller.js";


const router = Router();

// ------------- COMPLETAR LAS RUTAS DE LOGIN Y REGISTER -------------

router.post("/register", authController.register );
router.get("/login", authController.login);

 
export default router;
