import Link from "next/link";
// import styles from "@styles/components/Header.module.css";

export default function Header() {
    return (
        <header
            className={
                "h-14 px-8 flex items-center justify-between bg-[#05131C]"
            }
        >
            <Link href={"/"}>
                <div className={"text-[#FAFEFD]"}>
                    <a className={"text-2xl font-semibold"}>Messanger</a>
                </div>
            </Link>

            {/* Action */}
            <div className={"flex items-center gap-4"}>
                <Button href="/auth/login" text="Login" variant="outline" />
                <Button href="/auth/signup" text="Signup" />
            </div>
        </header>
    );
}

interface iButton {
    variant?: "outline";
    href: string;
    text: string;
}

function Button({ variant, href, text }: iButton) {
    const style = {
        common: "px-4 py-[.3rem] font-semibold border-2 rounded-md",
        normal: "text-[#05131C] bg-[#CBDBE8] border-transparent",
        outline: "text-[#CBDBE8] bg-[#05131C] border-[#CBDBE8]",
    };

    return variant === "outline" ? (
        <Link href={href}>
            <button className={`${style.common} ${style.outline}`}>
                <span className={""}>{text}</span>
            </button>
        </Link>
    ) : (
        <Link href={href}>
            <button className={`${style.common} ${style.normal}`}>
                <span className={""}>{text}</span>
            </button>
        </Link>
    );
}
