import { Request, Response } from "express";
import { Chat, iChat } from "../../model";
import auth from "../../lib/auth";
import responseCatcher from "../../lib/responseCatcher";

/**
 * POST - /chat -
 */
export default async function createChat(req: Request, res: Response) {
    try {
        // auth
        const { accessPayload, notLoggedIn } = await auth.middleware(req);
        if (notLoggedIn) return notLoggedIn(res);

        const chat = await Chat.create({
            name: req.body.name || "",
            members: req.body.members,
            lastMessage: req.body.lastMessage || "",
            createdAt: new Date().toISOString(),
        });
        return res.status(200).json({ chat });
    } catch (error: any) {
        return responseCatcher(res, "Failed to create chat", error);
    }
}
