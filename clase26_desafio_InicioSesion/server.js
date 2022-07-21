require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars')
const {engine} = handlebars;
const path = require('path');
const Mensajero = require('./model/mensajero');

const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')
//const { authLogin,authLoginPost,authLogout,dashboard, signup, formSignup } = require('./controllers/auth');
const {sessionChecker} = require('./middlewares/session-checker');
const { initializePassport } = require('./config/passport.config')
const PORT = process.env.PORT;

const authpath = '/'
const authRoute = require('./routes/auth')

//Middlewares
app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_CONN,
        mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      }),
      key: 'user_sid',
      secret: 'c0d3r',
      resave: true,
      saveUninitialized: true,
      cookie: {maxAge: 600000},
    })
  )

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.set("views", "./views");
app.set("view engine", "hbs");

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "layout.hbs",
        partialsDir: path.join(app.get('views'), 'layouts'),
    })
  );


const { dbConnection } = require('./config/db');
(async () => {
    await dbConnection();
})();

//routes
app.use(authpath, authRoute)
// app.get('/', sessionChecker, (req, res) => {
//     res.redirect("/login");
// })
// app.get('/login',sessionChecker,authLogin)
// app.get('/logout',authLogout)
// app.get('/dashboard',dashboard)
// app.get('/signup',sessionChecker, formSignup);
// app.post('/signup', signup);
// app.post('/login',authLoginPost);

//config websockets
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

//port
server.listen(PORT, () => {
    console.log(`Escuchando port: ${server.address().port}`); 
});

server.on('error', (err) => console.log(err));