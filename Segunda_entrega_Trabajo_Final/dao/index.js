const daoProductoArchivo = require('./producto/daoProductoArchivo')
const daoProductoFirestore = require('./producto/daoProductoFirestore')
const daoProductoMemoria = require('./producto/daoProductoMemoria')
const daoProductoMongoDB = require('./producto/daoProductoMongoDB')

const daoCarritoArchivo = require('./carrito/daoCarritoArchivo')
const daoCarritoFirestore = require('./carrito/daoCarritoFirestore')
const daoCarritoMemoria = require('./carrito/daoCarritoMemoria')
const daoCarritoMongoDB = require('./carrito/daoCarritoMongoDB')

let carritoSelected, productoSelected

if(process.env.ENGINE = 'FIRESTORE'){
  carritoSelected  = daoCarritoFirestore
  productoSelected = daoProductoFirestore
}

if(process.env.ENGINE = 'MONGODB'){
  carritoSelected  = daoCarritoMongoDB
  productoSelected = daoProductoMongoDB
}

if(process.env.ENGINE = 'ARCHIVO'){
  carritoSelected  = daoCarritoArchivo
  productoSelected = daoProductoArchivo
}

if(process.env.ENGINE = 'MEMORIA'){
  carritoSelected  = daoCarritoMemoria
  productoSelected = daoProductoMemoria
}

let carrito = carritoSelected
let producto = productoSelected

module.exports = {
  carrito,
  producto
}