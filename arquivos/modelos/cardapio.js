const mongoose = require('../database/conectar')
const CardapioScheme = mongoose.Schema({

    id_interno:{
        type:String,
        require:true
    },
    id_pdv:{
        type:String,
        require:true
    },
    nome:{
        type:String,
        require:true
    },
    descricao:{
        type:String,
        require:true
    },
    categoria:{
        type:String,
        require:true
    },
    valor:{
        type:String,
        require:true
    }
    
})


const CardapioModel = mongoose.model('produtos',CardapioScheme)
module.exports = CardapioModel


