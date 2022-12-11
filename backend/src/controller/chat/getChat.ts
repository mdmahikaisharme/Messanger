import { Request, Response } from "express";
import { Chat } from "../../model";
import auth from "../../lib/auth";
import responseCatcher from "../../lib/responseCatcher";

/**
 * GET - /chat/[chatId] -
 */
export default async function getChat(req: Request, res: Response) {
    try {
        // auth
        const { notLoggedIn } = await auth.middleware(req);
        if (notLoggedIn) return notLoggedIn(res);

        const chat = await Chat.findById(req.params.chatId);
        return res.status(200).json({ chat });
    } catch (error: any) {
        return responseCatcher(res, "Failed to get chat", error);
    }
}
