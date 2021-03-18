const Cadastro = require('./arquivos/modelos/cardapio'); // chamando a db
const http = require("http"); // se fuder 
const host = 'localhost'; // se fuder
const port = 8000; // se fuder tb,

/* bd funcionando */
async function createItem(){
  const cadastro = new Cadastro({
    id_interno: "alo",
    id_pdv: "uhum",
    nome: "aaaaa",
    descricao: "bbbbbb",
    categoria: "cccccc", 
    valor: 21.32, 
    adicional: "beico" 
  })
  const result = await cadastro.save()
  console.log(result)
}


async function getItems(){
  const items = await Cadastro.find({nome: "aaaaa"})
  console.log(items)
}

getItems()

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' }); // http header
  var url = req.url;


  if (url === '/cardapio') {
    res.writeHead(200);
    
    res.end(`<!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>body{
            background-color: blueviolet;
            margin:15% 6%;
          }
          
          .corpo{
            background-color: white;
            border-radius: 3px;
            border-bottom: white;
            border-left: white;
            border-right-color: white;
            border-top-color: white;
            display: block;
            height: 600px;
            width: 800px;
            padding: 12px;
          }
          .title{
            font-family: Helvetica, sans-serif;
            margin-left: 1.5rem;
          }
          .corpo form{
            max-width: 500px;
            margin: auto 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .input-camp{
            width: 100%;
          }
          .input-camp label{
            display: block;
          }
          .input-camp input{
            width: 48%;
            padding: 3px;
            margin-top: 5px;
          }
          .corpo form button{
            margin-top: 3px;

          }
          </style>
        <title>Abel</title>
        
    </head>
    <body>
        
     <div class="corpo">
      <h1 class="title">Cardápio</h1>
        <form>
          <div class="input-camp"> 
            <label for="nome">Nome</label>
            <input type="text" id="nome" name="nome">
          </div>
          <div class="input-camp"> 
            <label for="descricao">Descrição</label>
            <input type="text" id="descricao" name="descricao">
          </div>
          <div class="input-camp"> 
            <label for="categoria">Categoria</label>
            <input type="text" id="categoria" name="categoria">
          </div>
          <div class="input-camp"> 
            <label for="valor">Valor</label>
            <input type="text" id="valor" name="valor">
          </div>
          <div class="input-camp"> 
            <label for="adicional">Adicional</label>
            <input type="text" id="adicional" name="adicional">
          </div>
          <div class="input-camp"> 
            <label for="id-pdv">ID PDV</label>
            <input type="text" id="id-pdv" name="id-pdv">
          </div>
        
          <button id="btn">Submit</button>
        </form>

        <h3>Cardápio atual</h3>
        <table>
          <tr>
            <th>|NOME|</th>
            <th>|DESCRIÇÃO|</th>
            <th>|CATEGORIA|</th>
            <th>|VALOR|</th>
            <th>|ADICIONAL|</th>
            <th>|ID INTERNO|</th>
            <th>|ID PDV|</th>
          </tr>
          
          <tr>
            <td>Pão com mortadela</td>
            <td>pão e mortadela</td>
            <td>R$2,00</td>
            <td>SANDUICHES</td>
            <td>Bacon</td>
            <td>13</td>
            <td>156484685</td>
          </tr>
          
            <tr>
            <td>Pão com ovo</td>
            <td>ovo frito</td>
            <td>R$5,00</td>
            <td>SANDUICHES</td>
            <td>Cheddar</td>
            <td>16</td>
            <td>145546825</td>
          </tr>
        </table>
      </div> 
    </body>
    </html>`);
  }


  else {
    res.writeHead(200);
    res.end(`<!DOCTYPE html>
        <html lang="pt">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>body{
                background-color: blueviolet;
                margin:15% 6%;
              }
              
              .corpo{
                background-color: white;
                border-radius: 3px;
                border-bottom: white;
                border-left: white;
                border-right-color: white;
                border-top-color: white;
                display: flex;
                height: 600px;
                width: 800px;
                padding: 12px;

                align-items: center;
                justify-content: center;
              }
              .corpo-content{
                background-color: #9871f5;
                padding: 1rem 2rem;
                max-width: 200px;
                border-radius: 5px;

                transition: background-color 200ms;
              }
              .corpo-content:hover{
                background-color: #8a2ae2;
              }
              .corpo-content a{
                text-decoration: none;
                color: white;
                font-weight: bold;
              }
              </style>
            <title>Abel</title>
        </head>
        <body>
           <div class="corpo">
              <div class="corpo-content">
                <a href="/cardapio">Acessar cardápio</a>
              </div>
           </div> 
        </body>
        </html>`);
  }


}).listen(port, function () {
  console.log(`Website rodando em: http://${host}:${port}`);
});

