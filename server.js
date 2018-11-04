const express = require("express");
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "instance_shop"
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected");
});

const app = express();

app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE instance_shop";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created");
  });
});

const port = process.env.PORT || 5002;

app.listen(port, function() {
  console.log(`The Server has started! (Port: ${port})`);
});
