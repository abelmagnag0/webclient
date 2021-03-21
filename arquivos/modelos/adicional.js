const mongoose = require('../database/conectar')
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

const AdicionalModel = mongoose.model('adicional', AdicionalSchema)
module.exports = AdicionalModel
