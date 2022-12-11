import http from "http";
import { Server, Socket } from "socket.io";
import axios, { AxiosResponse } from "axios";
import { addUser, getUser, removeUser } from "./user";
import {
    iCreateMessage,
    iGetMessage,
    iRealtime,
    iSendMessage,
} from "../types/realtime";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import config from "../config";

type IO = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
type SOCKET = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export default function realtime(server: http.Server) {
    const io = new Server(server, {
        cors: {
            origin: config.FRONTEND_URL,
        },
    });

    // Connection
    io.on("connection", (socket) => {
        console.log(`Connected: ${socket.id}`);

        socket.on("join", join(socket));
        socket.on("sendMessage", sendMessage(io));
        socket.on("disconnect", disconnect(socket));
    });

    // Log
    console.log(`Realtime added to server`);
}

function join(socket: SOCKET) {
    return ({ userId }: iRealtime) => {
        socket.join(userId);
        addUser({ socketId: socket.id, userId });
        console.log(`joinned: ${userId}`);
    };
}

function sendMessage(io: IO) {
    return async ({ members, message, accessToken }: iSendMessage) => {
        try {
            const request = await axios.post<
                iGetMessage,
                AxiosResponse<iGetMessage>,
                iCreateMessage
            >(`${config.BACKEND_URL}/message`, message, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `@access${accessToken}`,
                },
            });

            // EMIT new message
            members.forEach((member: string) => {
                if (!getUser(member)) return;
                io.to(member).emit("newMessage", request.data);
            });
        } catch (error) {
            console.log(error);
        }
    };
}

function disconnect(socket: SOCKET) {
    return () => {
        removeUser(socket.id);
        console.log(`Disconnected: ${socket.id}`);
    };
}
