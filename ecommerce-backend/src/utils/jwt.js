import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateJWT = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: "7d",
    });
    return token;
};
