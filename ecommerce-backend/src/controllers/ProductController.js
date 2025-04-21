import { checkPermissions } from "../middleware/permissions.js";
import { renameImage } from "../middleware/image.js";
import { ProductServices } from "../services/productServices.js";

export class ProductController {
    static getCount = async (req, res) => {
        try {
            const { minPrice, maxPrice, categories } = req.query;
    
            const filters = {
                minPrice: minPrice ? parseFloat(minPrice) : undefined,
                maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
                categories: categories ? categories.split(',') : undefined,
            };
    
            const count = await ProductServices.getCount(filters);
            res.send(count);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener el conteo de productos",
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

    static getAllPaginated = async (req, res) => {
        try {
            let { page = 1, limit = 10, minPrice, maxPrice, categories, sort } = req.query;
    
            page = parseInt(page);
            limit = parseInt(limit);
    
            if (isNaN(page) || page < 1) page = 1;
            if (isNaN(limit) || limit < 1) limit = 12;
    
            const offset = (page - 1) * limit;
    
            const filters = {
                minPrice: minPrice ? parseFloat(minPrice) : undefined,
                maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
                categories: categories ? categories.split(',') : undefined,
                sort
            };
    
            const products = await ProductServices.getPaginated(offset, limit, filters);
            res.send(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error al obtener productos paginados",
            });
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
                error: "Hubo un error " + error,
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
