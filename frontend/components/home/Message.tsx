import { iMessage } from "@Types/model";
import styles from "@styles/components/home/Message.module.scss";

interface iMessageProps {
    message: iMessage;
    user: string;
}
export default function Message({ message, user }: iMessageProps) {
    return message.user === user ? (
        <div className={styles.messageMe}>{message.text}</div>
    ) : (
        <div className={styles.message}>{message.text}</div>
    );
}
