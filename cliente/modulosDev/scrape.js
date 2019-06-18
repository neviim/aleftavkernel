const request = require('request');
const cheerio = require('cheerio');
const crypto = require("crypto");
const cipher = crypto.createCipher();
//const fs = require('fs');
//const writeStream = fs.createWriteStream('terremotos.csv');

// conectando ao server mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.200.213/terremotos')
  .then(db => console.log('Database conectado!!!'))
  .catch(err => console.log(err));

var Schema = mongoose.Schema; 

// criptografia config
var DADOS_CRIPTOGRAFAR = {
  algoritmo : "aes256",
  segredo : "key2019key",
  tipo : "hex"
};

function criptografar(stringKey) {
  const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
  cipher.update(stringKey);
  return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
};

// função scraping terremotos
request('http://monitorglobal.com.br/terremotos.html', (error, response, html) => {
  // ----------------------------------------
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    
    // criando uma objeto json
    const ocorrencia = new Object();
    const key  = 'Terremotos';

    var head = true;
    ocorrencia[key] = [];  // Array vazio, com a chave "key"

    $('#sismo_lista').each(function(){ 
      /* [Ctrl+Shift+C]  (Copy/Copy Seletor)
      ::: cabeçahlo 
      #sismo_lista > div > div:nth-child(1) > div > strong        // Horário GMT/UTC
      #sismo_lista > div > div:nth-child(2) > div > strong        // Horário Brasília
      #sismo_lista > div > div:nth-child(3) > div > strong        // Intensidade
      #sismo_lista > div > div:nth-child(4) > div > strong        // Magnitude
      #sismo_lista > div > div:nth-child(5) > div > strong        // Profundidade
      #sismo_lista > div > div:nth-child(6) > div > strong        // Local
      #sismo_lista > div > div:nth-child(7) > div > strong        // Fonte
      ::: dados conteudo
      #sismo_lista > div > div:nth-child(1) > div                 // 18/06/2019 13:22
      #sismo_lista > div > div:nth-child(2) > div                 // 18/06/2019 10:22 
      #sismo_lista > div > div:nth-child(3) > div                 // Terremoto Forte
      #sismo_lista > div > div:nth-child(4) > div                 // 6.4 
      #sismo_lista > div > div:nth-child(5) > div                 // 16.08 km
      #sismo_lista > div > div:nth-child(6) > div                 // 33km WSW of Tsuruoka, Japan 
      #sismo_lista > div > div:nth-child(7) > div > a > img       // [+]info
      #sismo_lista > div > div:nth-child(7) > div > a
      */

      if ( head ) {
        head = false;
        var horario_GMTUTC    = $(this).find('#sismo_lista > div > div:nth-child(1) > div > strong ').text();
        var horario_Brasilia  = $(this).find('#sismo_lista > div > div:nth-child(2) > div > strong ').text();
        var intensidade       = $(this).find('#sismo_lista > div > div:nth-child(3) > div > strong ').text();
        var magnitude         = $(this).find('#sismo_lista > div > div:nth-child(4) > div > strong ').text();
        var profundidade      = $(this).find('#sismo_lista > div > div:nth-child(5) > div > strong ').text();
        var local             = $(this).find('#sismo_lista > div > div:nth-child(6) > div > strong ').text();
        var fonte             = $(this).find('#sismo_lista > div > div:nth-child(7) > div > strong ').text();
      } else {
        var horario_GMTUTC    = $(this).find('#sismo_lista > div > div:nth-child(1) > div ').text();
        var horario_Brasilia  = $(this).find('#sismo_lista > div > div:nth-child(2) > div ').text();
        var intensidade       = $(this).find('#sismo_lista > div > div:nth-child(3) > div ').text();
        var magnitude         = $(this).find('#sismo_lista > div > div:nth-child(4) > div ').text();
        var profundidade      = $(this).find('#sismo_lista > div > div:nth-child(5) > div ').text();
        var local             = $(this).find('#sismo_lista > div > div:nth-child(6) > div ').text();
        var fonte             = $(this).find('#sismo_lista > div > div:nth-child(7) > div  > a ').attr('href');
      }
      
      if (!head) {   // não é cabelhalho
        let stringKey = (horario_GMTUTC + horario_Brasilia + profundidade + local).toString();
        let criptoKey = criptografar(stringKey);

        var data = {
          'horario_GMTUTC': horario_GMTUTC, 
          'horario_Brasilia': horario_Brasilia,
          'intensidade': intensidade,    
          'magnitude': magnitude,      
          'profundidade': profundidade, 
          'local': local,    
          'fonte': fonte,
          'criptoKey': criptoKey 
        };

        ocorrencia[key].push(data);
      }
    });

    console.log(ocorrencia);

  }
});




