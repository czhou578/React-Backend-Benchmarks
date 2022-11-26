const express = require("express");
const database = require("../database");

const router = express.Router();

router.get("/javascript/all-customers", (req, res) => {
  let sql = "SELECT * FROM customers";

  database.query(sql, (error, result) => {
    if (error) throw error;

    res.send(result);
    console.log("success!");
  });
});

router.get("/javascript/all-shipper", (req, res) => {
  let sql = "SELECT * FROM shippers";

  database.query(sql, (error, result) => {
    if (error) throw error;

    res.send(result);
    console.log("success!");
  });
});
