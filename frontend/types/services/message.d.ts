import { iMessage } from "@Types/model";

interface iGetMessage {
    message: iMessage;
}
interface iGetGhatMessages {
    messages: iMessage[];
}
interface iCreateMessage {
    chat: string;
    user: string;
    text: string;
}
