import { sequelize } from "../data/db.js";

export class AuthServices {
    static register = async (data) => {
        console.log(data);
        
        const [results] = await sequelize.query(
            "EXECUTE [dbo].[CreateUser] :email, :password, :full_name, :phone, :rol_id, :address",
            {
                replacements: data,
            }
        );
        return results;
    };
}
