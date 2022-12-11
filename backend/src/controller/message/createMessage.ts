import { Request, Response } from "express";
import { Chat, iMessage, Message } from "../../model";
import responseCatcher from "../../lib/responseCatcher";

/**
 * POST - /message -
 */
export default async function createMessage(req: Request, res: Response) {
    try {
        const message = await Message.create({
            chat: req.body.chat,
            user: req.body.user,
            text: req.body.text,
            createdAt: new Date().toISOString(),
        });
        // lastMessage
        await Chat.findByIdAndUpdate(req.body.chat, {
            lastMessage: req.body.text,
        });
        return res.status(200).json({ message });
    } catch (error: any) {
        return responseCatcher(res, "Failed to create message", error);
    }
}
