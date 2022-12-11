import { Request, Response } from "express";
import { Message } from "../../model";
import responseCatcher from "../../lib/responseCatcher";

/**
 * DELETE - /message/[messageId] -
 */
export default async function deleteMessage(req: Request, res: Response) {
    try {
        const message = await Message.findByIdAndDelete(req.params.messageId);

        return res
            .status(200)
            .json({ message: "message removed successfully" });
    } catch (error: any) {
        return responseCatcher(res, "Failed to delete message", error);
    }
}
