'use strict'
let mongoose = require('mongoose');
var autoIncrement = autoIncrement = require('mongoose-auto-increment');
const server = 'localhost'; // REPLACE WITH YOUR DB SERVER
const database = 'mecatipdb'; // REPLACE WITH YOUR DB NAME
var db;
class Database {
  constructor() {
    this._connect()
  } //  autoIndex: true
  //,
  _connect() {
    mongoose.connect(`mongodb://${server}/${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }).then(() => {
      db = mongoose.connection;
      autoIncrement.initialize(db);
      console.log('Database connection successful')
    }).catch(err => {
      console.error('Database connection error')
    })
  }
}
//autoIncrement.initialize(db);
module.exports = new Database();
