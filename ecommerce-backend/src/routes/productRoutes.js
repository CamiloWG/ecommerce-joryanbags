import { Router } from "express";
import multer from "multer";

import { ProductController } from "../controllers/ProductController.js";
import { handleErrors } from "../middleware/validation.js";
import { authenticate } from "../middleware/auth.js";
import { body, param } from "express-validator";

// Imagenes
const upload = multer({
    dest: "./public",
});

const router = Router();

router.use(authenticate);

router.get("/count", ProductController.getCount);
router.get("/", ProductController.getAll);
router.get(
    "/get/:product_id",
    param("product_id")
        .isInt({
            min: 1,
        })
        .withMessage("ID de producto inválido"),
    handleErrors,
    ProductController.getById
);
router.get("/top", ProductController.getTopPurchases);

router.get(
    "/search",
    param("name").optional(),
    param("brand").optional(),
    param("price_min").optional(),
    param("price_max").optional(),
    param("category_id").optional(),
    ProductController.getBy
);

router.post(
    "/create",

    upload.single("image_url"),
    body("name").isLength({ min: 3, max: 100 }).withMessage("Nombre inválido"),
    body("brand").isLength({ min: 3, max: 50 }).withMessage("Marca inválida"),
    body("price")
        .isDecimal({ decimal_digits: 2 })
        .withMessage("Precio inválido"),
    body("stock").isInt({ min: 1 }).withMessage("Cantidad de stock inválido"),
    body("category_id").isInt({ min: 1 }).withMessage("Categoria inválida"),
    body("image_url").optional(),
    handleErrors,
    ProductController.create
);

router.patch(
    "/update",
    upload.single("image_url"),
    body("product_id")
        .isInt({
            min: 1,
        })
        .withMessage("ID de producto inválido"),
    body("name")
        .optional()
        .isLength({ min: 3, max: 100 })
        .withMessage("Nombre inválido"),
    body("brand")
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage("Marca inválida"),
    body("price")
        .optional()
        .isDecimal({ decimal_digits: 2, force_decimal: true })
        .withMessage("Precio inválido"),
    body("stock")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Cantidad de stock inválido"),
    body("category_id")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Categoria inválida"),
    body("code")
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage("Código inválido"),
    body("image_url").optional(),
    handleErrors,
    ProductController.update
);

router.patch(
    "/update-status",
    body("product_id")
        .isInt({ min: 1 })
        .withMessage("El product_id ingresado es inválido"),

    handleErrors,
    ProductController.updateStatus
);

export default router;
