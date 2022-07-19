const { dbFirestore } = require('../config/firebaseConfig')

class ContainerFirestore {
  constructor(collection){
    this.collection = dbFirestore.collection(collection)
    console.log(`Base conectada con la collection ${collection}`)
  }

  async save(document, id){
    let doc = this.collection.doc(`${id}`)
    let item = await doc.create(document)
    return item
  }

  async getAll(){
    let result = await this.collection.get()
    result = result.docs.map(doc => ({ 
      id: doc.id,
      data: doc.data()
    }))
    return result
  }

  async getById(id){
    let result = await this.collection.get()
    result = result.docs.map(doc => ({ 
      id: doc.id,
      data: doc.data()
    }))
    let item = result.find(elem => elem.id == id)
    return item
  }

  async delete(id){
    let doc = this.collection.doc(`${id}`)
    let item = doc.delete()
    return ({ status: 'Deleted' })
  }

  async update(content, id){
    let doc = this.collection.doc(`${id}`)
    let item = await doc.update(content)
    return item
  }
}

module.exports = { ContainerFirestore }
