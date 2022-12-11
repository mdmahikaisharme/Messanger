import { Router } from "express";
import chatController from "../controller/chat";

const router = Router();

router.post("/chat", chatController.createChat);
router.get("/chat/user", chatController.getUserChats);
router.get("/chat/:chatId", chatController.getChat);
router.delete("/chat/:chatId", chatController.deleteChat);

export default router;
