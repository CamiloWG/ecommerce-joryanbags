import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config/securityConfig";

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};
