import bcrypt from "bcrypt";

import { SALT_ROUNDS } from "../config/securityConfig.js";
import { generateJWT } from "../utils/jwt.js";
import { AuthServices } from "../services/authServices.js";
import { UserServices } from "../services/userServices.js";

export class AuthController {
    static register = async (req, res) => {
        try {
            const { email, password } = req.body;

            const userExists = await UserServices.searchEmail(email);

            if (userExists) {
                const error = new Error("Ya existe ese correo.");
                res.status(409).json({
                    error: error.message,
                });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            const user = await AuthServices.register({
                ...req.body,
                password: hashedPassword,
            });
            const { user_id } = user[0];
            const token = generateJWT({ user_id });
            res.send(token);
        } catch (error) {
            res.status(500).json({
                message: "Hubo un error al intentar registrar al usuario",
            });
            console.error(error);
        }
    };

    static login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await UserServices.searchEmail(email);

            if (!user) {
                const error = new Error("No existe ese correo.");
                res.status(409).json({
                    error: error.message,
                });
                return;
            }
            const verifyPassword = await bcrypt.compare(
                password,
                user.dataValues.password
            );
            if (!verifyPassword) {
                const error = new Error("Datos erróneos.");
                res.status(401).json({
                    error: error.message,
                });
                return;
            }
            if (user.dataValues.is_disabled) {
                const error = new Error("El usuario está inhabilitado.");
                res.status(423).json({
                    error: error.message,
                });
                return;
            }
            const { user_id } = user.dataValues;
            const token = generateJWT({ user_id });
            res.send(token);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar iniciar sesión del usuario",
            });
            console.error(error);
        }
    };

    static user = async (req, res) => {
        return res.send(req.user);
    };
}
