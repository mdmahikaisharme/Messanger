import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { useState } from "react";
import { FaLock, FaMailchimp, FaRegUser } from "react-icons/fa";
import { Button, InputField } from "@components/ui";
import { useAppContext } from "context/App";
import validator from "@lib/validator";
import cookie, { COOKIE } from "@lib/cookie";
import services from "@services";
import { iSignupBody } from "@Types/services";
import styles from "@styles/Auth.module.scss";

interface iError extends iSignupBody {
    signup: string;
}

const SignupPage: NextPage = () => {
    const appContext = useAppContext();
    const [input, setInput] = useState<iSignupBody>({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState<iError>({
        name: "",
        email: "",
        password: "",
        signup: "",
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (key: keyof iSignupBody) => (e: any) => {
        setInput((pre) => ({ ...pre, [key]: e.target.value }));
    };
    const handleValidation = async () => {
        const error: Partial<iError> = {
            name: validator("Name", input.name, {
                min: 4,
                max: 20,
                require: true,
            }).first,
            email: validator("Email", input.email, {
                pattern: new RegExp(/\w+\@\w+\.\w+/),
                require: true,
            }).first,
            password: validator("Password", input.password, {
                min: 8,
                require: true,
            }).first,
        };
        setError((pre) => ({ ...pre, ...error, signup: "" }));
        return !Object.entries(error).some((item) => item[1]);
    };
    const handleSignup = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const isValid = await handleValidation();
        if (!isValid) return setLoading(false);

        try {
            const response = await services.auth.signup(input);
            if (response.status !== 200) {
                setError((pre) => ({ ...pre, signup: "Please, try one more" }));
                return setLoading(false);
            }
            // data
            const { user, accessToken, refreshToken } = response.data;

            // set cookies
            cookie.set(COOKIE.AccessToken, accessToken);
            cookie.set(COOKIE.RefreshToken, refreshToken);

            // set user
            appContext.dispatch({ type: "LOGIN", payload: user });
            setError((pre) => ({ ...pre, signup: "" }));
            Router.push("/");
        } catch (error) {
            setError((pre) => ({ ...pre, signup: "Try one more" }));
        }

        setLoading(false);
    };

    return (
        <>
            <Head>
                <title>Signup</title>
            </Head>

            <main className={styles.auth}>
                <div className={styles.authHold}>
                    <div className={styles.authHead}>
                        <h2 className={styles.authTitle}>Signup</h2>
                        <span className={styles.authAbout}>
                            Connected to the hole world
                        </span>
                    </div>

                    <form className={styles.authForm} onSubmit={handleSignup}>
                        <InputField
                            Icon={FaRegUser}
                            placeholder="Name"
                            value={input.name}
                            error={error.name}
                            onChange={handleInputChange("name")}
                        />
                        <InputField
                            Icon={FaMailchimp}
                            placeholder="Email"
                            value={input.email}
                            error={error.email}
                            onChange={handleInputChange("email")}
                        />
                        <InputField
                            type="password"
                            Icon={FaLock}
                            placeholder="Password"
                            value={input.password}
                            error={error.password}
                            onChange={handleInputChange("password")}
                        />

                        <Button
                            type="submit"
                            text="Signup"
                            loading={loading}
                            error={error.signup}
                        />
                    </form>
                </div>
            </main>
        </>
    );
};

export default SignupPage;
