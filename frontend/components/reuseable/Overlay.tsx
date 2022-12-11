import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import cls from "@lib/cls";

interface iOverlayProps {
    className?: string;
    state: boolean;
    onClose: () => any;
    children: ReactNode;
}
export default function Overlay({
    className = "",
    state,
    onClose,
    children,
}: iOverlayProps) {
    return (
        <AnimatePresence>
            {state && (
                <motion.section
                    className="w-screen h-screen fixed left-0 top-0 z-20 grid place-items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* overlay */}
                    <div
                        className="w-full h-full absolute left-0 top-0 z-20"
                        style={{ background: "rgba(0,0,0,.5)" }}
                        onClick={onClose}
                    />

                    {/* Content */}
                    <div className={cls(className, "z-30")}>{children}</div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}
