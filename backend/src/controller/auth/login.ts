import { Request, Response } from "express";
import { User } from "../../model";
import { buildTokens, setTokensInCookies } from "../../lib/token";
import responseCatcher from "../../lib/responseCatcher";

/**
 * POST - /auth/login - iUser
 */
export default async function login(req: Request, res: Response) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

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
        return responseCatcher(res, "Failed to login", error);
    }
}
