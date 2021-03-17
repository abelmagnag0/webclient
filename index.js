const Cadastro = require('./arquivos/modelos/cardapio'); // chamando a db
const http = require("http"); // se fuder 
const host = 'localhost'; // se fuder
const port = 8000; // se fuder tb,



http.createServer(function (req, res) {
 res.writeHead(200, {'Content-Type': 'text/html'}); // http header
var url = req.url;



if(url ==='/cardapio'){
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
          
          
          </style>
        <title>Abel</title>
    </head>
    <body>
       <div class="corpo"><h1>Aqui tu faz tuas parada</h1></div> 
    </body>
    </html>`);}

    
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
                display: block;
                height: 600px;
                width: 800px;
                padding: 12px;
              }
              
              
              </style>
            <title>Abel</title>
        </head>
        <body>
           <div class="corpo"><h1>Olá mundo</h1></div> 
        </body>
        </html>`);}


}).listen(port, function(){
    console.log(`Website rodando em: http://${host}:${port}`);
});

