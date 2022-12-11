import { useEffect } from "react";

export default function useOutsideClick(
    ref: Array<any>,
    state: any,
    callback: Function
) {
    const handler = (e: any) => {
        if (!state) return;

        const target = e.target;

        const refClicked = ref.some(
            (item) => item && item.current && item.current.contains(target)
        );

        if (!refClicked) return callback();
    };

    // FOR EVERY UPDATE
    useEffect(() => {
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, [state, ref]);
}
