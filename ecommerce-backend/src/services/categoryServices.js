import { sequelize } from "../data/db.js";
import { Category } from "../models/categoryModel.js";

export class CategoryServices {
    static getAll = async () => {
        const [results] = await sequelize.query("SELECT * FROM categories");
        return results;
    };

    static getCount = async () => {
        const [count] = await sequelize.query(
            "SELECT COUNT(*) as count FROM categories"
        );
        return count[0];
    };

    static getProductCount = async (category_id) => {
        const [count] = await sequelize.query(
            "SELECT COUNT(*) as count FROM products WHERE category_id = :category_id",
            {
                replacements: { category_id },
            }
        );
        return count[0];
    };

    static getByCategoryId = async (category_id) => {
        const { dataValues } = await Category.findByPk(category_id);
        return dataValues;
    };

    static create = async (name) => {
        const result = await sequelize.query(
            "EXECUTE CreateProductCategory :name",
            {
                replacements: { name },
            }
        );
        return result;
    };

    static update = async (data) => {
        const result = await sequelize.query(
            "EXECUTE UpdateCategory :category_id, :name, :is_disabled",
            {
                replacements: data,
            }
        );
        return result;
    };

    static updateStatus = async (data) => {
        const result = await sequelize.query(
            "EXECUTE UpdateCategoryStatus :category_id",
            {
                replacements: data,
            }
        );
        return result;
    };
}
