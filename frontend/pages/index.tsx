import type { GetServerSidePropsContext, NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { io, Socket } from "socket.io-client";
import { Chat, ChatList, CreateChat, Header, Search } from "@components/home";
import { NothingToShow } from "@components/reuseable";
import { useAppContext } from "context/App";
import cookie, { COOKIE } from "@lib/cookie";
import { withAuthSSR } from "@lib/auth";
import services from "@services";
import { iChat, iMessage } from "@Types/model";
import { iGetMessage } from "@Types/services";
import { iSendMessage } from "@Types/realtime";
import config from "../config";
// import styles from "@styles/Home.module.scss";

type tMessagesState = {
    [key: string]: iMessage[];
};
interface iState {
    chatId?: string;
}
interface iHomePage {
    chats: iChat[];
}

const HomePage: NextPage<iHomePage> = (props) => {
    const appContext = useAppContext();
    const [state, setState] = useState<iState>({
        chatId: "",
    });
    const [chats, setChats] = useState<iChat[]>(props.chats);
    const [messages, setMessages] = useState<tMessagesState>({});
    const [showCreateChatModal, setShowCreateChatModal] = useState(false);
    const ref = {
        realtime: useRef({} as Socket),
    };

    const handleGetChat = () => {
        return chats.find((chat) => chat._id === state.chatId) as iChat;
    };
    const handleFilterChat = (value: string) => {};
    const handleOnCreateChat = (chat?: iChat) => {
        setShowCreateChatModal(false);
        if (!chat) return;
        setChats((pre) => [chat, ...pre]);
    };
    const handleChangeChat = async (chatId: string) => {
        if (!chatId) return;
        setState((pre) => ({ ...pre, chatId }));
        if (chatId in messages) return;
        try {
            const request = await services.message.getChatMessages(
                chatId,
                cookie.get(COOKIE.AccessToken)
            );
            if (request.status !== 200) return;

            // add new messsage
            setMessages((pre) => {
                if (chatId in pre) return pre;
                const currentChatMessages = pre[chatId] || [];
                return {
                    ...pre,
                    [chatId]: [
                        ...currentChatMessages,
                        ...request.data.messages,
                    ],
                };
            });
        } catch (error) {}
    };
    const handleNewMessage = ({ message }: iGetMessage) => {
        if (!message.chat) return;
        // sort out chats
        setChats((pre) => {
            const currentChat = {
                ...(chats.find((chat) => chat._id === message.chat) as iChat),
                lastMessage: message.text,
            };
            const oldChats = pre.filter((chat) => chat._id !== currentChat._id);

            return [currentChat, ...oldChats];
        });
        // add new messsage
        setMessages((pre) => {
            const currentChatMessages = pre[message.chat] || [];

            return {
                ...pre,
                [message.chat]: [...currentChatMessages, message],
            };
        });
    };
    const handleSendMessage = (data: iSendMessage) => {
        ref.realtime.current.emit("sendMessage", data);
    };

    useEffect(() => {
        // is realtime added
        if (!appContext.user || Object.entries(ref.realtime.current).length)
            return;

        // connect
        ref.realtime.current = io(config.BACKEND_URL);
        ref.realtime.current.emit("join", {
            userId: appContext?.user?._id,
        });

        // ON new message
        ref.realtime.current.on("newMessage", handleNewMessage);
    }, [appContext.user]);

    return (
        <>
            <Header />
            {showCreateChatModal && (
                <CreateChat
                    onCreate={handleOnCreateChat}
                    onClose={() => setShowCreateChatModal(false)}
                />
            )}
            <main className={"h-[calc(100vh-3.5rem)] flex bg-[#1A2730]"}>
                <div className={"w-96 border-r-2 border-r-[#2B3944]"}>
                    <div className="px-3 py-2">
                        <Search onSearch={handleFilterChat} />
                    </div>

                    <button
                        className="w-full px-5 mb-2 py-2 flex items-center gap-2 hover:bg-gray-700 select-none"
                        onClick={() => setShowCreateChatModal(true)}
                    >
                        <FaUserFriends className="text-xl text-white" />
                        <span className="text-sm font-semibold text-gray-300">
                            Create a new chat
                        </span>
                    </button>

                    <ChatList
                        chats={chats}
                        currentChat={state.chatId}
                        onChangeChat={handleChangeChat}
                    />
                </div>

                <div className={"w-full"}>
                    {state.chatId ? (
                        <Chat
                            chat={handleGetChat()}
                            messages={messages[state.chatId]}
                            user={appContext?.user?._id}
                            sendMessage={handleSendMessage}
                        />
                    ) : (
                        <NothingToShow />
                    )}
                </div>
            </main>
        </>
    );
};

export default HomePage;

export const getServerSideProps = withAuthSSR(
    async (context: GetServerSidePropsContext) => {
        let chats: iChat[] = [];

        try {
            const request = await services.chat.getUserChats(
                context.req.cookies[COOKIE.AccessToken]
            );
            chats = request.status === 200 ? request.data.chats : [];
        } catch {}

        return {
            props: {
                chats,
            },
        };
    }
);
