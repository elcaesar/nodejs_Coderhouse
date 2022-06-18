const fs = require('fs')
const archivo = './db/products.txt'
  

const leerData = () =>{
    if(!fs.existsSync(archivo)){
        return []
    }
    const info = fs.readFileSync(archivo, {encoding : 'utf-8'})
    const data = JSON.parse(info)
    return data
}

module.exports = {
    leerData
}

