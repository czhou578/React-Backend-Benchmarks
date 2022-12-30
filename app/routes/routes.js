const express = require("express");
const database = require("../database");

const router = express.Router();

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

  database.query(sql, (error, result) => {
    if (error) throw error;

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
  let sql = "Update product set productName = 'Product 1' where productId = 55";

  database.query(sql, (error, _) => {
    if (error) throw error;

    res.status(200).send({ resp: "Data successfully Updated!" });
    console.log("success!");
  });
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
