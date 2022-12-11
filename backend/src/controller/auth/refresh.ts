import { Request, Response } from "express";
import { User } from "../../model";
import { buildTokens, setTokensInCookies } from "../../lib/token";
import auth from "../../lib/auth";
import responseCatcher from "../../lib/responseCatcher";

/**
 * POST - /auth/refresh -
 */
export default async function refresh(req: Request, res: Response) {
    try {
        // auth
        const { refreshPayload, notLoggedIn } = await auth.refreshMiddleware(
            req
        );
        if (notLoggedIn) return notLoggedIn(res);

        const user = await User.findById(refreshPayload.userId);

        // token
        const { accessToken, refreshToken } = await buildTokens(user);
        // setTokensInCookies(res, accessToken, refreshToken);

        return res.status(200).json({ accessToken, refreshToken });
    } catch (error: any) {
        return responseCatcher(res, "Failed to refresh", error);
    }
}
