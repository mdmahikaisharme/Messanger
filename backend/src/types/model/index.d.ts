export interface iUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    image: string;
    createdAt: string;
}
export interface iMessage {
    _id: string;
    chat: string;
    user: string;
    text: string;
    createdAt: string;
}
export interface iChat {
    _id: string;
    name: string;
    members: string[];
    lastMessage: string;
    createdAt: string;
}
