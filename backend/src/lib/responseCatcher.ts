import { Response } from "express";
import Logger from "./logger";

export default function responseCatcher(
    res: Response,
    message: string,
    error: any
) {
    Logger.error(message);
    Logger.error(error);
    return res.status(400).json({ chat: error.message });
}
