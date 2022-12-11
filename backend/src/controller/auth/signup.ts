import { Request, Response } from "express";
import { User } from "../../model";
import { buildTokens, setTokensInCookies } from "../../lib/token";
import responseCatcher from "../../lib/responseCatcher";

/**
 * POST - /auth/signup -
 */
export default async function signup(req: Request, res: Response) {
    try {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: req.body.image || "",
            createdAt: new Date().toISOString(),
        };
        const user = await User.create(data);

        const userData = {
            _id: user._id,
            name: user.name,
            image: user.image,
        };

        // token
        const { accessToken, refreshToken } = await buildTokens(user);
        setTokensInCookies(res, accessToken, refreshToken);

        return res
            .status(200)
            .json({ user: userData, accessToken, refreshToken });
    } catch (error: any) {
        return responseCatcher(res, "Failed to signup", error);
    }
}
