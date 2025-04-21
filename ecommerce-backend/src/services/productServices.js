import { where, Op } from "sequelize";
import { sequelize } from "../data/db.js";
import { Product } from "../models/productModel.js";
import { Category } from "../models/categoryModel.js";

export class ProductServices {
    static getCount = async (filters) => {
        const where = {};
    
        if (filters.minPrice && filters.maxPrice) {
            where.price = {
                [Op.between]: [filters.minPrice, filters.maxPrice]
            };
        }
    
        if (filters.categories) {
            where.category_id = {
                [Op.in]: filters.categories
            };
        }
    
        const count = await Product.count({ where });
        return { count };
    };

    static getAll = async () => {
        const [results] = await sequelize.query("LoadAllProducts");
        return results;
    };

    static async getPaginated(offset, limit, filters) {
        const where = {};
        const order = [];
    
        if (filters.minPrice && filters.maxPrice) {
            where.price = {
                [Op.between]: [filters.minPrice, filters.maxPrice]
            };
        }
    
        if (filters.categories) {
            where.category_id = {
                [Op.in]: filters.categories
            };
        }
    
        if (filters.sort === 'price_asc') {
            order.push(['price', 'ASC']);
        } else if (filters.sort === 'price_desc') {
            order.push(['price', 'DESC']);
        } else {
            order.push(['product_id', 'DESC']); 
        }
    
        const products = await Product.findAll({
            where,
            order,
            limit,
            offset
        });
    
        return products;
    }
    

    static getTopPurchases = async () => {
        const [results] = await sequelize.query("LoadTopProducts");
        return results;
    };

    static getBy = async (data) => {
        const {
            name = null,
            brand = null,
            price_min = null,
            price_max = null,
            category_id = null,
        } = data;
        console.log(price_min);
        const [results] = await sequelize.query(
            "LoadProducts :name, :brand, :price_min, :price_max, :category_id",
            {
                replacements: {
                    name,
                    brand,
                    price_min,
                    price_max,
                    category_id,
                },
            }
        );
        return results;
    };

    static getByProductId = async (product_id) => {
        const result = await Product.findByPk(product_id);
        const categoria = await Category.findByPk(result.dataValues.category_id);
        return {...result.dataValues, category_name: categoria.dataValues.name};
    };

    static create = async (data) => {
        const [result] = await sequelize.query(
            "CreateProduct :name, :brand, :price, :description, :stock, :category_id, null",
            {
                replacements: data,
            }
        );
        const { product_id } = result[0];
        await this.updateImage(product_id);
        return result[0];
    };

    static update = async (data) => {
        const {
            product_id,
            name = null,
            brand = null,
            category_id = null,
            price = null,
            stock = null,
            code = null,
        } = data;

        const [result] = await sequelize.query(
            "UpdateProduct :product_id, :name, :brand, :price, :stock, :category_id, :code",
            {
                replacements: {
                    product_id,
                    name,
                    brand,
                    category_id,
                    price,
                    stock,
                    code,
                },
            }
        );
        return result;
    };

    static updateImage = async (product_id) => {
        const filePath = `/public/product_${product_id}.png`;

        await Product.update(
            {
                image_url: filePath,
            },
            {
                where: {
                    product_id,
                },
            }
        );
    };

    static updateStatus = async (product_id) => {
        const [result] = await sequelize.query(
            "UpdateProductStatus :product_id",
            {
                replacements: { product_id },
            }
        );
        return result;
    };
}
