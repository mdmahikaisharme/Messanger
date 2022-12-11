import mongoose from "mongoose";
import { iMessage } from "../types/model";

const MessageSchema = new mongoose.Schema<iMessage>({
    user: String,
    chat: String,
    text: String,
    createdAt: String,
});

const Message =
    mongoose.models.Message || mongoose.model("Message", MessageSchema);

export type { iMessage };
export default Message;
