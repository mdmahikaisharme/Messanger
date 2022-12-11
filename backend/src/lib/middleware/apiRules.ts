import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

export default function apiRules(args?: any) {
    return cors({
        origin: "*",
        methods: "PUT,POST,DELETE,GET",
        allowedHeaders:
            "Origin,X-Requested-With,Content-Type,Accept,Authorization",
    });
    // return (req: Request, res: Response, next: NextFunction) => {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header(
    //         "Access-Control-Allow-Header",
    //         "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    //     );

    //     if (req.method === "OPTIONS") {
    //         res.header(
    //             "Access-Control-Allow-Methods",
    //             "PUT,POST,PATCH,DELETE,GET"
    //         );
    //         return res.status(200).json({});
    //     }

    //     next();
    // };
}
