import { DataTypes } from "sequelize";
import { sequelize } from "../data/db.js";

export const OrderProducts = sequelize.define(
    "OrderProducts",
    {
        order_details_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
        },
        product_id: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        subtotal: {
            type: DataTypes.DECIMAL,
        },
    },
    {
        timestamps: false,
        tableName: "order_products",
    }
);
