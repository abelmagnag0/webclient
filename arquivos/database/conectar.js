const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/'; // url da db

mongoose.Promise = global.Promise
mongoose.connect(
    url, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
) // fazendo conexão com o servidor
.then(()=>{ 
    console.log('DB mongoose rodando em: ' + url) // servidor conectou eba
}).catch((err)=>{
    console.log('Erro ao se conectar ao banco MongoDB!!') // deu ruim
})
//model para inserir no mongodb
module.exports = mongoose