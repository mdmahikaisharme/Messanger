import { Router } from "express";
import authController from "../controller/auth";

const router = Router();

router.post("/auth/login", authController.login);
router.post("/auth/signup", authController.signup);
router.post("/auth/refresh", authController.refresh);
router.post("/auth/logout", authController.logout);

export default router;
