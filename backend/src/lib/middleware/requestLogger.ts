import { Request, Response, NextFunction } from "express";
import Logger from "../logger";

export default function requestLogger(args?: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        // on the start
        Logger.info(
            `Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
            // `[Incomming] [${req.method}] [${req.url}] [${req.socket.remoteAddress}]`
        );

        // // on the finish
        // res.on("finish", () =>
        //     Logger.info(
        //         `Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
        //     )
        // );

        next();
    };
}
