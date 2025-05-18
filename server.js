require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

console.log("🚀 Servidor iniciando...");

// Middleware
app.use(express.json()); // Asegura que el backend procese JSON correctamente
app.use(cors());

// Conectar a MongoDB
connectDB();

// Verificar que `.env` se carga correctamente
console.log("🔍 JWT_SECRET:", process.env.JWT_SECRET);
console.log("🔍 STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY);

// Cargar rutas
console.log("🔍 Cargando rutas...");
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);
console.log("✅ Rutas cargadas correctamente.");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
