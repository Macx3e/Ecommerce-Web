const Order = require("../models/Order");

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ message: "Datos incompletos." });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado." });
    }

    order.orderStatus = status;
    
    if (status === "shipped") {
      order.shippedAt = new Date();
    }
    if (status === "delivered") {
      order.deliveredAt = new Date();
    }

    await order.save();
    res.json({ message: "Estado del pedido actualizado", order });
  } catch (error) {
    console.error("❌ Error al actualizar el estado:", error);
    res.status(500).json({ message: "Error al actualizar el estado", error });
  }
};

module.exports = { updateOrderStatus };
