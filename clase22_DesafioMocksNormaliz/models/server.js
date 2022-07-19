
const express = require('express');
const cors = require("cors");

// controlador para el socket
const socketController = require("../sockets/controllers");
// config de la DB de mongo
const { dbConnection } = require("../connectDB/mongodb");

class Server {
  constructor() {
		this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);
    this.fakerPath = "/api/productos-test";

    this.paths = {};

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();

    // Sockets
    this.sockets();
  }

  async conectarDB() {
    await dbConnection();
  }
	sockets() {
    this.io.on("connection", socketController);
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.fakerPath, require("../routes/fakerRoutes"));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }

}

module.exports = Server
//---------------------------------------------
