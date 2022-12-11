import { iChat } from "@Types/model";

export interface iGetChat {
    chat: iChat;
}
export interface iGetUserChats {
    chats: iChat[];
}
export interface iCreateChatBody {
    name: string;
    members: string[];
}
