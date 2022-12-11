import { Request, Response } from "express";
import { Message } from "../../model";
import responseCatcher from "../../lib/responseCatcher";

/**
 * GET - /message/[chatId] -
 */
export default async function getChatMessages(req: Request, res: Response) {
    try {
        const messages = await Message.find({ chat: req.params.chatId });
        return res.status(200).json({ messages });
    } catch (error: any) {
        return responseCatcher(res, "Failed to get chat messages", error);
    }
}
