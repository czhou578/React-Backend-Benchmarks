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

router.get("/javascript/all-shippers", (req, res) => {
  let sql = "SELECT * FROM shipper";

  database.query(sql, (error, result) => {
    if (error) throw error;

    res.send(result);
    console.log("success!");
  });
});

router.get("/javascript/num-employeeId", (req, res) => {
  let sql =
    "select count(employeeId) from employeeterritory natural join region natural join territory group by regionId";

  database.query(sql, (error, result) => {
    if (error) throw error;

    res.send(result);
    console.log("success!");
  });
});

module.exports = router;
