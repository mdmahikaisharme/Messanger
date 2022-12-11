import request, { Response } from "./request";
import { iLoginBody, iRefresh, iSignupBody, iSignupRes } from "@Types/services";

export async function signup(body: iSignupBody) {
    return await request.post<iSignupRes, Response<iSignupRes>, iSignupBody>(
        "/auth/signup",
        body,
        {}
    );
}
export async function login(body: iLoginBody) {
    return await request.post<iSignupRes, Response<iSignupRes>, iLoginBody>(
        "/auth/login",
        body,
        {}
    );
}
export async function logout(accessToken?: string) {
    return await request.post("/auth/logout", null, {
        headers: { Authorization: `@access${accessToken}` },
    });
}
export async function refresh(refreshToken?: string) {
    return await request.post<iRefresh, Response<iRefresh>, null>(
        "/auth/refresh",
        null,
        {
            headers: { Authorization: `@refresh${refreshToken}` },
        }
    );
}
