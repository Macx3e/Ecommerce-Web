require("dotenv").config();
console.log("🔍 JWT_SECRET cargado:", process.env.JWT_SECRET);
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Log para verificar la inicialización del servidor
console.log("🚀 Servidor iniciando...");

// Middleware
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
connectDB();

// Verificar si `.env` está cargando correctamente
console.log("🔍 Variable MONGO_URI:", process.env.MONGO_URI);

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);
