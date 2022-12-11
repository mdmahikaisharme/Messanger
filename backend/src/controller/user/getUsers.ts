import { Request, Response } from "express";
import { User } from "../../model";
import auth from "../../lib/auth";
import responseCatcher from "../../lib/responseCatcher";

/**
 * GET - /user/all -
 */
export default async function getUsers(req: Request, res: Response) {
    try {
        // auth
        const { accessPayload, notLoggedIn } = await auth.middleware(req);
        if (notLoggedIn) return notLoggedIn(res);

        const users = await User.find();
        return res.status(200).json({ users });
    } catch (error: any) {
        return responseCatcher(res, "Failed to get users", error);
    }
}
