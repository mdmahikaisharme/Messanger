import type { AppProps } from "next/app";
import { Router } from "next/router";
import Head from "next/head";
import nProgress from "nprogress";
import { AppContextProvider } from "context/App";
import "@styles/tailwind.css";
import "@styles/nprogress.css";
import "@styles/app.scss";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Messagner</title>
                <meta name="description" content="a new messaging app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppContextProvider>
                <Component {...pageProps} />
            </AppContextProvider>
        </>
    );
}

export default MyApp;
