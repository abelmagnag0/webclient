const mongoose = require('../database/conectar')
const Schema = mongoose.Schema

const Categoria = require('./categoria');
const Adicional = require('./adicional')

const CardapioSchema = mongoose.Schema({

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
        type: Schema.Types.ObjectId,
        ref: 'categoria'
    },
    valor: {
        type: String,
        require: true
    },
    adicional: [
        {
            type: Schema.Types.ObjectId,
            ref: 'adicional'
        }
    ]
})

const CardapioModel = mongoose.model('produtos', CardapioSchema)
module.exports = CardapioModel


