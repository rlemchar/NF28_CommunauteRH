var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res) {
/*
  res.writeHead(200,{"Content-type":"text/html"});

  res.write('<!DOCTYPE html>'+
  '<html>'+
  '    <head>'+
  '        <meta charset="utf-8" />'+
  '        <title>Ma page Node.js !</title>'+
  '    </head>'+
  '    <body>'+
  '     	<p>Voici un paragraphe <strong>HTML</strong> !</p>'+
  '    </body>'+
  '</html>');
   res.end();
*/

  var page = url.parse(req.url).pathname;
  var params = querystring.parse(url.parse(req.url).query);

  if (page == '/') {
      res.writeHead(200, {"Content-Type": "text/plain"});
      if ('prenom' in params && 'nom' in params){
        res.write('Vous êtes à l\'accueil, que puis-je pour vous ' +
        params['prenom'] + ' ' + params['nom'] + ' ?');
      }else{
          res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');
      }
   }
   else if (page == '/sous-sol') {
      res.writeHead(200, {"Content-Type": "text/plain"});
       res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
   }
   else if (page == '/etage/1/chambre') {
      res.writeHead(200, {"Content-Type": "text/plain"});
       res.write('Hé ho, c\'est privé ici !');
   }else{
      res.writeHead(404, {"Content-Type": "text/plain"});
       res.write('ERROR 404');
   }
   res.end();


});

server.listen(80);
