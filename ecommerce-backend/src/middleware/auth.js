import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { UserServices } from "../services/userServices.js";

dotenv.config();

export const authenticate = async (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        req.user = {};
        const error = new Error("No autorizado");
        res.status(401).json({ error: error.message });
        return;
    }
    const token = bearer.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (decoded.user_id) {
            const [user] = await UserServices.getByUserId(decoded.user_id);
            const { user_id, email, rol_id, full_name } = user;

            if (user) {
                req.user = {
                    user_id,
                    email,
                    rol_id,
                    full_name,
                };
                return next();
            } else {
                req.user = {};
                res.status(401).json({
                    error: "Token inválido (user_id)",
                });
            }
        } else
            res.status(401).json({
                error: "Token inválido (decoded)",
            });
    } catch (error) {
        res.status(500).json({
            error: "Token inválido",
        });
        console.log(error);
    }
};
