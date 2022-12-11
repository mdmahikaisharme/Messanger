import mongoose from "mongoose";
import { iUser } from "../types/model";

const UserSchema = new mongoose.Schema<iUser>({
    name: String,
    email: String,
    password: String,
    image: String,
    createdAt: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export type { iUser };
export default User;
