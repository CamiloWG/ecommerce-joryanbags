import { checkPermissions } from "../middleware/permissions.js";
import { renameImage } from "../middleware/image.js";
import { ProductServices } from "../services/productServices.js";

export class ProductController {
    static getCount = async (req, res) => {
        try {
            checkPermissions(req, res, 2);
            const count = await ProductServices.getCount();
            res.send(count);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener el conteo de products",
            });
            console.error(error);
        }
    };
    static getAll = async (req, res) => {
        try {
            const products = await ProductServices.getAll();
            res.send(products);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener todos los productos",
            });
            console.error(error);
        }
    };

    static getTopPurchases = async (req, res) => {
        try {
            const products = await ProductServices.getTopPurchases();
            res.send(products);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener los productos más comprados",
            });
            console.error(error);
        }
    };

    static getBy = async (req, res) => {
        try {
            const products = await ProductServices.getBy(req.query);
            res.send(products);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener los productos",
            });
            console.error(error);
        }
    };

    static getById = async (req, res) => {
        try {
            const product = await ProductServices.getByProductId(
                req.params.product_id
            );
            res.send(product);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener el producto",
            });
            console.error(error);
        }
    };
    static create = async (req, res) => {
        try {
            checkPermissions(req, res, 2);
            const product = await ProductServices.create(req.body);
            renameImage(req.file, `product_${product.product_id}.png`);
            res.send(product);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error",
            });
            console.error(error);
        }
    };
    static update = async (req, res) => {
        try {
            checkPermissions(req, res, 2);
            const { product_id } = req.body;
            const product = await ProductServices.update(req.body);
            if (req.file) {
                await ProductServices.updateImage(product_id);
                renameImage(req.file, `product_${product_id}.png`);
            }
            if (!product.length) {
                const error = new Error("No se encontró el producto");
                res.status(404).json({
                    error: error.message,
                });
                return;
            }
            res.send(product);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar actualizar el producto",
            });
            console.error(error);
        }
    };

    static updateStatus = async (req, res) => {
        try {
            checkPermissions(req, res, 2);

            const { product_id } = req.body;
            const product = await ProductServices.updateStatus(product_id);
            res.send(product);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar actualizar el estado del producto",
            });
            console.error(error);
        }
    };
}
