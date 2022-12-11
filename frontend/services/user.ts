import request, { Response } from "./request";
import { iGetUser, iGetUsers } from "@Types/services";

export async function getUser(accessToken?: string) {
    return await request.get<iGetUser, Response<iGetUser>>(`/user`, {
        headers: {
            Authorization: `@access${accessToken}`,
        },
    });
}
export async function getUserById(userId?: string, accessToken?: string) {
    return await request.get<iGetUser, Response<iGetUser>>(`/user/${userId}`, {
        headers: {
            Authorization: `@access${accessToken}`,
        },
    });
}
export async function getUsers(accessToken?: string) {
    return await request.get<iGetUsers, Response<iGetUsers>>(`/user/all`, {
        headers: {
            Authorization: `@access${accessToken}`,
        },
    });
}
