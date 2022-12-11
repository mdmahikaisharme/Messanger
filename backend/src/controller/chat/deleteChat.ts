import { Request, Response } from "express";
import { Chat } from "../../model";
import auth from "../../lib/auth";
import responseCatcher from "../../lib/responseCatcher";

/**
 * DELETE - /chat/[chatId] -
 */
export default async function deleteChat(req: Request, res: Response) {
    try {
        // auth
        const { accessPayload, notLoggedIn } = await auth.middleware(req);
        if (notLoggedIn) return notLoggedIn(res);

        const chat = await Chat.findByIdAndDelete(req.params.chatId);
        return res.status(200).json({ chat: "chat removed successfully" });
    } catch (error: any) {
        return responseCatcher(res, "Failed to delete chat", error);
    }
}
