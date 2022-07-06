//primero se importan paquetes nativos de Node luego viene los de terceros
require('dotenv').config()

const Server = require('./models/server')

const server = new Server()

server.listen()




