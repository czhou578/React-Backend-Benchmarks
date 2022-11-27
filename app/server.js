const express = require("express");
const database = require("./database");
const router = require("./routes/routes");

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

database.connect((err) => {
  if (err) throw err;
  console.log("Database Connected!");
});

app.use("/northwind", router);

app.listen(3001, () => {
  console.log("Server listening on Port 3001");
});
