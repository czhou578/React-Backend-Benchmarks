const { Client } = require("pg");

const credentials = {
  user: "root",
  host: "localhost",
  database: "DVD",
  password: "podium218",
  port: 5432,
};

const client = new Client(credentials);
await client.connect();
