const express = require("express");
const database = require("../database");
const jwt = require("jsonwebtoken");
const redis = require('redis')

const redisClient = redis.createClient()
const DEFAULT_EXPIRATION = 3600

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

router.get("/javascript/all-shippers", (req, res) => {
  let isRedisConnected = false;

  redisClient.connect()
    .then(() => {
      console.log('redis is connected');
      isRedisConnected = true;
      fetchData();
    })
    .catch((err) => {
      console.log("Redis connection error:", err);
      fetchData();
    });

  function fetchData() {
    let sql = "SELECT * FROM shipper";
    let start = performance.now();

    if (isRedisConnected) {
      redisClient.get('shippers', (error, data) => {
        if (error) {
          console.log("Redis get error:", error);
          queryDatabase();
        } else if (data != null) {
          res.json(JSON.parse(data));
        } else {
          queryDatabase();
        }
      });
    } else {
      console.log('query db')
      queryDatabase();
    }

    function queryDatabase() {
      console.log('querying database');
      database.query(sql, (error, result) => {
        if (error) {
          console.log("Database query error:", error);
          return res.status(500).send("Error querying database");
        }

        let end = performance.now();
        console.log("query time is, ", end - start);

        if (isRedisConnected) {
          redisClient.setEx("shippers", DEFAULT_EXPIRATION, JSON.stringify(result), (setError) => {
            if (setError) {
              console.log("Error setting Redis cache:", setError);
            }
          });
        }

        res.status(200).send(result);
        console.log("success!");
      });
    }
  }
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

router.post("/javascript/new-category", (_, res) => {
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
    let sql = "UPDATE product SET productName = 'Product 1' WHERE productId = 23";

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
  const deleteSalesOrder = (retries) => {
    let sql = "delete from salesorder order by orderId desc limit 1";

    database.query(sql, (error, _) => {
      if (error) {
        if (error.code === 'ER_LOCK_WAIT_TIMEOUT' && retries > 0) {
          console.log(`Lock wait timeout, retrying... (${retries} attempts left)`);
          setTimeout(() => deleteSalesOrder(retries - 1), RETRY_DELAY)
        } else {
          console.error("Database error:", error);
          res.status(500).send({ error: "An error occurred while updating the product" })
        }
      } else {
        res.status(200).send({ resp: "Data successfully deleted!" })
      }
    });

  }
});

module.exports = router;
