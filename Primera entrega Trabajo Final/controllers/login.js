const usuarios = require('../db/users.json')
const Server = require('../models/server')
const server = new Server()

const userLogin = (req, res) => {
  let userReq = req.params.user
  let passReq = req.params.pass


  const resultado = usuarios.find(usuario => (usuario.user === userReq && usuario.pass === passReq))

  //(resultado.role == 'administrador') ? server.isAdmin = true : server.isAdmin = false
  if(resultado){
    res.status(200).json({
      "msg"     : "Ingreso exitoso",
      "usuario" : resultado.user,
      "role"    : resultado.role
    })
  }else {
    res.status(404).json({
      "msg"     : "Usuario no existente"
    })
  }
}