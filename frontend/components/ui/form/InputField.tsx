import { InputHTMLAttributes, useState } from "react";
import { IconType } from "react-icons";
import styles from "@styles/components/ui/form/InputField.module.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface iInputField extends InputHTMLAttributes<HTMLInputElement> {
    Icon: IconType;
    error?: string;
}

export default function InputField({ Icon, error, ...extra }: iInputField) {
    const [state, setState] = useState({
        type: extra.type || "text",
        show: false,
    });

    const handleShow = () => {
        setState({ type: "text", show: true });
    };
    const handleClose = () => {
        setState({ type: "password", show: false });
    };

    return (
        <div className={styles.input}>
            <div
                className={`${styles.inputHold} ${
                    error ? styles.inputInValid : styles.inputValid
                }`}
            >
                <div className={styles.inputIcon}>
                    <Icon />
                </div>
                <input
                    {...extra}
                    type={state.type}
                    className={styles.inputField}
                />

                {extra.type === "password" &&
                    (state.show ? (
                        <div
                            className={styles.inputAction}
                            onClick={handleClose}
                        >
                            <FaEyeSlash />
                        </div>
                    ) : (
                        <div
                            className={styles.inputAction}
                            onClick={handleShow}
                        >
                            <FaEye />
                        </div>
                    ))}
            </div>

            {error && <span className={styles.inputHelpX}>{error}</span>}
        </div>
    );
}
