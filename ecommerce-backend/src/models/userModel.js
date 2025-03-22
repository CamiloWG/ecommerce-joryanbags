import { DataTypes } from "sequelize";
import { sequelize } from "../data/db.js";

export const User = sequelize.define(
    "User",
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        full_name: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        birthday: {
            type: DataTypes.DATE,
        },
        address: {
            type: DataTypes.STRING,
        },
        rol_id: {
            type: DataTypes.INTEGER,
        },
        is_disabled: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        timestamps: false,
        tableName: "users",
    }
);
