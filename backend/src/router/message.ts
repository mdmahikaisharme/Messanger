import { Router } from "express";
import messageController from "../controller/message";

const router = Router();

router.post("/message", messageController.createMessage);
router.get("/message/:chatId", messageController.getChatMessages);
router.delete("/message/:messageId", messageController.deleteMessage);

export default router;
