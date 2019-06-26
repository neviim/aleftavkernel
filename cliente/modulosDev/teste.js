var dateTime = require('node-datetime');

// -------------
var profundidade = "185.99 km"
var pastData = '19/06/2019 11:36'



//var dt = dateTime.create('2015-04-30 09:52:00');
var dt = dateTime.create(pastData, 'd/m/Y H:M');
var dataFormatada = dt.format();

console.log(dataFormatada);