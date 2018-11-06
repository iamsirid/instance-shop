const express = require("express");

const router = express.Router();
module.exports = db => {
  router.post("/create", (req, res) => {
    let product = req.body;
    let sql = "INSERT INTO product SET ?";
    let query = db.query(sql, product, (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      console.log(result);
      res.send("Product created...");
    });
  });

  //   router.delete("/delete/:ssn", (req, res) => {
  //     let ssn = req.params.ssn;
  //     let sql = `DELETE FROM customer WHERE ssn = "${ssn}"`;
  //     let query = db.query(sql, (err, result) => {
  //       if (err) {
  //         res.send(err);
  //         return;
  //       }
  //       console.log(result);

  //       res.send("customer deleted...");
  //     });
  //   });
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
