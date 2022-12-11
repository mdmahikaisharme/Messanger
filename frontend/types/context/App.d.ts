import { iUser } from "@Types/modal";

export interface iAppState {
    user?: iUser;
    dispatch: (action: tAppAction) => any;
}

export type tAppAction = { type: "LOGIN"; payload: iUser } | { type: "LOGOUT" };
