const fs = require('fs');
const mongoose = require('mongoose');
const database = require("./database");

exports.arquivoJson = function (conteudo) {
  // especifique o caminho para o arquivo.
  let path   = '../data/terremotos.json';  

  // abra o arquivo no modo de escrita.
  fs.writeFile(path, conteudo, function(erro) {

    if (erro) throw 'erro escrevendo arquivo: ' + erro;

    console.log("Arquivo salvo com sucesso.");
  }); 
};

let emailSchema = new mongoose.Schema({
  email: String
})