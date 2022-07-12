// data de productos
const sqLite3 = require("../connectDB/sqLite3")
const mariaDB = require("../connectDB/mariaDB")

const { ContainerProductos, ContainerChat } = require("../model/container")

const productosSQL = new ContainerProductos(mariaDB)
const chatSQL = new ContainerChat(sqLite3)

const socketController = (socket) => {
  
  // Cuando se conecta se persiste en las bases de datos las listas de productos y los mensajes de chat
  productosSQL.getAll().then((prods) => {
    socket.emit("productos", prods)
  })
  chatSQL.getAll().then((chat) => {
    socket.emit("mensajes", chat)
  })

  // escuchando al cliente
  socket.on("new-product", (payload) => {
    productosSQL.add(payload).then((prods) => {
      socket.broadcast.emit("productos", prods)
    })
  })
  
  // escucho al cliente en otro evento
  socket.on("new-message", async (payload) => {
    await chatSQL.add(payload).then((chat) => {
      socket.broadcast.emit("mensajes", chat)
    })
  })
}


module.exports = socketController
