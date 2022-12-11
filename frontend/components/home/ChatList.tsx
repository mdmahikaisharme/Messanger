import { iChat } from "@Types/model";
import { NothingToShow } from "@components/reuseable";
import styles from "@styles/components/home/ChatList.module.scss";

interface iChatListProps {
    chats: iChat[];
    currentChat?: string;
    onChangeChat: (chatId: string) => void;
}
export default function ChatList({
    chats,
    currentChat,
    onChangeChat,
}: iChatListProps) {
    return (
        <div className={`${styles.chatList} scrollY`}>
            {chats.map((chat) => (
                <ChatItem
                    chat={chat}
                    currentChat={currentChat}
                    onChangeChat={onChangeChat}
                    key={chat._id}
                />
            ))}
            {chats.length === 0 && <NothingToShow />}
        </div>
    );
}

interface iChatItemProps {
    chat: iChat;
    currentChat?: string;
    onChangeChat: (chatId: string) => void;
}
function ChatItem({ chat, currentChat, onChangeChat }: iChatItemProps) {
    return (
        <div
            className={`${styles.chatItem} ${
                chat._id === currentChat && styles.chatItemActive
            }`}
            onClick={() => onChangeChat(chat._id)}
        >
            <div className={styles.chatItemImage}></div>
            <div className={styles.chatItemRight}>
                <h3 className={styles.chatItemName}>{chat.name}</h3>
                <span className={styles.chatItemInfo}>{chat.lastMessage}</span>
            </div>
        </div>
    );
}
