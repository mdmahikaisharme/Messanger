import { useRef } from "react";
import { FaArrowRight, FaPlusCircle } from "react-icons/fa";
import { Message } from ".";
import cookie, { COOKIE } from "@lib/cookie";
import { iChat, iMessage } from "@Types/model";
import { iSendMessage } from "@Types/realtime";
import styles from "@styles/components/home/Chat.module.scss";

interface iChatProps {
    chat: iChat;
    messages: iMessage[];
    user: string;
    sendMessage: (data: iSendMessage) => void;
}

export default function Chat({
    chat,
    messages,
    user,
    sendMessage,
}: iChatProps) {
    const ref = {
        message: useRef({} as HTMLInputElement),
    };

    const handleSendMessage = (e: any) => {
        e.preventDefault();
        const messageText = ref.message.current.value;
        if (!messageText) return;

        sendMessage({
            members: chat.members,
            message: {
                chat: chat._id,
                user: user,
                text: messageText,
            },
            accessToken: cookie.get(COOKIE.AccessToken),
        });

        ref.message.current.value = "";
    };

    return (
        <>
            {/* chat head */}
            <div className={styles.chatHead}>
                <div className={styles.chatHeadImage}></div>
                <div className={styles.chatHeadRight}>
                    <h3 className={styles.chatHeadName}>{chat?.name}</h3>
                    <span className={styles.chatHeadInfo}>
                        {chat?.lastMessage}
                    </span>
                </div>
            </div>

            {/* chat */}
            <div className={`${styles.chat} scrollY`}>
                {messages?.map((message) => (
                    <Message message={message} user={user} key={message._id} />
                ))}
            </div>

            {/* compose */}
            <div className={styles.compose}>
                <button className={styles.composeButton}>
                    <FaPlusCircle />
                </button>

                <form
                    className={styles.composeForm}
                    onSubmit={handleSendMessage}
                >
                    <input
                        type="text"
                        defaultValue={""}
                        placeholder="Type a message..."
                        className={styles.composeInput}
                        ref={ref.message}
                    />

                    <button className={styles.composeSend} type="submit">
                        <FaArrowRight />
                    </button>
                </form>
            </div>
        </>
    );
}
