import { checkPermissions } from "../middleware/permissions.js";
import { OrderServices } from "../services/orderServices.js";

export class OrderController {
    static getEarnings = async (req, res) => {
        try {
            checkPermissions(req, res, 2);
            const earnings = await OrderServices.getEarnings();
            res.send(earnings);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener las ganancias de órdenes",
            });
            console.error(error);
        }
    };
    static getCount = async (req, res) => {
        try {
            checkPermissions(req, res, 2);
            const count = await OrderServices.getCount();
            res.send(count);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener el conteo de órdenes",
            });
            console.error(error);
        }
    };
    static getAll = async (req, res) => {
        try {
            checkPermissions(req, res, 2);
            const orders = await OrderServices.getAll();
            if (!orders) {
                const error = new Error("No hay datos.");
                res.status(404).json({
                    error: error.message,
                });
                return;
            }
            res.send(orders);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener todas las ordenes",
            });
            console.error(error);
        }
    };

    static getByUserId = async (req, res) => {
        try {
            const { user_id } = req.params;
            if (user_id != req.user.user_id) {
                const error = new Error("No autorizado");
                return res.status(401).json({ error: error.message });
            }

            const order = await OrderServices.getByUserId(user_id);
            res.send(order);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener todas las ordenes",
            });
            console.error(error);
        }
    };

    static getById = async (req, res) => {
        try {
            const { order_id } = req.params;
            const order = await OrderServices.getByOrderId(order_id);
            if (!order) {
                const error = new Error("No existe esa orden");
                res.status(404).json({
                    error: error.message,
                });
                return;
            }
            if (order.user_id != req.user.user_id && req.user.rol_id === 1) {
                const error = new Error("No autorizado");
                return res.status(401).json({ error: error.message });
            }
            res.send(order);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener una orden",
            });
            console.error(error);
        }
    };

    static checkById = async (req, res) => {
        try {
            const { order_id } = req.params;
            const order = await OrderServices.getByOrderId(order_id);
            if (!order) {
                const error = new Error("No existe esa orden");
                res.status(404).json({
                    error: error.message,
                });
                return;
            }
            if (req.user.rol_id === 1)
                return res.status(401).json({ error: "No autorizado" });
            res.send(order);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener una orden",
            });
            console.error(error);
        }
    };

    static create = async (req, res) => {
        try {
            const { user_id } = req.user;
            const { cart } = req.body;

            const products = cart.map((item) => item.product_id);
            const quantities = cart.map((item) => item.quantity);

            const productStock = await OrderServices.getStock(products);

            for (let i = 0; i < cart.length; i++) {
                const productIndex = productStock.findIndex(
                    (item) => item.product_id === cart[i].product_id
                );
                if (quantities[i] > productStock[productIndex].stock) {
                    const error = new Error(
                        `El producto ${productStock[productIndex].name} no tiene suficiente stock`
                    );
                    return res.status(409).json({
                        error: error.message,
                    });
                }
            }

            const [order] = await OrderServices.create(user_id);

            for (const item of cart) {
                const { product_id, quantity } = item;
                await OrderServices.createDetail({
                    order_id: order.order_id,
                    product_id,
                    quantity,
                });
            }

            res.send(order);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar crear una orden",
            });
            console.error(error);
        }
    };

    static cancel = async (req, res) => {
        try {
            const { user_id } = req.user;
            const { order_id } = req.body;

            const order = await OrderServices.getByOrderId(order_id);

            if (!order) {
                const error = new Error("No existe esa orden");
                res.status(404).json({
                    error: error.message,
                });
                return;
            }
            if (order.user_id !== user_id) {
                const error = new Error("No autorizado");
                res.status(401).json({
                    error: error.message,
                });
                return;
            }

            await OrderServices.updateStatus({
                order_id,
                status: 4,
            });
            res.json(order);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar cancelar una orden",
            });
            console.error(error);
        }
    };

    static updateStatus = async (req, res) => {
        try {
            checkPermissions(req, res, 2);
            const order = await OrderServices.updateStatus(req.body);
            res.json(order);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar actualizar el estado de una orden",
            });
            console.error(error);
        }
    };
}
