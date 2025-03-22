import { DataTypes } from "sequelize";
import { sequelize } from "../data/db.js";

export const Order = sequelize.define(
    "Order",
    {
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        date_creation: {
            type: DataTypes.DATE,
        },
    },
    {
        timestamps: false,
        tableName: "orders",
    }
);
