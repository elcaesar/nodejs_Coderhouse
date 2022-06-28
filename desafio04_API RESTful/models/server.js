const express = require('express')
const productos = require('../routes/productos')


class Server {
  constructor(){
    this.app  = express()
    this.port = process.env.PORT
    this.productosPath = '/api/productos'

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
    this.app.use(express.urlencoded({extended:true}))


  } 

  routes(){
    this.app.use(this.productosPath , productos)
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`)
    })
  }
  
}

module.exports = Server