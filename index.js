const Cadastro = require('./arquivos/modelos/cardapio'); // chamando a db
const http = require("http"); // se fuder 
const host = 'localhost'; // se fuder
const port = 8000; // se fuder tb,

// servidor html
const serveStatic = require('serve-static')
const finalhandler = require('finalhandler');

const serve = serveStatic('src/static', { 'index': ['index.html'] })

// função GET
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

        const data = await pegarItens()

        res.end(data)
        // POST LOGIC
      } else if (method == 'POST' && url == '/cardapio') {

        const item = JSON.parse(body)
        item.id_interno = await idInterno()

        Cadastro.create(item, function (err, body) {
          if (err) return console.log(err)
        })

        res.end("Cadastro efetuado")
        // DELETE LOGIC
      } else if (method == 'DELETE' && url == '/cardapio') {

        // a fazer
        const item = JSON.parse(body)
        const idDeletado = Number(item.id_interno)

        Cadastro.deleteOne({ id_interno: idDeletado }, error => {
          if (error) return console.log(error)
        })
        res.end("Deletado")
        // PUT LOGIC
      } else if (method == 'PUT' && url == '/cardapio') {

        const data = JSON.parse(body)
        const { nome, descricao, categoria, valor, adicional, idPdv, id} = data.data
        
        Cadastro.updateOne({id_interno: id}, {
          nome,
          descricao,
          categoria,
          valor,
          adicional,
          idPdv
        }, (error, response) => {
          console.log(response)
        })

      }
      else {
        serve(req, res, finalhandler(req, res))
      }

    })
})

// listen
server.listen(port, function () {
  console.log(`Website rodando em: http://${host}:${port}`);
});



