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

// router.get("/javascript/all-shippers", (_, res) => {
//   let sql = "SELECT * FROM shipper";
//   let start = performance.now();

//   database.query(sql, (error, result) => {
//     if (error) throw error;

//     let end = performance.now();
//     // console.log("query time is, ", end - start);
//     result.push({ "Operation Completion Time (ms)": end - start })
//     res.status(200).send(result);
//     console.log("success!");
//   });
// });

router.get("/javascript/all-shippers", (req, res) => {
  let isRedisConnected = false;

  redisClient.connect()
    .then(async () => {
      console.log('redis is connected');
      isRedisConnected = true;
      await fetchData();
    })
    .catch((err) => {
      console.log("Redis connection error:", err);
      fetchData();
    });

  async function fetchData() {
    console.log('entered fetch data')
    let sql = "SELECT * FROM shipper";
    let start = performance.now();

    if (isRedisConnected) {
      let data = await redisClient.get('shippers')
      if (data != null) {
        res.json(JSON.parse(data))
      } else {
        queryDatabase();
      }
    } else {
      console.log('redis not connected and query starts')
      queryDatabase();
    }

    function queryDatabase() {
      database.query(sql, (error, result) => {
        if (error) {
          console.log("Database query error:", error);
          return res.status(500).send("Error querying database");
        }

        if (isRedisConnected) {
          redisClient.setEx("shippers", DEFAULT_EXPIRATION, JSON.stringify(result), (setError) => {
            if (setError) {
              console.log("Error setting Redis cache:", setError);
            }
          });
        }

        let end = performance.now();
        result.push({ "Operation Completion Time (ms)": end - start })

        res.status(200).send(result);
        console.log("success!");
      });
    }
  }
});

router.get("/javascript/num-employeeId", (_, res) => {
  let isRedisConnected = false;

  redisClient.connect()
    .then(async () => {
      console.log('redis is connected')
      isRedisConnected = true
      await fetchData()
    }).catch((err) => {
      console.log('redis connection error', err)
      fetchData()
    })

  async function fetchData() {
    let sql = "select count(employeeId) from employeeterritory natural join region natural join territory group by regionId";
    let start = performance.now();

    if (isRedisConnected) {
      let data = await redisClient.get('countEmployeeId')
      if (data != null) {
        res.json(JSON.parse(data))
      } else {
        queryDatabase()
      }
    } else {
      console.log('redis is not connected')
      queryDatabase()
    }

    function queryDatabase() {
      database.query(sql, (error, result) => {
        if (error) {
          console.log("Database query error:", error);
          return res.status(500).send("Error querying database");
        }

        if (isRedisConnected) {
          redisClient.setEx("countEmployeeId", DEFAULT_EXPIRATION, JSON.stringify(result), (setError) => {
            if (setError) {
              console.log("Error setting Redis cache:", setError);
            }
          });
        }

        let end = performance.now();
        result.push({ "Operation Completion Time (ms)": end - start })

        res.status(200).send(result);
        console.log("success!");
      });
    }
  }
});

router.post("/javascript/new-category", (_, res) => {
  let sql =
    "Insert into category (categoryName, description, picture) values ('Seafood', 'tasty', null)";

  let start = performance.now();

  database.query(sql, (error, _) => {
    if (error) throw error;

    let end = performance.now();
    res.status(200).send({ resp: "Data successfully inserted!", "Operation Completion Time (ms)": end - start });
    console.log("success!");
  });
});

router.put("/javascript/update-customer", (_, res) => {
  const updateProduct = (retries) => {
    let sql = "UPDATE product SET productName = 'Product 1' WHERE productId = 23";
    let start = performance.now();

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
        let end = performance.now();

        res.status(200).send({ resp: "Data successfully Updated!", "Operation Completion Time (ms)": end - start });
        console.log("success!");
      }
    });
  };

  updateProduct(MAX_RETRIES);
});

router.delete("/javascript/delete-salesorder", (_, res) => {
  const deleteOrder = async () => {
    try {
      let start = performance.now();

      let sql = "delete from salesorder order by orderId desc limit 1";

      await database.beginTransaction()
      await database.query(sql)
      await database.commit()
      console.log("Transaction committed successfully. Records deleted.");
      let end = performance.now();

      res.status(200).send({ resp: "Data successfully deleted!", "Operation Completion Time (ms)": end - start })

    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  deleteOrder()
})


module.exports = router;
