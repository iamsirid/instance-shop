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
  router.get("/all", (req, res) => {
    let sql = `SELECT * FROM product`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(404).json(err);
        return;
      }
      console.log(result);
      res.json(result);
    });
  });
  router.get("/:id", (req, res) => {
    let sql = `SELECT * FROM product WHERE product_id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(404).json(err);
        return;
      }
      console.log(result);
      res.json(result[0]);
    });
  });

  // let sql = `SELECT ssn,name FROM ${loginInfo.role} WHERE ssn = ${
  //   loginInfo.ssn
  // }`;
  // let query = db.query(sql, (err, result) => {
  //   if (err) {
  //     res.status(404).json(err);
  //     return;
  //   }
  //   console.log(result);
  //   //   res.send("seller login...");
  //   if (result.length > 0) {
  //     res.json(result[0]);
  //   } else {
  //     res.status(404).json({ errMsg: `No ${loginInfo.role} with this SSN` });
  //   }
  // });

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
