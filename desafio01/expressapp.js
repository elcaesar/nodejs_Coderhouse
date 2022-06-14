const servexp = require('express')
const fs = require('fs')
const app = servexp()

app.get('/', (req,res) => {

})

app.get('/A', (req,res) => {

})

app.get('/visitas', (req,res) => {

})
app.get('/products', (req,res) => {
    fs.readFile('products.txt', 'utf-8', (err, data) => {
        //leer producto
        Math.random()*jsonProduct.length
    })
})

const server = app.listen(8080, () => {
    console.log(`serv escuchando en puerto ${server.address().port}`)

})