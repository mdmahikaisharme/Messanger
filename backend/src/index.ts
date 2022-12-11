import http from "http";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import middleware from "./lib/middleware";
import router from "./router";
import realtime from "./realtime";
import Logger from "./lib/logger";
import config from "./config";

// init
const app = express();

// server
function startServer() {
    // middleware
    app.use(middleware.requestLogger());
    app.use(middleware.apiRules());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // routes
    router(app);

    // health checking
    app.get("/ping", (req: Request, res: Response) =>
        res.status(200).json({ message: "pong" })
    );

    // // error handaling
    // app.use("*", (req: Request, res: Response) => {
    //     const error = new Error("not found");
    //     Logger.error(error);

    //     return res.status(404).json({ message: error.message });
    // });

    // start listening
    const server = http.createServer(app);
    realtime(server);

    server.listen(config.PORT, () =>
        Logger.info(`Server is running on http://127.0.0.1:${config.PORT}`)
    );
}

// connect to database
const mongooseOptions = {
    bufferCommands: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
};
mongoose
    .connect(config.DATABASE_URI, mongooseOptions)
    .then(() => {
        Logger.info("Connected to database");
        startServer();
    })
    .catch((error: any) => {
        Logger.error("Failed to connect database");
        Logger.error(error.message);
    });
