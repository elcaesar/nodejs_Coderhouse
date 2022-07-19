const {ContainerProductoArchivo} = require('../../containers/containerProductoArchivo')

class ProductosDaoArchivo extends ContainerProductoArchivo{
  constructor(){
    super(filename)
  }
  async save(producto) {
    try{        
        producto.id = String(await this.__getNextId());
        producto.timestamp = Date.now();
        const productos = await this.getAll();
        productos.push(producto);
        await this.__saveContent(productos);
        return producto.id;
    }
    catch(error){
        return `Hubo un error "${error}"`
    }
  }

  async addProducts(products){
      try{
          for(const p of products){
              await this.save(p);
          }
      }
      catch(e){
          return `Hubo un error al actualizar el carrito: "${e}"`
      }
  }

}

module.exports = ProductosDaoArchivo