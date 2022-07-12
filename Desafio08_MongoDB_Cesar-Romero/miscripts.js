// Nos conectamos a la BD en local (Consigna)
// db = connect("mongodb://localhost:27017/ecommerce");
// db = connect(
//   "mongodb+srv://<usuario>:<password>@xxxxxx.mongodb.net/ecommerce"
// );

//Se crea la base de datos
use ecommerce

// Creamos las dos colecciones (Consigna)
db.createCollection("mensajes");
db.createCollection("productos");

// Agrego de a uno en mensajes (Punto 1 y 2)
db.mensajes.insertOne({ usermail: "cesar", mensaje: "holaaa", fecha: new Date() });
db.mensajes.insertOne({ usermail: "adela", mensaje: "Hola Cesar", fecha: new Date() });
db.mensajes.insertOne({ usermail: "cesar", mensaje: "Como llueve hoy", fecha: new Date() });
db.mensajes.insertOne({ usermail: "adela", mensaje: "Hay que codear nomas jeje", fecha: new Date() });
db.mensajes.insertOne({ usermail: "jefe", mensaje: "esa es la actitud", fecha: new Date() });
db.mensajes.insertOne({ usermail: "cesar", mensaje: "ta loco", fecha: new Date() });
db.mensajes.insertOne({ usermail: "jefe", mensaje: "a laburar nomas", fecha: new Date() });
db.mensajes.insertOne({ usermail: "adela", mensaje: "actitud cesar jaja", fecha: new Date() });
db.mensajes.insertOne({ usermail: "cesar", mensaje: "obvio, siempre arriba", fecha: new Date() });
db.mensajes.insertOne({ usermail: "cesar", mensaje: "vamos por más", fecha: new Date() });

// Agrego de a varios en productos (Punto 1 y 2)
db.productos.insertMany([
  {
    nombre: "Base Eleva Monitor Pc-notebook Con Porta Celular Y Estante",
    precio: 220,
    foto: "https://http2.mlstatic.com/D_NQ_NP_2X_759710-MLA49414848379_032022-F.webp",
  },
  {
    nombre: "Kit Destornillador Atornillador 3.6v Makita Df001dw + Puntas",
    precio: 410,
    foto: "https://http2.mlstatic.com/D_NQ_NP_2X_657743-MLA31075528325_062019-F.webp",
  },
  {
    nombre: "Kit Tensiometro Digital + Oximetro Dedo Y Termometro Digital",
    precio: 380,
    foto: "https://http2.mlstatic.com/D_NQ_NP_2X_655844-MLA50331901962_062022-F.webp",
  },
  {
    nombre: "Silla Sillon Gamer Pc Escorpión Ergonómico Premium",
    precio: 5000,
    foto: "https://http2.mlstatic.com/D_NQ_NP_2X_626847-MLA48851478661_012022-F.webp",
  },
  {
    nombre: "Proyector Estrellas Galaxia Led Luz De Noche Aplicación",
    precio: 980,
    foto: "https://http2.mlstatic.com/D_NQ_NP_2X_765787-MLA47516908131_092021-F.webp",
  },
  {
    nombre: "Escritorio A Diseño Home Office Diseño Pc Puesto Trabajo",
    precio: 2300,
    foto: "https://http2.mlstatic.com/D_NQ_NP_2X_914360-MLA47012678785_082021-F.webp",
  },
  {
    nombre: "Pc Gamer Gigabyte I5 9400f +16 Gbs Ram+gtx 1050ti +ssd+ 550w",
    precio: 4600,
    foto: "https://http2.mlstatic.com/D_NQ_NP_2X_959964-MLA50621405107_072022-F.webp",
  },
  {
    nombre: "Apple Macbook Pro 16 2021 M1 Pro Ssd4tb 32gb Space Gray",
    precio: 3350,
    foto: "https://http2.mlstatic.com/D_NQ_NP_2X_747789-MLA49088416473_022022-F.webp",
  },
  {
    nombre: "Pantalla De Pixeles Divoom Pixoo 64",
    precio: 4320,
    foto: "https://http2.mlstatic.com/D_NQ_NP_2X_878588-MLA48558806076_122021-F.webp",
  },
  {
    nombre: "Luz Led Modular Hexágono Panal Modulo Usb App + Contrl",
    precio: 4990,
    foto: "https://http2.mlstatic.com/D_NQ_NP_2X_924482-MLA46981146640_082021-F.webp",
  },
]);

// se usa printjson para mostrar por consola todos los documentos de mensajes y productos (Punto 3)
printjson(db.mensajes.find());
printjson(db.productos.find());

// muestro la cantidad de documentos que tiene cada coleccion (Punto 4)
printjson("Número de documentos en la coleccion mensajes:", db.mensajes.countDocuments());
printjson("Número de documentos en la coleccion productos:", db.productos.countDocuments());

// Agregar un nuevo documento a productos (Punto 5a)
db.productos.insertOne({nombre: "Nuevo ProLcd Display 12.6inch 1920x515 + Controlador P/ Raspberry Piducto 11", precio: 2980, foto: "https://http2.mlstatic.com/D_NQ_NP_2X_626797-MLA50031946420_052022-F.webp"})

// Consultas varias (Punto 5bi)
printjson(db.productos.find({ precio: { $lt: 1000 } }));

// Consultas varias (Punto 5bii)
printjson(
  db.productos.find({
    $and: [{ precio: { $gt: 1000 } }, { precio: { $lt: 3000 } }],
  })
);

// Consultas varias (Punto 5biii)
printjson(db.productos.find({ precio: { $gt: 3000 } }));

// Consultas varias (Punto 5biv) 3er producto mas barato
const productos = db
  .getCollection("productos")
  .find({})
  .sort({ precio: 1 })
  .toArray();
printjson(productos[2].nombre);

// Query varias (Punto 5c) update agregando un propiedad "stock" con el valor 100
db.productos.updateMany({}, { $set: { stock: 100 } });

// Query varias (Punto 5d)
printjson(
  db.productos.updateMany({ precio: { $gt: 4000 } }, { $set: { stock: 0 } })
);

// Query varias (Punto 5e)
printjson(db.productos.deleteMany({ precio: { $lt: 1000 } }));

// (Punto 6) Crear un usuario en esta base de datos
db.createUser({
  user: "pepe",
  pwd: "asd456",
  roles: [{ role: "read", db: "ecommerce" }],
});

// Para conectar sin el shell
db.auth({
  user: pepe,
  pwd: "asd456",
});

// ahora lo autentico en la misma instancia de conexion
db = connect("mongodb://localhost:27017/ecommerce", "pepe", "asd456");

// Desde mongoshell se escribe lo siguiente para autenticarse con las credenciales recien creadas
mongo -u pepe -p asd456

// se intenta hacer un update
printjson(db.productos.updateMany({}, { $set: { stock: 1 } }));

//mensaje que aparece si se intenta hacer update
{
  "errmsg" : "not authorized on blog to execute command" ....
  "codeName" : "Unauthorized"
}