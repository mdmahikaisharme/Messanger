import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { COOKIE } from "@lib/cookie";
import services from "@services";

export default function withAuthSSR(gssp: GetServerSideProps) {
    return async (context: GetServerSidePropsContext) => {
        const cookies = context.req.cookies;

        // access token
        if (cookies[COOKIE.AccessToken]) {
            return await gssp(context);
        }

        // refresh token
        if (cookies[COOKIE.RefreshToken]) {
            try {
                const request = await services.auth.refresh(
                    cookies[COOKIE.RefreshToken]
                );

                if (request.status === 200) {
                    // set cookies on request object
                    context.req.cookies = {
                        [COOKIE.AccessToken]: request.data.accessToken,
                        [COOKIE.RefreshToken]: request.data.refreshToken,
                    };

                    // set cookies on response object
                    context.res.setHeader(
                        "Set-Cookie",
                        `${COOKIE.AccessToken}=${request.data.accessToken}`
                    );
                    // context.res.setHeader(
                    //     "Set-Cookie",
                    //     `${COOKIE.RefreshToken}=${request.data.refreshToken}`
                    // );

                    return {
                        redirect: {
                            destination: context.req.url,
                        },
                    };
                }
            } catch {}
        }

        // login
        return {
            redirect: {
                destination: `/auth/login`,
            },
        };
    };
}
