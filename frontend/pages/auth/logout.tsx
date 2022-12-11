import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { useAppContext } from "context/App";
import cookie, { COOKIE } from "@lib/cookie";
import services from "@services";
import styles from "@styles/Auth.module.scss";

const LogoutPage: NextPage = () => {
    const appContext = useAppContext();

    const handleSignup = async (e: any) => {
        e.preventDefault();

        const request = await services.auth.logout(
            cookie.get(COOKIE.AccessToken)
        );
        // set cookies
        cookie.set(COOKIE.AccessToken, "");
        cookie.set(COOKIE.RefreshToken, "");

        // set user
        appContext.dispatch({ type: "LOGOUT" });
        Router.push("/login");
    };

    return (
        <>
            <Head>
                <title>Logout</title>
            </Head>

            <main className={styles.auth}>
                <div className={styles.authHold}>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="loadingSpin" />
                        <span className="font-semibold text-gray-500">
                            Logout
                        </span>
                    </div>
                </div>
            </main>
        </>
    );
};

export default LogoutPage;
