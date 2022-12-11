import request, { Response } from "./request";
import { iCreateMessage, iGetGhatMessages, iGetMessage } from "@Types/services";

export async function createMessage(
    body?: iCreateMessage,
    accessToken?: string
) {
    return await request.post<
        iGetMessage,
        Response<iGetMessage>,
        iCreateMessage
    >("/message", body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `@access${accessToken}`,
        },
    });
}
export async function deleteMessage(messageId?: string, accessToken?: string) {
    return await request.delete(`/message/${messageId}`, {
        headers: {
            Authorization: `@access${accessToken}`,
        },
    });
}
export async function getChatMessages(chatId?: string, accessToken?: string) {
    return await request.get<iGetGhatMessages, Response<iGetGhatMessages>>(
        `/message/${chatId}`,
        {
            headers: {
                Authorization: `@access${accessToken}`,
            },
        }
    );
}
