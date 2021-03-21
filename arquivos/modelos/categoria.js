const mongoose = require('../database/conectar')
const Schema = mongoose.Schema;

const CategoriaSchema = new Schema({
  nome: {
    type: String,
    required: true
  }
});

const CategoriaModel = mongoose.model('categoria', CategoriaSchema)
module.exports = CategoriaModel
