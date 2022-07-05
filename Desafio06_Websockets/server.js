require('dotenv').config();
const express = require('express');
const Mensajero = require('./model/mensajero');

const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
const PORT = process.env.PORT;

let productos = [];
const mensajero = new Mensajero();
io.on('connection', async socket => {
    console.log('Nueva conexión');

    socket.emit('productos', productos);

    socket.on('new-product', producto => {
        productos.push(producto);
        io.sockets.emit('productos', productos);
    })

    socket.emit('mensajes', await mensajero.getAll());

    socket.on('new-message', async mensaje => {
        await mensajero.save(mensaje)
        io.sockets.emit('mensajes', await mensajero.getAll());
    })
});

server.listen(PORT, () => {
    console.log(`Escuchando port: ${server.address().port}`); 
});

server.on('error', (err) => console.log(err));