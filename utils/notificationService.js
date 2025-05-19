const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderUpdate = async (email, orderStatus) => {
  console.log(`🔹 Intentando enviar correo a ${email} sobre el estado: ${orderStatus}`);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Actualización de Pedido",
    text: `Tu pedido ahora está en estado: ${orderStatus}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Correo enviado correctamente a ${email}`);
  } catch (error) {
    console.error(`❌ Error al enviar correo a ${email}:`, error);
  }
};

module.exports = { sendOrderUpdate };
