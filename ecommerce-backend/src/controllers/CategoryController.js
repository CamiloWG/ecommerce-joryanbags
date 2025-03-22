import { checkPermissions } from "../middleware/permissions.js";
import { CategoryServices } from "../services/categoryServices.js";

export class CategoryController {
    static getAll = async (req, res) => {
        try {
            const categories = await CategoryServices.getAll();
            res.send(categories);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener las categorias",
            });
            console.error(error);
        }
    };

    static getById = async (req, res) => {
        try {
            checkPermissions(req, res, 2);
            const { category_id } = req.params;
            const category = await CategoryServices.getByCategoryId(
                category_id
            );
            res.send(category);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener la categoria",
            });
            console.error(error);
        }
    };

    static create = async (req, res) => {
        try {
            checkPermissions(req, res, 2);

            const { name } = req.body;
            const category = await CategoryServices.create(name);
            res.send(category);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar crear una categoria",
            });
            console.error(error);
        }
    };

    static updateStatus = async (req, res) => {
        try {
            checkPermissions(req, res, 2);

            const category = await CategoryServices.updateStatus(req.body);
            res.send(category);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar eliminar una categoria",
            });
            console.error(error);
        }
    };

    static update = async (req, res) => {
        try {
            checkPermissions(req, res, 2);
            const category = await CategoryServices.update(req.body);
            res.send(category);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar eliminar una categoria",
            });
            console.error(error);
        }
    };

    static getCount = async (req, res) => {
        try {
            checkPermissions(req, res, 2);
            const count = await CategoryServices.getCount();
            res.send(count);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener el conteo de categorias",
            });
            console.error(error);
        }
    };

    static getProductCount = async (req, res) => {
        try {
            checkPermissions(req, res, 2);
            const { category_id } = req.params;
            const count = await CategoryServices.getProductCount(category_id);
            res.send(count);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener el conteo de categorias",
            });
            console.error(error);
        }
    };
}
