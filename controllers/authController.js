const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(400).json({ message: "El usuario ya existe" });

    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("❌ Error en registro:", error);
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log("🔍 Intentando login...");
    const { email, password } = req.body;
    console.log("📩 Email recibido:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ Usuario no encontrado");
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log("❌ Contraseña incorrecta");
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("✅ Token generado:", token);

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ message: "Error en el login", error });
  }
};

const verifyToken = async (req, res) => {
  res.json({ message: "Token válido", userId: req.user.id });
};

module.exports = { registerUser, loginUser, verifyToken };
