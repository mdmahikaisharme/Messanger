import dotenv from "dotenv";

dotenv.config();

const config = {
    PORT: process.env.PORT || "",
    BACKEND_URL: process.env.BACKEND_URL || "",
    DATABASE_URI: process.env.DATABASE_URI || "",
    FRONTEND_URL: process.env.FRONTEND_URL || "",
    ACCESS_KEY: process.env.ACCESS_KEY || "",
    REFRESH_KEY: process.env.REFRESH_KEY || "",
};

export default config;
