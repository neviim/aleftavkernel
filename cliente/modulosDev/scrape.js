const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('terremotos.csv');

request('http://monitorglobal.com.br/terremotos.html', (error, response, html) => {
  // --------------------------------------
  if (!error && response.statusCode == 200) {

    const $ = cheerio.load(html);

    const siteHeading = $('#sismo_lista');
    
    //console.log(siteHeading.text());
    //console.log(siteHeading.find('div').text());
    //console.log(siteHeading.children('div').text());

    //const output = siteHeading
    //  .children('div')
    //  .parent()
    //  .text();  
    //console.log(output);

    //$('#sismo_lista').each((i, el) => {
    //  const title = $(el)
    //    .find('div')
    //    .text()
    //    .replace(/\s\s+/g, '');

    //  console.log(title);
    //});    

    const output = siteHeading
      .children('div')
      .parent()
      .text();  

    console.log(output);

    
  }
});




