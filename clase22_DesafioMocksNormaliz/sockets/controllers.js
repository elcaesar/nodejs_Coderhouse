// data de productos --> en lugar de sqlite y mariadb se usa MongoDB Atlas
// const sqLite3 = require("../connectDB/sqLite3")
// const mariaDB = require("../connectDB/mariaDB")

const util = require('util')
const { schema, normalizr, denormalizr } = require('normalizr')
const { ContainerProductos, ContainerChat } = require("../models/container") 
const { ContainerMongo } = require("../models/containerMongo");
const productosData = new ContainerMongo(ContainerProductos);
const chatData = new ContainerMongo(ContainerChat);


// const productosSQL = new ContainerProductos(mariaDB)
// const chatSQL = new ContainerChat(sqLite3)

// normalizacion
const authorSchema = new schema.Entity("authors");
const messageSchema = new schema.Entity(
  "mensajes",
  { author: authorSchema },
  { idAttribute: "_id" }
);
const global = new schema.Entity("global", {
  messages: [messageSchema],
});

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}

const socketController = (socket) => {
  
  // Cuando se conecta se persiste en las bases de datos las listas de productos y los mensajes de chat
  productosData.getAll().then((prods) => {
    socket.emit("productos", prods)
  })
  chatData.getAll().then((chat) => {
    const messages = JSON.stringify(chat)
    const data = { id: 'mensajes' , messages }
    const dataNormalized = normalize(data, global)

    socket.emit("mensajes", chat)
  })

  // escuchando al cliente
   socket.on("new-product",  producto => {
    productosData.add(producto).then((prods) => {
       socket.broadcast.emit("productos", prods)
    })
  })
  
  // escucho al cliente en otro evento
  socket.on("new-message", (payload) => {
    chatData.add(payload).then((chat) => {
      socket.broadcast.emit("mensajes", chat)
    })
  })
}


module.exports = socketController
