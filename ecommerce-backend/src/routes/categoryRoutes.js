import { Router } from "express";

import { CategoryController } from "../controllers/CategoryController.js";
import { body, oneOf, param } from "express-validator";
import { handleErrors } from "../middleware/validation.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/count", CategoryController.getCount);
router.get(
    "/count/:category_id",
    param("category_id")
        .isInt({ min: 1 })
        .withMessage("El category_id es inválido"),
    handleErrors,
    CategoryController.getProductCount
);
router.get("/", CategoryController.getAll);
router.get(
    "/:category_id",
    param("category_id")
        .isInt({ min: 1 })
        .withMessage("El category_id es inválido"),
    handleErrors,
    CategoryController.getById
);

router.use(authenticate);

router.post(
    "/create",
    body("name")
        .isLength({
            min: 3,
        })
        .withMessage("Nombre inválido"),

    handleErrors,
    CategoryController.create
);

router.patch(
    "/update-status",

    body("category_id")
        .isInt({ min: 1 })
        .withMessage("El category_id ingresado es inváldio"),

    handleErrors,
    CategoryController.updateStatus
);

router.patch(
    "/update",
    body("category_id")
        .isInt({ min: 1 })
        .withMessage("El category_id ingresado es inváldio"),
    body("is_disabled").isBoolean().withMessage("Solo valores booleanos"),
    body("name")
        .isLength({
            min: 3,
        })
        .withMessage("Nombre inválido"),
    handleErrors,
    CategoryController.update
);

export default router;
