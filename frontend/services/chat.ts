import request, { Response } from "./request";
import { iCreateChatBody, iGetChat, iGetUserChats } from "@Types/services";

export async function createChat(body: iCreateChatBody, accessToken?: string) {
    return await request.post<iGetChat, Response<iGetChat>, iCreateChatBody>(
        "/chat",
        body,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `@access${accessToken}`,
            },
        }
    );
}
export async function deleteChat(chatId: string, accessToken?: string) {
    return await request.delete(`/chat/${chatId}`, {
        headers: {
            Authorization: `@access${accessToken}`,
        },
    });
}
export async function getChat(chatId: string, accessToken?: string) {
    return await request.get<iGetChat, Response<iGetChat>>(`/chat/${chatId}`, {
        headers: {
            Authorization: `@access${accessToken}`,
        },
    });
}
export async function getUserChats(accessToken?: string) {
    return await request.get<iGetUserChats, Response<iGetUserChats>>(
        `/chat/user`,
        {
            headers: {
                Authorization: `@access${accessToken}`,
            },
        }
    );
}
