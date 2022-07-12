
const express = require('express');
// controlador para el socket
const socketController = require("../sockets/controllers");

class Server {
  constructor() {
		this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    this.paths = {};

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();

    // Sockets
    this.sockets();
  }

	sockets() {
    this.io.on("connection", socketController);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.static("public"));
  }

  routes() {
  
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }

}

module.exports = Server
//---------------------------------------------
