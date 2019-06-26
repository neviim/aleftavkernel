const request = require('request');
const cheerio = require('cheerio');
const crypto = require("crypto");
const grava = require("./fs_grava");
const database = require("./database");

// criptografia config
var DADOS_CRIPTOGRAFAR = {
  algoritmo : "aes256",
  segredo : "key2019key",
  tipo : "hex"
};

function criptografar( stringKey ) {
  const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
  cipher.update(stringKey);
  return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
};

function descriptografar(stringKey) {
  const decipher = crypto.createDecipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
  decipher.update(stringKey, DADOS_CRIPTOGRAFAR.tipo);
  return decipher.final();
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

    $('#sismo_lista').each( function() { 
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
        var data = {
          'horario_GMTUTC': horario_GMTUTC.trim(), 
          'horario_Brasilia': horario_Brasilia.trim(),
          'intensidade': intensidade,    
          'magnitude': magnitude,      
          'profundidade': profundidade, 
          'local': local,    
          'fonte': fonte,
          'criptoKey': criptografar(String(horario_GMTUTC + horario_Brasilia + profundidade + local)) 
        };

        ocorrencia[key].push(data);
      }
    });

    // grava.arquivoJson(JSON.stringify(ocorrencia));
    // grava.salvaDocumentoEmMonfoDB(JSON.stringify(ocorrencia));
  }
});




