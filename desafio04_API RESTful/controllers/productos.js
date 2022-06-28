const { response } = require('express')
const productos = require('../models/productos')

const productosGetAll = (req, res) => {
  res.status(200).json({
    productos
  })
}

const productosGet = (req, res = response) => {
  
  try
    {
        const id = parseInt(req.params.id);
        const productoEncontrado = productos.find(x => x.id === id);
        if (productoEncontrado)
            res.status(200).json({
              ok : 'Producto encontrado',
              productoEncontrado
            });
        else
            res.status(404).json({error: 'producto no encontrado'});
    }
    catch (error) { res.status(500).json(error.message); }
}

const productosPost = (req, res = response) => {
  //guardamos la solicitud del usuario en una variable, se puede agregar seguridad para evitar inyecciones etc.
  // se puede desestructurar para ocupar solo una parte del body
  const producto = {}
  
  const {title = 'default', price = 0, thumbnail = 'www.sitioprueba.com'} = req.body
  let nextId = 1
  if(productos.length > 0){
    nextId = productos[productos.length - 1].id + 1
  }
  producto.id = nextId
  producto.title = title
  producto.price = price
  producto.thumbnail = thumbnail

  productos.push(producto)
  res.status(200).json({
    msg : "Se agregó correctamente",
    productos
  }).redirect('localhost:8080/')
}


const productosPut = (req, res = response) => {
  
  try
    {
        const id = parseInt(req.params.id)
        const { title, price, thumbnail } = req.body
        const index = productos.findIndex(x => x.id === id)
        productos.splice(index, 1)
        const updateProduct = {id, title, price, thumbnail}
        productos.push(updateProduct)
        
        res.status(201).json(
            {
                mensaje: 'Producto actualizado exitosamente !',
                updateProduct
            });
    }
    catch (error) { res.status(500).json(error.message) }
}

const productosDelete = (req, res = response) => {
  try
    {
      const id = parseInt(req.params.id)
      const index = productos.findIndex(x => x.id === id)
      if(index != -1){
        productos.splice(index, 1)
        res.status(200).json({ok: 'Producto eliminado exitosamente !'})
      }else{
        res.status(204).json({error: 'Producto no encontrado'})
      }
    }
    catch (error) { res.status(500).json(error.message) }
}

module.exports = {
  productosGetAll,
  productosGet,
  productosPost,
  productosPut,
  productosDelete,
}