import { Request } from "express";
import { verifyAccessToken, iAccessToken } from "../token";
import notLoggedIn, { NotLoggedIn } from "./notLoggedIn";

type Middleware =
    | {
          accessToken: string;
          accessPayload: iAccessToken;
          notLoggedIn: null;
      }
    | {
          accessToken: null;
          accessPayload: null;
          notLoggedIn: NotLoggedIn;
      };

async function middleware(req: Request): Promise<Middleware> {
    const accessToken = req.headers.authorization?.split("@access")[1] || "";
    const accessPayload = await verifyAccessToken(accessToken);

    return accessPayload
        ? { accessToken, accessPayload, notLoggedIn: null }
        : { accessToken: null, accessPayload: null, notLoggedIn };
}

export default middleware;
