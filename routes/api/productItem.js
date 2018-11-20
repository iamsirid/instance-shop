const express = require("express");

const router = express.Router();
module.exports = db => {
  router.post("/create", (req, res) => {
    let data = {
      amount: req.body.amount,
      product_id: req.body.product_id,
      customer_ssn: req.body.customer_ssn
    };
    let sql = "INSERT INTO product_item SET ?";
    let query = db.query(sql, data, (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      console.log(result);
      res.send("Product Item created...");
    });
  });

  router.get("/:customerSsn", (req, res) => {
    let customerSsn = req.params.customerSsn;
    let sql = `SELECT * FROM product_item WHERE customer_ssn = "${customerSsn}"`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      console.log(result);
      res.json(result);
    });
  });

  router.delete("/delete/:id", (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM product_item WHERE product_item_id = ${id}`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      console.log(result);
      res.send("Product Item deleted");
    });
  });

  //   router.post("/login/", (req, res) => {
  //     let cEmail = req.body.email;
  //     let sql = `SELECT name,email FROM customer WHERE email = "${cEmail}"`;
  //     let query = db.query(sql, (err, result) => {
  //       if (err) throw err;
  //       console.log(result);

  //       if (result.length > 0) {
  //         res.send("customer fetched...");
  //       } else {
  //         res.send("no customer fetched...");
  //       }
  //     });
  //   });
  return router;
};
