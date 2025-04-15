import { sequelize } from "../data/db.js";
import { OrderProducts } from "../models/orderProductsModel.js";
import { Product } from "../models/productModel.js";

export class OrderServices {
    static getEarnings = async () => {
        const [results] = await sequelize.query(`
            SELECT
                -- TOTAL
                (SELECT SUM(total_price) FROM orders WHERE status_id IN (2, 4, 5)) AS total_earnings,
                (SELECT COUNT(*) FROM orders WHERE status_id IN (2, 4, 5)) AS total_sales,
    
                -- HOY
                (SELECT SUM(total_price) FROM orders 
                 WHERE status_id IN (2, 4, 5) AND CONVERT(DATE, date_creation) = CONVERT(DATE, GETDATE())
                ) AS today_earnings,
                (SELECT COUNT(*) FROM orders 
                 WHERE status_id IN (2, 4, 5) AND CONVERT(DATE, date_creation) = CONVERT(DATE, GETDATE())
                ) AS today_sales,
    
                -- ÚLTIMA SEMANA
                (SELECT SUM(total_price) FROM orders 
                 WHERE status_id IN (2, 4, 5) AND date_creation >= DATEADD(DAY, -7, GETDATE())
                ) AS last_week_earnings,
                (SELECT COUNT(*) FROM orders 
                 WHERE status_id IN (2, 4, 5) AND date_creation >= DATEADD(DAY, -7, GETDATE())
                ) AS last_week_sales,
    
                -- ÚLTIMO MES
                (SELECT SUM(total_price) FROM orders 
                 WHERE status_id IN (2, 4, 5) AND date_creation >= DATEADD(MONTH, -1, GETDATE())
                ) AS last_month_earnings,
                (SELECT COUNT(*) FROM orders 
                 WHERE status_id IN (2, 4, 5) AND date_creation >= DATEADD(MONTH, -1, GETDATE())
                ) AS last_month_sales,
    
                -- ÚLTIMOS 3 MESES
                (SELECT SUM(total_price) FROM orders 
                 WHERE status_id IN (2, 4, 5) AND date_creation >= DATEADD(MONTH, -3, GETDATE())
                ) AS last_3_months_earnings,
                (SELECT COUNT(*) FROM orders 
                 WHERE status_id IN (2, 4, 5) AND date_creation >= DATEADD(MONTH, -3, GETDATE())
                ) AS last_3_months_sales
        `);
    
        const r = results[0];
    
        return {
            earnings: {
                total: r.total_earnings || 0,
                today: r.today_earnings || 0,
                last_week: r.last_week_earnings || 0,
                last_month: r.last_month_earnings || 0,
                last_3_months: r.last_3_months_earnings || 0,
            },
            salesCount: {
                total: r.total_sales || 0,
                today: r.today_sales || 0,
                last_week: r.last_week_sales || 0,
                last_month: r.last_month_sales || 0,
                last_3_months: r.last_3_months_sales || 0,
            }
        };
    };

    static getCount = async () => {
        const [count] = await sequelize.query(
            "SELECT COUNT(*) as count FROM orders"
        );
        return count[0];
    };

    static getAll = async () => {
        const [results] = await sequelize.query("EXECUTE LoadOrders");
        return results;
    };

    static getByUserId = async (user_id) => {
        const [results] = await sequelize.query(
            "EXECUTE LoadOrdersByUser :user_id",
            {
                replacements: {
                    user_id,
                },
            }
        );
        return results;
    };

    static getByOrderId = async (order_id) => {
        const [results] = await sequelize.query("EXECUTE LoadOrder :order_id", {
            replacements: {
                order_id,
            },
        });
        return results[0];
    };

    static updateStatus = async (data) => {
        const [results] = await sequelize.query(
            "EXECUTE UpdateOrderStatus :order_id, :status",
            {
                replacements: data,
            }
        );
        return results;
    };

    static updateStatusFromPaymentReference = async (paymentReference, status) => {        
        const [orders] = await sequelize.query(
            "SELECT order_id FROM orders WHERE order_payment_id = :paymentReference",
            {
                replacements: { paymentReference },
            }
        );
    
        if (!orders || orders.length === 0) {
            throw new Error("No se encontró ninguna orden con ese paymentReference.");
        }
    
        const order_id = orders[0].order_id;
    
        const [result] = await sequelize.query(
            "EXECUTE UpdateOrderStatus :order_id, :status",
            {
                replacements: { order_id, status },
            }
        );
    
        return result;
    };
    

    static getStock = async (products) => {
        const stock = await Product.findAll({
            where: {
                product_id: products,
            },
            attributes: ["product_id", "name", "stock"],
        });
        return stock;
    };

    static create = async (data) => {
        const [order] = await sequelize.query("EXECUTE CreateOrder :user_id, :payment_id, :price, :detalles", {
            replacements: data,
        });
        return order;
    };

    static createDetail = async (data) => {
        const detail = await sequelize.query(
            "EXECUTE CreateOrderProducts :order_id, :product_id, :quantity",
            {
                replacements: data,
            }
        );
        return detail;
    };

    static getDetail = async (order_id) => {
        const [detail] = await sequelize.query(
            "EXECUTE LoadOrderDetailsByMaster :order_id",
            {
                replacements: { order_id },
            }
        );
        return detail;
    };

    static getDetailById = async (order_details_id) => {
        const orderDetail = await OrderProducts.findByPk(order_details_id);
        return orderDetail;
    };

    static getProductByDetail = async (order_details_id) => {
        const [product] = await sequelize.query(
            "EXECUTE GetProductByDetail :order_details_id",
            {
                replacements: { order_details_id },
            }
        );
        return product[0];
    };

    static updateDetail = async (data) => {
        const [detail] = await sequelize.query(
            "EXECUTE UpdateOrderProducts :order_details_id, :product_id, :quantity",
            {
                replacements: data,
            }
        );
        return detail;
    };

    static deleteDetail = async (order_details_id) => {
        const order = await OrderProducts.destroy({
            where: {
                order_details_id,
            },
        });
        return order;
    };
}
