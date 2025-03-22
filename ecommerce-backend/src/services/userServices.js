import { sequelize } from "../data/db.js";
import { User } from "../models/userModel.js";

export class UserServices {
    static getAll = async () => {
        const [results] = await sequelize.query(
            "EXECUTE [dbo].[LoadUsersData]"
        );
        return results;
    };

    static getByUserId = async (user_id) => {
        try {
            const [results] = await sequelize.query(
                "EXECUTE [dbo].[LoadUserData] :user_id",
                {
                    replacements: { user_id },
                }
            );
            return results;
        } catch (error) {
            throw error;
        }
    };

    static getCount = async () => {
        const [count] = await sequelize.query(
            "SELECT COUNT(*) as count FROM users"
        );
        return count[0];
    };

    static searchEmail = async (email) => {
        const [results] = await User.findAll({
            where: {
                email,
            },
        });
        return results;
    };

    static update = async (data) => {
        const {
            user_id,
            email = null,
            full_name = null,
            phone = null,
            birthday = null,
            address = null,
            rol_id = null,
            is_disabled = null,
        } = data;

        const [results] = await sequelize.query(
            "EXECUTE [dbo].[UpdateUser] :user_id, :email, :full_name, :phone, :birthday, :address, :is_disabled, :rol_id ",
            {
                replacements: {
                    user_id,
                    email,
                    full_name,
                    phone,
                    birthday,
                    address,
                    is_disabled,
                    rol_id,
                },
            }
        );
        return results;
    };
}
