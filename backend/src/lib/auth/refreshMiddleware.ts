import { Request } from "express";
import { iRefreshToken, verifyRefreshToken } from "../token";
import notLoggedIn, { NotLoggedIn } from "./notLoggedIn";

type RefreshMiddleware =
    | {
          refreshToken: string;
          refreshPayload: iRefreshToken;
          notLoggedIn: null;
      }
    | {
          refreshToken: null;
          refreshPayload: null;
          notLoggedIn: NotLoggedIn;
      };

async function RefreshMiddleware(req: Request): Promise<RefreshMiddleware> {
    const refreshToken = req.headers.authorization?.split("@refresh")[1] || "";
    const refreshPayload = await verifyRefreshToken(refreshToken);

    return refreshPayload
        ? { refreshToken, refreshPayload, notLoggedIn: null }
        : { refreshToken: null, refreshPayload: null, notLoggedIn };
}

export default RefreshMiddleware;
