const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, required: true},
  userpass: { type: String, required: true},
  userrol: { type: String, required: true },
})

module.exports = model('User', userSchema)