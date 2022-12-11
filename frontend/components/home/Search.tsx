import { useRef } from "react";
import { FaSearch } from "react-icons/fa";

export default function Search({
    onSearch,
}: {
    onSearch: (value: string) => void;
}) {
    const ref = {
        search: useRef({} as HTMLInputElement),
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        onSearch(ref.search.current.value);
        ref.search.current.value = "";
    };
    return (
        <form
            className="px-3 py-2 flex items-center gap-2 bg-gray-800 rounded-md focus-within:bg-gray-700 hover:bg-gray-700"
            onSubmit={handleSubmit}
        >
            <FaSearch className="text-md text-white" />
            <input
                type="text"
                defaultValue={""}
                placeholder="Search"
                className="w-full text-sm text-white bg-transparent outline-none"
                ref={ref.search}
            />
        </form>
    );
}
