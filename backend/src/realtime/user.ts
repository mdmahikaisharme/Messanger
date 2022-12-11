import { iUser } from "../types/realtime";

let users: iUser[] = [];

function addUser(newUser: iUser): void {
    let isUserFound: boolean = false;

    // IF user in realtime THEN just change the socket id
    users = users.map((user) => {
        if (user.userId !== newUser.userId) return user;

        isUserFound = true;
        return newUser;
    });

    // user NOT found in realtime THEN add user
    if (isUserFound) return;
    users = [...users, newUser];
}

function removeUser(socketId: string): void {
    users = users.filter((user) => user.socketId !== socketId);
}

function getUser(userId: string) {
    return users.find((user) => user.userId === userId);
}

function showUsers(): void {
    console.log(users);
}

export { addUser, removeUser, getUser, showUsers };
