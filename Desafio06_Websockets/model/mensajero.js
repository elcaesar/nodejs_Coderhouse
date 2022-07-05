const fs = require('fs').promises
const db_path = './db'

class Mensajero {
    constructor(filename = 'mensajes.json'){
        this.filename = `${db_path}/${filename}`;
    }
    async getAll() {
        try{
            const info = await fs.readFile(this.filename,'utf-8')
            const data = JSON.parse(info);
            return data.map(p => p);
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async save(mensaje) {
        try{        
            const mensajes = await this.getAll();
            mensajes.push(mensaje);
            await fs.writeFile(this.filename,JSON.stringify(mensajes));
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }
}

module.exports = Mensajero;