import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

export const sequelize = new Sequelize(
    process.env.NAME,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: "mssql",
        dialectOptions: {
            options: {
                encrypt: true,
                trustServerCertificate: true,
            },
        },
    }
);
