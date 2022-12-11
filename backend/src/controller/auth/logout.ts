import { Request, Response } from "express";
import { User } from "../../model";
import { buildTokens, clearTokensInCookies } from "../../lib/token";
import auth from "../../lib/auth";
import responseCatcher from "../../lib/responseCatcher";

/**
 * POST - /auth/logout -
 */
export default async function logout(req: Request, res: Response) {
    try {
        // auth
        const { accessPayload, notLoggedIn } = await auth.middleware(req);
        if (notLoggedIn) return notLoggedIn(res);

        const user = await User.findById(accessPayload.userId);

        // token
        // clearTokensInCookies(res);

        return res.status(200).json({ message: "Logged out" });
    } catch (error: any) {
        return responseCatcher(res, "Failed to logout", error);
    }
}
