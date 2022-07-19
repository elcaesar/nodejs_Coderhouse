const { ContainerFirestore } = require('../../containers/containerFirestore')

class ProductosDaoFirestore extends ContainerFirestore {
  constructor(){
    super('productos')
  }

  async addProducts(products){
    try{
        for(const p of products){
            await this.saveContent(p);
        }
    }
    catch(e){
        return `Hubo un error al actualizar el carrito: "${e}"`
    }
  }
}

module.exports = ProductosDaoFirestore