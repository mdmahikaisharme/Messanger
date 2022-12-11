import { Request, Response } from "express";
import { Chat } from "../../model";
import auth from "../../lib/auth";
import responseCatcher from "../../lib/responseCatcher";

/**
 * GET - /chat/user -
 */
export default async function getUserChats(req: Request, res: Response) {
    try {
        // auth
        const { accessPayload, notLoggedIn } = await auth.middleware(req);
        if (notLoggedIn) return notLoggedIn(res);

        const chats = await Chat.find({
            members: { $in: [accessPayload.userId] },
        });
        return res.status(200).json({ chats });
    } catch (error: any) {
        return responseCatcher(res, "Failed to get user chats", error);
    }
}
