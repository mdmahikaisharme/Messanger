import { Request, Response } from "express";
import { User } from "../../model";
import auth from "../../lib/auth";
import responseCatcher from "../../lib/responseCatcher";

/**
 * GET - /user/[userId] -
 */
export default async function getUserById(req: Request, res: Response) {
    try {
        // auth
        const user = await User.findById(req.params.userId);
        return res.status(200).json({ user });
    } catch (error: any) {
        return responseCatcher(res, "Failed to get user", error);
    }
}
