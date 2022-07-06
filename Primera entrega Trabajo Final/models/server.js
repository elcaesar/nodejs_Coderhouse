const express = require('express')
const productosRoute = require('../routes/productos')
const carritoRoute = require('../routes/carrito')
const userLogin = require('../routes/login')

class Server {
  constructor(){
    this.isAdmin = false
    this.app  = express()
    this.port = process.env.PORT
    this.path = {
      productos = '/api/producto',
      carrito   = '/api/carrito',
      login     = '/api/login'
    }

    //Middlewares
    this.middlewares()

    // Rutas de la app
    this.routes()
  }

  middlewares(){
    //conjunto de middleware a usar en la aplicacion
    
    // directorio publico
    this.app.use(express.static('public'))
    // Lectura y parseo del body a JSON cuando se usa POST, PUT, DELETE por ej.
    this.app.use(express.json())


  }

  routes(){

    this.app.use(this.path.carrito , carritoRoute)
    this.app.use(this.path.productos , productosRoute)
    this.app.use(this.path.login , userLogin)
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`)
    })
  }
  
}

module.exports = Server