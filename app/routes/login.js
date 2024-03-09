const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.post("/login", authenticateToken, (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  console.log(process.env.ACCESS_SECRET);
  const access_token = jwt.sign(user, process.env.ACCESS_SECRET);
  res.json({ access_token: access_token });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
