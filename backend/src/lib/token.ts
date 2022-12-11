import { Response } from "express";
import cookie, { CookieSerializeOptions } from "cookie";
import jwt from "jsonwebtoken";
import { iUser } from "../model";
import config from "../config";

export interface iAccessTokenPayload {
    userId: string;
}
export interface iRefreshTokenPayload {
    userId: string;
    createdAt: string;
}
export interface iTokenInfo {
    iat: number;
    exp: number;
}
export interface iAccessToken extends iAccessTokenPayload, iTokenInfo {}
export interface iRefreshToken extends iRefreshTokenPayload, iTokenInfo {}

// token const
export enum TOKEN {
    AccessToken = "access",
    RefreshToken = "refresh",
}
export enum TOKEN_EXPIRATION {
    Access = 60 * 60 * 12,
    Refresh = 60 * 60 * 24,
}

// token options
const accessTokenOptions = {
    expiresIn: TOKEN_EXPIRATION.Access,
};
const refreshTokenOptions = {
    expiresIn: TOKEN_EXPIRATION.Refresh,
};

// cookie options
const defaultCookieOptions: CookieSerializeOptions = {
    // secure: isProduction,
    // sameSite: isProduction ? "strict" : "lax",
    // domain: BASE_DOMAIN,
    path: "/",
    httpOnly: true,
};
const accessCookieOptions: CookieSerializeOptions = {
    ...defaultCookieOptions,
    maxAge: TOKEN_EXPIRATION.Access * 1000,
};
const refreshCookieOptions: CookieSerializeOptions = {
    ...defaultCookieOptions,
    maxAge: TOKEN_EXPIRATION.Refresh * 1000,
};
const expiredCookieOptions: CookieSerializeOptions = {
    ...defaultCookieOptions,
    maxAge: 0,
};

// ----- ----- ----- ----- -----   ----- ----- ----- ----- -----
// ----- ----- ----- ----- build ----- ----- ----- ----- -----
// ----- ----- ----- ----- -----   ----- ----- ----- ----- -----
export async function buildTokens(user: iUser) {
    const accessTokenPayload: iAccessTokenPayload = {
        userId: user._id,
    };
    const refreshTokenPayload: iRefreshTokenPayload = {
        userId: user._id,
        createdAt: user.createdAt,
    };

    const accessToken = await buildAccessToken(accessTokenPayload);
    const refreshToken = await buildRefreshToken(refreshTokenPayload);

    return {
        accessToken,
        refreshToken,
    };
}
export async function buildAccessToken(payload: iAccessTokenPayload) {
    return jwt.sign(payload, config.ACCESS_KEY, accessTokenOptions);
}
export async function buildRefreshToken(payload: iRefreshTokenPayload) {
    return jwt.sign(payload, config.REFRESH_KEY, refreshTokenOptions);
}

// ----- ----- ----- ----- -----   ----- ----- ----- ----- -----
// ----- ----- ----- ----- verify ----- ----- ----- ----- -----
// ----- ----- ----- ----- -----   ----- ----- ----- ----- -----
export async function verifyAccessToken(token: string) {
    try {
        return jwt.verify(token, config.ACCESS_KEY) as iAccessToken;
    } catch {
        return null;
    }
}
export async function verifyRefreshToken(token: string) {
    try {
        return jwt.verify(token, config.REFRESH_KEY) as iRefreshToken;
    } catch {
        return null;
    }
}

// ----- ----- ----- ----- -----   ----- ----- ----- ----- -----
// ----- ----- ----- ----- cookie based func ----- ----- ----- -----
// ----- ----- ----- ----- -----   ----- ----- ----- ----- -----
export async function setTokensInCookies(
    res: Response,
    accessToken: string,
    refreshToken: string
) {
    const accessCookie = cookie.serialize(
        TOKEN.AccessToken,
        accessToken,
        accessCookieOptions
    );
    const refreshCookie = cookie.serialize(
        TOKEN.RefreshToken,
        refreshToken,
        refreshCookieOptions
    );

    res.setHeader("Set-Cookie", [accessCookie, refreshCookie]);
}
export async function clearTokensInCookies(
    res: Response,
    accessToken: string,
    refreshToken: string
) {
    const accessCookie = cookie.serialize(
        TOKEN.AccessToken,
        "",
        expiredCookieOptions
    );
    const refreshCookie = cookie.serialize(
        TOKEN.RefreshToken,
        "",
        expiredCookieOptions
    );

    res.setHeader("Set-Cookie", [accessCookie, refreshCookie]);
}
