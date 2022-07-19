const admin = require('firebase-admin')

const serviceAccount = require('./ecommerceteco-firebase-adminsdk-pkfwg-4e3e006aec.json')
const { getFirestore } = require('firebase-admin/firestore')

admin.initializeApp({
  credential  : admin.credential.cert(serviceAccount),
  databaseURL : process.env.DB_FIRESTORE //primero en Firebase se debe crear la bd en la sección Firestore database, allí se genera el link y se copia aquí
})

const dbFirestore = getFirestore()

module.exports = {
  dbFirestore
}
