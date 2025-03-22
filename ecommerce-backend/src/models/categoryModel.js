import { DataTypes } from "sequelize";
import { sequelize } from "../data/db.js";

export const Category = sequelize.define(
    "Category",
    {
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        is_disabled: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        tableName: "categories",
        timestamps: false,
    }
);
