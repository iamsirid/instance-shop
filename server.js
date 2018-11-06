const express = require("express");
const mysql = require("mysql");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

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

// app.get("/createdb", (req, res) => {
//   let sql = "CREATE DATABASE instance_shop";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Database created");
//   });
// });

app.use("/api/customer", require("./routes/api/customer")(db));
app.use("/api/product", require("./routes/api/product")(db));

const port = process.env.PORT || 5002;

app.listen(port, function() {
  console.log(`The Server has started! (Port: ${port})`);
});
