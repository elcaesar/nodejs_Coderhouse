const { Schema, model } = require("mongoose");

const CarritoSchema = Schema({
  timestamp: {
    type: Date,
  },
  productos: [
    {
      id: {
        type: String,
      },
      nombre: {
        type: String,
      },
      descripcion: {
        type: String,
      },
      codigo: {
        type: String,
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
    },
  ],
});

module.exports = model("Carrito", CarritoSchema);