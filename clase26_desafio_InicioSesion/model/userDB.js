const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  fullname: { type: String, required: true},
  username: { type: String, required: true},
  userpass: { type: String, required: true},
  userrol: { type: String, required: true },
})

module.exports = model('User', userSchema)