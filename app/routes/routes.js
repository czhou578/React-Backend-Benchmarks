const express = require("express");
const database = require("../database");
const jwt = require("jsonwebtoken");

const router = express.Router();

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

router.get("/javascript/all-customers", (_, res) => {
  let sql = "SELECT * FROM customers";

  database.query(sql, (error, result) => {
    if (error) throw error;

    res.status(200).send(result);
    console.log("success!");
  });
});

router.get("/javascript/all-shippers", (_, res) => {
  let sql = "SELECT * FROM shipper";
  let start = performance.now();

  database.query(sql, (error, result) => {
    if (error) throw error;

    let end = performance.now();
    console.log("query time is, ", end - start);
    res.status(200).send(result);
    console.log("success!");
  });
});

router.get("/javascript/num-employeeId", (_, res) => {
  let sql =
    "select count(employeeId) from employeeterritory natural join region natural join territory group by regionId";

  database.query(sql, (error, result) => {
    if (error) throw error;

    res.status(200).send(result);
    console.log("success!");
  });
});

router.get("/javascript/new-category", (_, res) => {
  let sql =
    "Insert into category (categoryName, description, picture) values ('Seafood', 'tasty', null)";

  database.query(sql, (error, _) => {
    if (error) throw error;

    res.status(200).send({ resp: "Data successfully inserted!" });
    console.log("success!");
  });
});

router.put("/javascript/update-customer", (_, res) => {
  const updateProduct = (retries) => {
    let sql = "UPDATE product SET productName = 'Product 1' WHERE productId = 55";

    database.query(sql, (error, result) => {
      if (error) {
        if (error.code === 'ER_LOCK_WAIT_TIMEOUT' && retries > 0) {
          console.log(`Lock wait timeout, retrying... (${retries} attempts left)`);
          setTimeout(() => updateProduct(retries - 1), RETRY_DELAY);
        } else {
          console.error("Database error:", error);
          res.status(500).send({ error: "An error occurred while updating the product" });
        }
      } else {
        res.status(200).send({ resp: "Data successfully Updated!" });
        console.log("success!");
      }
    });
  };

  updateProduct(MAX_RETRIES);
});

router.delete("/javascript/delete-salesorder", (_, res) => {
  let sql = "delete from salesorder order by orderId desc limit 1";

  database.query(sql, (error, _) => {
    if (error) throw error;

    res.status(200).send({ resp: "Data successfully deleted!" });
    console.log("success!");
  });
});

module.exports = router;
