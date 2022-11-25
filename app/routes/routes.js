const express = require("express");
const database = require("../database");

const router = express.Router();

router.get("/all-customers", (req, res) => {
  let sql = "SELECT * FROM customers";

  database.query(sql, (error, result) => {
    if (error) throw error;

    res.send(result);
    console.log("success!");
  });
});
