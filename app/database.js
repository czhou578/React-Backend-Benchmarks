const mysql = require("mysql");

module.exports = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "northwind",
  multipleStatements: true,
});
