import mongoose from "mongoose";
import { iChat } from "../types/model";

const ChatSchema = new mongoose.Schema<iChat>({
    name: String,
    members: [String],
    lastMessage: String,
    createdAt: String,
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);

export type { iChat };
export default Chat;
