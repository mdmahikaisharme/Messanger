import { Request, Response } from "express";
import { User } from "../../model";
import auth from "../../lib/auth";
import responseCatcher from "../../lib/responseCatcher";

/**
 * GET - /user -
 */
export default async function getUser(req: Request, res: Response) {
    try {
        // auth
        const { accessPayload, notLoggedIn } = await auth.middleware(req);
        if (notLoggedIn) return notLoggedIn(res);

        const user = await User.findById(accessPayload.userId);
        return res.status(200).json({ user });
    } catch (error: any) {
        return responseCatcher(res, "Failed to get user", error);
    }
}
