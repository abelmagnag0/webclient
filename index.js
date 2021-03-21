const Cadastro = require('./arquivos/modelos/cardapio'); // chamando a db
const Adicional = require('./arquivos/modelos/adicional');
const Categoria = require('./arquivos/modelos/categoria');
const Logins = require('./arquivos/modelos/logins')

const http = require("http");
const host = 'localhost';
const port = 8000;

// servidor html
const serveStatic = require('serve-static')
const finalhandler = require('finalhandler');

const serve = serveStatic('src/static', { 'index': ['index.html'] })

// função GET cardapio
async function pegarItens() {
  let itens = await Cadastro.find({})

  return JSON.stringify(itens)
}

// função ID interno
async function idInterno() {
  let itens = await pegarItens()
  itens = JSON.parse(itens)

  if (itens.length === 0) {
    let ultimoID = 1
    return ultimoID
  }

  let indice = itens.reverse()
  let ultimoID = indice[0].id_interno

  return ultimoID + 1
}

// função GET categorias
async function pegarCategorias() {
  let categorias = await Categoria.find({})
  return JSON.stringify(categorias)
}

// função GET adicionais
async function pegarAdicionais() {
  let adicionais = await Adicional.find({})
  return JSON.stringify(adicionais)
}

// função GET/POST de adicionais da categoria x
async function pegarAdicionaisEspecificos(categoria){

    let adicionais = await Adicional.find({categoria: categoria.categoria})
    return JSON.stringify(adicionais)
}

// função cria Login
async function criarLogin(){
  try{
    const result = await Logins.create({user: "alvaro",pass:123}) 
  }catch(error){
    throw new Error(error)
  }
}
// para criar outro usuário descomente \/
// criarLogin() 

// criar servidor
const server = http.createServer(function (req, res) {
  const { url, method } = req
  let body = []
  req.on('error', console.log)
    .on('data', (chunk) => {
      body.push(chunk)
    }).on('end', async () => {
      body = Buffer.concat(body).toString()

      // GET LOGIC
      if (method == 'GET' && url == '/cardapio') {
        res.setHeader('Content-Type', 'application/json')

        let data = await pegarItens()

        res.end(data)
        // POST LOGIC
      } else if (method == 'POST' && url == '/cardapio') {

        const item = JSON.parse(body)
        
        item.id_interno = await idInterno()

        try {
          const result = await Cadastro.create(item);
          res.end("Cadastro efetuado")
        } catch (error) {
          throw new Error(error);
        }


        // DELETE LOGIC
      } else if (method == 'DELETE' && url == '/cardapio') {

        const item = JSON.parse(body)
        const idDeletado = Number(item.id_interno)

        Cadastro.deleteOne({ id_interno: idDeletado }, error => {
          if (error) return console.log(error)
        })
        res.end("Deletado")
        // PUT LOGIC
      } else if (method == 'PUT' && url == '/cardapio') {

        const data = JSON.parse(body)
        const { nome, descricao, categoria, valor, adicional, idPdv, id } = data.data

        Cadastro.updateOne({ id_interno: id }, {
          nome,
          descricao,
          categoria,
          valor,
          adicional,
          idPdv
        }, (error, response) => {
          if (error) return console.log(error)
        })
        res.end("Editado")
      } else if (method == 'GET' && url == '/categoria') {

        res.setHeader('Content-Type', 'application/json')
        const data = await pegarCategorias()

        res.end(data)
      } else if (method == 'POST' && url == '/categoria') {

        let nome = JSON.parse(body)
        Categoria.create(nome, function (error) {
          if (error) return console.log(error)
        })
        res.end("Categoria cadastrada!")
      } else if (method == 'DELETE' && url == '/categoria') {
        const idDeletado = JSON.parse(body)

        Categoria.deleteOne({ _id: idDeletado.id }, (error, body) => {
          if (error) return console.log(error)
        })
        res.end()
      } else if (method == 'PUT' && url == '/categoria') {
        const { id, novoNome } = JSON.parse(body)

        Categoria.updateOne({ _id: id }, { nome: novoNome }, (error, res) => {
          if (error) return console.log(error)
        })
        res.end("Categoria alterada")
      } else if (method == 'GET' && url == '/adicionais') {
        res.setHeader('Content-Type', 'application/json')

        let data = await pegarAdicionais()

        res.end(data)
      } else if (method == 'POST' && url == '/adicionais') {

        const adicional = JSON.parse(body)

        const categoria = await Categoria.findOne({ nome: adicional.categoria })
        adicional.categoria = categoria._id

        try {
          const result = await Adicional.create(adicional);
          res.end("Cadastro efetuado")
        } catch (error) {
          throw new Error(error);
        }

      } else if (method == 'DELETE' && url == '/adicionais') {


        const idDeletado = JSON.parse(body)

        Adicional.deleteOne({ _id: idDeletado.id }, (error, body) => {
          if (error) return console.log(error)
        })
        res.end("Deletado")

      } else if (method == 'PUT' && url == '/adicionais') {
        // TO DO
        const { id, novoNome, novoValor } = JSON.parse(body)

        const categoria = await Adicional.findOne({ _id: id })

        Adicional.updateOne({ _id: id }, {
          nome: novoNome,
          valor: novoValor,
          categoria: categoria.categoria
        }, (error, res) => {
          if (error) return console.log(error)
        })
        res.end("Alterado")
      } else if (method == 'POST' && url == '/categoria/adicionais') {
        const categoria = JSON.parse(body)
        
        let data = await pegarAdicionaisEspecificos(categoria)

        res.end(data)
      } else if (method == 'GET' && url == '/login'){ 
         let logins = await Logins.find({})
         logins = JSON.stringify(logins)
         res.end(logins)
      } else {
        serve(req, res, finalhandler(req, res))
      }
    })
})

// listen
server.listen(port, function () {
  console.log(`Website rodando em: http://${host}:${port}`);
});



