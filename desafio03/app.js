const express = require('express')
const app = express()
const Productos = require('./model/productos.model.js')

//se instancia un objeto de la clase Productos que es la clase Container
const productos = new Productos()

app.get('/productos', (req,res) => {
    res.send(productos.readAllProducts())
})

app.get('/productoRandom', (req,res) => {
    res.send(productos.readRandomProduct())
})

const server = app.listen(8080, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}` );
})

server.on('error', (err) => console.error(`Error en el servidor ${err}`))