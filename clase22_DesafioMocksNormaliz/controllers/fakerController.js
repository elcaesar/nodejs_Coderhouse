const { request, response } = require("express");
const { faker } = require("@faker-js/faker");

const productosFaker = async (req = request, res = response) => {
  const productos = [];
  for (let i = 1; i <= 5; i++) {
    const element = {
      id: i,
      nombre: faker.commerce.product(),
      precio: faker.commerce.price(),
      foto: faker.image.people(320,240),
    };
    productos.push(element);
  }
  res.json({
    msg: "ok",
    data: productos,
  });
};

module.exports = {
  productosFaker,
};
