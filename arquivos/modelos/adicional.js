const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdicionalSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  valor: {
    type: String,
    required: true
  }
});

module.exports = { Adicional: mongoose.model('adicional', AdicionalSchema) };