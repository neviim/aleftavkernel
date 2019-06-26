// mongodb server conecta 

let mongoose = require('mongoose');

const server = '192.168.200.213:27017'; // Entre com seu IP server mongodb 
const database = 'terremotos';          // Entre com sua coleção doc

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(`mongodb://${server}/${database}`)
       .then(() => {
         console.log('Database conectado com successo!')
       })
       .catch(err => {
         console.error('Database conectado com erro.')
       })
  }
}

module.exports = new Database()