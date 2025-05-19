const Order = require("../models/Order");
const { sendOrderUpdate } = require("../utils/notificationService");

const updateOrderStatus = async (req, res) => {
  try {
    console.log("🔹 Solicitud recibida en updateOrderStatus");
    console.log("🔹 Datos recibidos:", req.body);

    const { orderId, status } = req.body;

    if (!orderId || !status) {
      console.error("❌ Datos incompletos en la solicitud.");
      return res.status(400).json({ message: "Datos incompletos." });
    }

    console.log(`🔍 Buscando pedido con ID: ${orderId}`);
    const order = await Order.findById(orderId).populate("user");

    if (!order) {
      console.error(`❌ Pedido con ID ${orderId} no encontrado.`);
      return res.status(404).json({ message: "Pedido no encontrado." });
    }

    console.log("🔹 Pedido encontrado:", order);
    order.orderStatus = status;

    if (status === "shipped") {
      order.shippedAt = new Date();
    }
    if (status === "delivered") {
      order.deliveredAt = new Date();
    }

    await order.save();
    console.log(`✅ Estado del pedido actualizado a "${status}".`);

    console.log(`🔹 Enviando correo de notificación a ${order.user.email}...`);
    await sendOrderUpdate(order.user.email, status);
    console.log("✅ Correo enviado correctamente.");

    res.json({ message: "Estado del pedido actualizado", order });
  } catch (error) {
    console.error("❌ Error en updateOrderStatus:", error);
    res.status(500).json({ message: "Error al actualizar el pedido", error });
  }
};

module.exports = { updateOrderStatus };
