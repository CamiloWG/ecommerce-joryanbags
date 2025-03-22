import { sequelize } from "../data/db.js";

export class AuthServices {
    static register = async (data) => {
        const [results] = await sequelize.query(
            "EXECUTE [dbo].[CreateUser] :email, :password, :full_name, :phone, :birthday, :rol_id, :address",
            {
                replacements: data,
            }
        );
        return results;
    };
}
