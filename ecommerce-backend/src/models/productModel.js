import { DataTypes } from "sequelize";
import { sequelize } from "../data/db.js";

export const Product = sequelize.define(
    "Product",
    {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        brand: {
            type: DataTypes.STRING,
        },
        category_id: {
            type: DataTypes.INTEGER,
        },
        image_url: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DECIMAL,
        },
        stock: {
            type: DataTypes.INTEGER,
        },
        is_disabled: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        tableName: "products",
        timestamps: false,
    }
);
