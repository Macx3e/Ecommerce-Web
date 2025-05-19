require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const redis = require("redis");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

console.log("🚀 Servidor iniciando...");

app.use(helmet());
console.log("✅ Seguridad activada con Helmet");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
console.log("✅ Rate limiting activado");

app.use(express.json());
app.use(cors());

connectDB();

const redisClient = redis.createClient();
redisClient.on("error", (err) => console.error("❌ Error en Redis:", err));
console.log("✅ Redis conectado correctamente");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
