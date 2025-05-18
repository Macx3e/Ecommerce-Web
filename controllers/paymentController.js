const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const processPayment = async (req, res) => {
  try {
    console.log("📩 Procesando pago...");
    console.log("📦 Datos recibidos en `req.body`:", req.body); // Log para verificar datos

    const { amount, currency, token } = req.body;

    if (!amount || !currency || !token) {
      console.error("❌ Error: Datos de pago incompletos.");
      return res.status(400).json({ message: "Datos de pago incompletos." });
    }

    const charge = await stripe.charges.create({
      amount,
      currency,
      source: token,
      description: "Pago en Ecommerce-Web",
    });

    console.log("✅ Pago exitoso:", charge);
    res.json({ message: "Pago exitoso", charge });
  } catch (error) {
    console.error("❌ Error en el pago:", error);
    res.status(500).json({ message: "Error al procesar el pago", error });
  }
};

module.exports = { processPayment };
