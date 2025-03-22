import { Router } from "express";
import { body, oneOf, param } from "express-validator";

import { UserController } from "../controllers/UserController.js";
import { handleErrors } from "../middleware/validation.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.use(authenticate);

router.get("/count", UserController.getCount);
router.get("/", UserController.getAll);

router.get(
    "/:user_id",
    param("user_id").isInt().withMessage("El ID de usuario es inválido"),
    handleErrors,
    UserController.getById
);

router.patch(
    "/update",
    body("user_id")
        .isInt({ min: 1 })
        .withMessage("El user_id ingresado es inválido"),

    oneOf(
        [
            body("email").isEmail().withMessage("El correo es inválido"),
            body("full_name")
                .isLength({ min: 5 })
                .withMessage("Nombre completo inválido"),
            body("phone")
                .isLength({ min: 8, max: 8 })
                .withMessage("Teléfono inválido"),
            body("birthday")
                .isISO8601()
                .withMessage("Fecha de nacimiento inválido"),
            body("address")
                .isLength({ min: 5 })
                .withMessage("Dirección inválida"),
            body("rol_id")
                .isInt({ min: 1, max: 3 })
                .withMessage("El rol es inválido"),
            body("is_disabled").isInt(),
        ],
        {
            message: "Al menos un campo debe modificarse",
        }
    ),

    handleErrors,
    UserController.update
);

router.patch(
    "/update-status",
    body("user_id")
        .isInt({ min: 1 })
        .withMessage("El user_id ingresado es inválido"),

    body("is_disabled").isBoolean().withMessage("Debe ser 1 o 0"),

    handleErrors,
    UserController.updateStatus
);

export default router;
