var pg = require('pg');
var postgresUrl = 'postgres://localhost/acmedb';//use connection string
var client = new pg.Client(postgresUrl);//put this in connect

client.connect();//put this in connect

module.exports = client;

/*
module.exports = {
  connect: connect,
  getCategories: getCategories,
  getProducts: getProducts
  ....
};
*/
