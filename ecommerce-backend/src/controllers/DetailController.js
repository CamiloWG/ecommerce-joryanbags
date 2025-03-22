import { OrderServices } from "../services/orderServices.js";

export class DetailController {
    static getByMaster = async (req, res) => {
        try {
            const { order_id } = req.params;

            const detail = await OrderServices.getDetail(order_id);

            if (!detail) {
                const error = new Error(
                    "No hay detalles para esa orden o la orden no existe"
                );
                res.status(404).json({
                    error: error.message,
                });
                return;
            }

            res.send(detail);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener todos los detalles de la orden",
            });
            console.error(error);
        }
    };

    static getById = async (req, res) => {
        try {
            const { order_details_id } = req.params;

            const detail = await OrderServices.getDetailById(order_details_id);

            if (!detail) {
                const error = new Error("No existe ese detalle");
                res.status(404).json({
                    error: error.message,
                });
                return;
            }

            res.send(detail);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener todos los detalles de la orden",
            });
            console.error(error);
        }
    };

    static getProductByDetail = async (req, res) => {
        try {
            const { order_details_id } = req.params;
            const product = await OrderServices.getProductByDetail(
                order_details_id
            );

            if (!product) {
                const error = new Error("No existe ese detalle");
                res.status(404).json({
                    error: error.message,
                });
                return;
            }

            res.send(product);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener todos los detalles de la orden",
            });
            console.error(error);
        }
    };

    static update = async (req, res) => {
        try {
            const { order_details_id, product_id, quantity } = req.body;

            const detail = await OrderServices.getDetailById(order_details_id);
            if (!detail) {
                const error = new Error("No existe ese detalle");
                res.status(404).json({
                    error: error.message,
                });
                return;
            }

            const stock = await OrderServices.getStock(product_id);
            if (quantity > stock) {
                const error = new Error(
                    `El producto ${stock[0].name} no tiene suficiente stock`
                );
                return res.status(409).json({
                    error: error.message,
                });
            }

            const orderDetail = await OrderServices.updateDetail(req.body);
            res.send(orderDetail);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar actualizar la orden",
            });
            console.error(error);
        }
    };
}
