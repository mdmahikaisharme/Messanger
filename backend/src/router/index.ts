import { Express } from "express";
import authRouter from "./auth";
import messageRouter from "./message";
import chatRouter from "./chat";
import userRouter from "./user";

export default function addRouter(app: Express) {
    app.use(authRouter);
    app.use(messageRouter);
    app.use(chatRouter);
    app.use(userRouter);
}
