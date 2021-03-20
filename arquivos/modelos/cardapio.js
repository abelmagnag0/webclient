const mongoose = require('../database/conectar')

const CardapioScheme = mongoose.Schema({

    id_interno: {
        type: Number,
        require: true
    },
    id_pdv: {
        type: String,
        require: true
    },
    nome: {
        type: String,
        require: true
    }, 
    descricao: {
        type: String,
        require: true
    },
    categoria: {
        type: String,
        require: true
    },
    valor: {
        type: String,
        require: true
    },
    adicional: {
        type: String,
        require: false
    }

})


const CardapioModel = mongoose.model('produtos', CardapioScheme)
module.exports = CardapioModel


