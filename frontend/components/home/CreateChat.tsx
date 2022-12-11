import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { Overlay } from "@components/reuseable";
import { ResultList, Search } from ".";
import styles from "@styles/components/home/CreateChat.module.scss";
import services from "@services";
import cookie, { COOKIE } from "@lib/cookie";
import { iCreateChatBody } from "@Types/services";
import { iChat, iUser } from "@Types/model";
import { useAppContext } from "context/App";

interface iCreateChat {
    onCreate: (chat: iChat) => void;
    onClose: () => void;
}
export default function CreateChat({ onCreate, onClose }: iCreateChat) {
    const appContext = useAppContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [chatName, setChatName] = useState("");
    const [members, setMembers] = useState<iUser[]>([]);
    const [searchResult, setSearchResult] = useState<iUser[]>([]);
    const [selectedMembers, setSelectedMembers] = useState<iUser[]>([]);
    const ref = { chatName: useRef({} as HTMLInputElement) };

    const handleSearch = (value: string) => {
        setSearchResult(
            members.filter((member) =>
                member.name.toLowerCase().includes(value.toLowerCase())
            )
        );
    };
    const handleAddMember = (member: iUser) => {
        setSelectedMembers((pre) => [...pre, member]);
    };
    const handleRemoveSelectedMember = (id: string) => {
        setSelectedMembers((pre) => pre.filter((member) => member._id !== id));
    };
    const handleNext = async (e: any) => {
        e.preventDefault();

        if (!ref.chatName.current.value) {
            return ref.chatName.current.focus();
        }

        setChatName(ref.chatName.current.value);
        setCurrentIndex(1);
        try {
            const request = await services.user.getUsers(
                cookie.get(COOKIE.AccessToken)
            );
            if (request.status !== 200) return;
            const members = request.data.users.filter(
                (user) => user._id !== "mahi"
            );
            setMembers(members);
            setSearchResult(members);
        } catch {}
    };
    const handleCreateChat = async () => {
        const chatData: iCreateChatBody = {
            name: chatName,
            members: [
                ...selectedMembers.map((member) => member._id),
                appContext.user?._id,
            ],
        };

        try {
            const request = await services.chat.createChat(
                chatData,
                cookie.get(COOKIE.AccessToken)
            );
            if (request.status !== 200) return;

            onCreate(request.data.chat);
            onClose();
        } catch {}
    };

    return (
        <Overlay className={styles.createChat} state={true} onClose={onClose}>
            <h2 className={styles.createChatTitle}>Create a new chat</h2>

            <Slider currentPosition={currentIndex}>
                <SliderSlide positon={0} currentPositon={currentIndex}>
                    <form className="flex flex-col gap-4" onSubmit={handleNext}>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-300">
                                Chat Name:
                            </label>
                            <input
                                type="text"
                                className="px-3 py-2 bg-gray-800 outline-none rounded-md focus-within:bg-gray-700"
                                placeholder="example chat"
                                ref={ref.chatName}
                            />
                        </div>

                        <button
                            className={styles.createChatButton}
                            type="submit"
                        >
                            Next
                        </button>
                    </form>
                </SliderSlide>
                <SliderSlide positon={1} currentPositon={currentIndex}>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-300">
                            Chat Members:
                        </label>
                        <SelectedMembers
                            members={selectedMembers}
                            onRemove={handleRemoveSelectedMember}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Search onSearch={handleSearch} />
                        <div className="bg-gray-800 rounded-md overflow-hidden">
                            <ResultList
                                result={searchResult}
                                onAdd={handleAddMember}
                            />
                        </div>
                    </div>

                    <button
                        className={styles.createChatButton}
                        onClick={handleCreateChat}
                    >
                        Create Chat
                    </button>
                </SliderSlide>
            </Slider>
        </Overlay>
    );
}

function SelectedMembers({
    members,
    onRemove,
}: {
    members: any[];
    onRemove: (id: string) => void;
}) {
    return (
        <div className="px-2 py-2 h-10 flex flex-wrap gap-4 bg-gray-800 rounded-md">
            {members.map((member) => (
                <div
                    className="px-2 h-6 text-sm flex items-center gap-1 bg-gray-700 text-white rounded-md hover:bg-gray-600 select-none cursor-pointer"
                    key={member._id}
                >
                    <span className="px-1">{member.name}</span>
                    <button
                        className="w-4 h-4 text-xs grid place-items-center bg-red-200 text-gray-800 rounded-full hover:bg-red-400"
                        onClick={() => onRemove(member._id)}
                    >
                        <FaTimes />
                    </button>
                </div>
            ))}
        </div>
    );
}
function SliderSlide({
    positon,
    currentPositon,
    children,
}: {
    positon: number;
    currentPositon: number;
    children?: React.ReactNode;
}) {
    return (
        <div className={styles.sliderSlide}>
            <AnimatePresence>
                {currentPositon === positon && (
                    <motion.div
                        className="w-10/12 mx-auto flex flex-col gap-4"
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
function Slider({
    currentPosition,
    children,
}: {
    currentPosition: number;
    children?: React.ReactNode;
}) {
    return (
        <div className={styles.slider}>
            <div
                className={styles.sliderHold}
                style={{
                    transform: `translateX(calc(var(--createChatW) * -${currentPosition}))`,
                }}
            >
                {children}
            </div>
        </div>
    );
}
