import { Router } from "express";
import userController from "../controller/user";

const router = Router();

router.get("/user", userController.getUser);
router.get("/user/all", userController.getUsers);
router.get("/user/:userId", userController.getUserById);

export default router;
