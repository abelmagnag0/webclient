const mongoose = require('../database/conectar')

const ClienteScheme = mongoose.Schema({
  user: {
    type: String,
    require: true
  },
  pass: {
    type: Number,
    require: true
  }
})

const ClientModel = mongoose.model('usuarios', ClienteScheme)

module.exports = ClientModel