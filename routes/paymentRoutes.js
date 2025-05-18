const express = require("express");
const { processPayment } = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

console.log("🔍 Configurando ruta de pagos...");

router.post("/", protect, (req, res, next) => {
  console.log("📩 Solicitud recibida en /api/payment");
  console.log("📦 Datos enviados:", req.body); // Log para verificar los datos enviados
  next();
}, processPayment);

console.log("✅ Ruta de pagos configurada correctamente.");

module.exports = router;
