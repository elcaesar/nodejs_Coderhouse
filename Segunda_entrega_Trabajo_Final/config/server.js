require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const productosRoute = require('../routes/productos')
const carritoRoute = require('../routes/carrito')
const userLogin = require('../routes/login')

//config databases
const { dbFirestore } = require('./firebaseConfig')

class Server {
  constructor(){
    this.isAdmin = false
    this.app  = express()
    this.port = process.env.APP_PORT
    this.path = {
      productos : '/api/producto',
      carrito   : '/api/carrito',
      login     : '/api/login'
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
    //this.app.use(express.urlencoded({extended : true}))
    this.app.use(morgan('dev'))

  }

  routes(){
    this.app.use(this.path.carrito , carritoRoute)
    this.app.use(this.path.productos , productosRoute)
    this.app.use(this.path.login , userLogin)

    //consulta de prueba a la db de firestore 
    this.app.get('/fire' , async (req,res) =>{
      const result = await dbFirestore.collection('productos').get()
      console.log(result.docs[0].data());
    })
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`)
    })
  }
  
}

module.exports = Server