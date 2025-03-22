import { Router } from "express";
import { body, param } from "express-validator";

import { AuthController } from "../controllers/AuthController.js";
import { handleErrors } from "../middleware/validation.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post(
    "/register",
    body("email").isEmail().withMessage("El correo es inválido"),
    body("password").isLength({ min: 5 }).withMessage("Contraseña inválida"),
    body("full_name")
        .isLength({ min: 5 })
        .withMessage("Nombre completo inválido"),
    body("phone").isLength({ min: 8, max: 8 }).withMessage("Teléfono inválido"),
    body("birthday").isISO8601().withMessage("Fecha de nacimiento inválido"),
    body("rol_id")
        .isInt({ min: 1, max: 3 })
        .withMessage("El rol_id es inválido"),
    body("address").isLength({ min: 5 }).withMessage("Dirección inválida"),

    handleErrors,
    AuthController.register
);

router.post(
    "/login",
    body("email").isEmail().withMessage("El correo es inválido"),
    body("password").isLength({ min: 5 }).withMessage("Contraseña inválida"),

    handleErrors,
    AuthController.login
);

router.get("/user", authenticate, AuthController.user);

export default router;
