const mongoose = require('../database/conectar')
const Schema = mongoose.Schema;
const Categoria = require('./categoria');

const AdicionalSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  valor: {
    type: String,
    required: true
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'categoria'
  }
});

const AdicionalModel = mongoose.model('adicional', AdicionalSchema)
module.exports = AdicionalModel
