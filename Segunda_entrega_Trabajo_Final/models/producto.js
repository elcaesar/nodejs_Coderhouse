const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "Nombre requerido"],
  },
  descripcion: {
    type: String,
  },
  codigo: {
    type: String,
    required: [true, "Código requerido"],
  },
  foto: {
    type: String,
  },
  precio: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  timestamp: {
    type: Date,
  },
});

module.exports = model("Producto", ProductoSchema);
