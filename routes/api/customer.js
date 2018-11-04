const express = require("express");

const router = express.Router();
module.exports = db => {
  router.post("/create", (req, res) => {
    const createCart = customerSsn => {
      let cart = { customer_ssn: customerSsn };
      let sql = "INSERT INTO cart SET ?";
      db.query(sql, cart, (err, result) => {
        if (err) {
          res.send(err);
          return;
        }
        console.log(result);
      });
    };

    const createWallet = customerSsn => {
      let wallet = { customer_ssn: customerSsn };
      let sql = "INSERT INTO wallet SET ?";
      db.query(sql, wallet, (err, result) => {
        if (err) {
          res.send(err);
          return;
        }
        console.log(result);
        createCart(customerSsn);
      });
    };

    let customer = req.body;
    let sql = "INSERT INTO customer SET ?";
    let query = db.query(sql, customer, (err, result) => {
      if (err) {
        // if (err.code === "ER_DUP_ENTRY") {
        //   res.send("SSN or Email is used.");
        //   return;
        // }
        res.send(err);
        // throw err;
        return;
      }
      console.log(result);
      createWallet(req.body.ssn);
      res.send("Customer created...");
    });
  });

  router.delete("/delete/:ssn", (req, res) => {
    let ssn = req.params.ssn;
    let sql = `DELETE FROM customer WHERE ssn = "${ssn}"`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      console.log(result);

      res.send("customer deleted...");
    });
  });
  router.post("/login/", (req, res) => {
    let cEmail = req.body.email;
    let sql = `SELECT name,email FROM customer WHERE email = "${cEmail}"`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);

      if (result.length > 0) {
        res.send("customer fetched...");
      } else {
        res.send("no customer fetched...");
      }
    });
  });
  return router;
};
