const { leerData } = require('../dbConnection/persistence.js')

class Productos{
    constructor(){
        this._listado = leerData()
    }

    readAllProducts() {
        return this._listado
    }

    readRandomProduct(){
        const max = this._listado.length - 1;
        const min = 0;
        const indice = Math.floor(Math.random() * (max - min + 1)) + min;
        return this._listado[indice];
    }
}

module.exports = Productos

