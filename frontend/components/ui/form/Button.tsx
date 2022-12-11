import { ButtonHTMLAttributes, useState } from "react";
import styles from "@styles/components/ui/form/Button.module.scss";

interface iButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    loading?: boolean;
    error?: string;
}

export default function Button({ text, loading, error, ...extra }: iButton) {
    return (
        <>
            <button
                {...extra}
                className={`${styles.button} ${
                    error ? styles.buttonInvalid : styles.buttonValid
                }`}
            >
                {loading && <div className="loadingSpin" />}
                {text}
            </button>

            {error && <span className={styles.buttonHelpX}>{error}</span>}
        </>
    );
}
