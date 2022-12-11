import { iMessage } from "../model";

export interface iRealtime {
    userId: string;
}
export interface iUser extends iRealtime {
    socketId: string;
}
export interface iCreateMessage {
    chat: string;
    user: string;
    text: string;
}
export interface iSendMessage {
    members: string[];
    message: iCreateMessage;
    accessToken?: string;
}
export interface iGetMessage {
    message: iMessage;
}
