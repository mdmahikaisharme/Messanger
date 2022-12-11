import { iUser } from "@Types/model";

export interface iSignupBody {
    name: string;
    email: string;
    password: string;
}
export interface iLoginBody {
    email: string;
    password: string;
}
export interface iRefresh {
    accessToken: string;
    refreshToken: string;
}
export interface iSignupRes extends iRefresh {
    user: iUser;
}
