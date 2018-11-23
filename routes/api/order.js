const express = require("express");

const router = express.Router();
module.exports = db => {
  router.post("/create", (req, res) => {
    const assignOrderID = orderID => {
      let sql = `UPDATE product_item SET order_id = ${orderID} WHERE order_id IS NULL AND customer_ssn = ${
        req.body.customer_ssn
      }`;
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
          return;
        }
        console.log(result);
      });
    };
    const getOrderID = () => {
      let sql = "SELECT DISTINCT LAST_INSERT_ID() as order_id FROM `order` ";
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
          return;
        }
        console.log(result);
        assignOrderID(result[0].order_id);
      });
    };

    const date = new Date();
    // const dateTime = "2008-11-11";
    let order = {
      deliveryDate: date,
      customer_ssn: req.body.customer_ssn
    };
    let sql = "INSERT INTO `order` SET ?";
    let query = db.query(sql, order, (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      console.log(result);
      getOrderID();
      res.send("order created...");
    });
  });
  //   router.get("/all", (req, res) => {
  //     let sql = `SELECT * FROM product`;
  //     let query = db.query(sql, (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         res.status(404).json(err);
  //         return;
  //       }
  //       console.log(result);
  //       res.json(result);
  //     });
  //   });
  //   router.get("/:id", (req, res) => {
  //     let sql = `SELECT * FROM product WHERE product_id = ${req.params.id}`;
  //     let query = db.query(sql, (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         res.status(404).json(err);
  //         return;
  //       }
  //       console.log(result);
  //       res.json(result[0]);
  //     });
  //   });

  return router;
};
