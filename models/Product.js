const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre del producto es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  price: {
    type: Number,
    required: [true, "El precio es obligatorio"],
  },
  stock: {
    type: Number,
    required: [true, "El stock es obligatorio"],
    default: 0,
  },
  imageUrl: {
    type: String,
    required: [true, "La imagen del producto es obligatoria"],
  },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
