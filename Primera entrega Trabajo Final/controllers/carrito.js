const { response } = require('express')
const Carrito  = require('../models/carrito');
const carrito= new Carrito();

const listProductosCarrito = (req, res = response) => {
  const id = parseInt(req.params.id);
    const carrito = await carrito.getById(id);
    if (carrito !== null) {
        res.status(200).json(carrito.productos);
    } else {
        res.status(400).json({error:'carrito no encontrado'});
    }
}

const createCarrito = (req, res = response) => {
  const id = await carrito.save()
  res.status(201).json({id});
}

const addProductoCarrito = (req, res = response) => {
  const id = parseInt(req.params.id);
    const productos = req.body;
    const carrito = await carrito.getById(id);
    if (carrito !== null) {
        await carrito.addProductsCart(productos, id);
        res.status(200).json({mensaje: `Productos agregados al carrito: ${id}`});
    } else {
        res.status(400).json({error:'carrito no encontrado'});
    }
}

const deleteCarrito = (req, res = response) => {
  const id = parseInt(req.params.id);
    const carrito = await carrito.getById(id);
    if (carrito !== null) {
        await carrito.deleteById(id)
        res.status(200).json({mensaje: `Se ha eliminado el carrito ${id}`});
    } else {
        res.status(400).json({error:'carrito no encontrado'});
    }
}

const deleteProductoCarrito = (req, res = response) => {
  const id = parseInt(req.params.id);
    const id_prod = parseInt(req.params.id_prod);
    const carrito = await carrito.getById(id);
    if (carrito !== null) {
        await carrito.deleteProductCart(id_prod, id);
        res.status(200).json({mensaje: `Se ha eliminado el producto ${id_prod} del carrito: ${id}`});
    } else {
        res.status(400).json({error:'carrito no encontrado'});
    }
}

module.exports = {
  listProductosCarrito,
  createCarrito,
  addProductoCarrito,
  deleteCarrito,
  deleteProductoCarrito
}