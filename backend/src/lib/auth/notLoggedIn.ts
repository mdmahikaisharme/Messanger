import { Response } from "express";

export type NotLoggedIn = (res: Response) => void;

const notLoggedIn: NotLoggedIn = (res: Response) => {
    return res.status(401).json("You are not logged in.");
};

export default notLoggedIn;
