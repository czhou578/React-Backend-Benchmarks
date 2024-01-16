const express = require("express");
const database = require("./database");
const router = require("./routes/routes");
const loginRouter = require("./routes/login")
const graphqlRouter = require("./routes/graphqlroutes");
const bodyParser = require("body-parser");
require('dotenv').config()

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// database.connect((err) => {
//   if (err) throw err;
//   console.log("Database Connected!");
// });

app.use("/northwind", router);
app.use("/spacex", graphqlRouter);
app.use("/login", loginRouter)

app.listen(3001, () => {
  console.log("Server listening on Port 3001");
});
