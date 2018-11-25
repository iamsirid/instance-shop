const express = require("express");
const walletM = require("../../utils/walletDataManage");
const router = express.Router();
module.exports = db => {
  // router.post("/create", (req, res) => {
  //   const createCustomerControlWallet = (customerSsn, walletId) => {
  //     let data = { customer_ssn: customerSsn, wallet_id: walletId }; // ?? wallet_id
  //     let sql = "INSERT INTO customer_controls_wallet SET ?";
  //     db.query(sql, data, (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         res.send(err);
  //         return;
  //       }
  //       console.log(result);
  //       res.send("Customer created...");
  //     });
  //   };
  //   const getWalletID = customerSsn => {
  //     let sql = "SELECT DISTINCT LAST_INSERT_ID() as wallet_id FROM wallet ";
  //     db.query(sql, (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         res.send(err);
  //         return;
  //       }
  //       console.log("====================");
  //       console.log(result);
  //       // console.log(result[0].wallet_id);
  //       createCustomerControlWallet(customerSsn, result[0].wallet_id);
  //     });
  //   };

  //   const createWallet = customerSsn => {
  //     // let wallet = { customer_ssn: customerSsn };
  //     let sql = "INSERT INTO wallet SET value = 0";
  //     db.query(sql, (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         res.send(err);
  //         return;
  //       }
  //       console.log(result);

  //       // createCustomerControlWallet(customerSsn);
  //       getWalletID(customerSsn);
  //     });
  //   };

  //   let customer = req.body;
  //   let sql = "INSERT INTO customer SET ?";
  //   let query = db.query(sql, customer, (err, result) => {
  //     if (err) {
  //       // if (err.code === "ER_DUP_ENTRY") {
  //       //   res.send("SSN or Email is used.");
  //       //   return;
  //       // }
  //       res.send(err);
  //       // throw err;
  //       return;
  //     }
  //     console.log(result);
  //     createWallet(req.body.ssn);
  //   });
  // });
  router.post("/create", (req, res) => {
    const createCustomer = walletId => {
      let customer = {
        ssn: req.body.ssn,
        name: req.body.name,
        tel: req.body.tel,
        email: req.body.email,
        gender: req.body.gender,
        address: req.body.address,
        wallet_id: walletId
      };
      let sql = "INSERT INTO customer SET ?";
      let query = db.query(sql, customer, (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
          return;
        }
        console.log(result);
        res.send("Customer created...");
      });
    };
    walletM.createWallet(db, createCustomer);
  });

  router.delete("/delete/:ssn", (req, res) => {
    // const deleteWallet = walletId => {
    //   let sql = `DELETE FROM wallet WHERE wallet_id = "${walletId}"`;
    //   let query = db.query(sql, (err, result) => {
    //     if (err) {
    //       console.log(err);
    //       res.send(err);
    //       return;
    //     }
    //     console.log(result);
    //     res.send("customer deleted...");
    //   });
    // };

    let ssn = req.params.ssn;
    let sql = `SELECT wallet_id FROM customer WHERE ssn = "${ssn}"`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      console.log(result);
      walletM.deleteWallet(db, result[0].wallet_id, () =>
        res.send("customer deleted...")
      );
      // res.send("customer deleted...");
    });
  });
  // router.delete("/delete/:ssn", (req, res) => {
  //   const deleteWallet = walletId => {
  //     let sql = `DELETE FROM wallet WHERE wallet_id = "${walletId}"`;
  //     let query = db.query(sql, (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         res.send(err);
  //         return;
  //       }
  //       console.log(result);
  //       res.send("customer deleted...");
  //     });
  //   };
  //   const getCustomerWallet = ssn => {
  //     let sql = `SELECT wallet_id FROM customer_controls_wallet WHERE customer_ssn = "${ssn}"`;
  //     let query = db.query(sql, (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         res.send(err);
  //         return;
  //       }
  //       console.log(result);
  //       deleteWallet(result[0].wallet_id);
  //     });
  //   };

  //   let ssn = req.params.ssn;
  //   let sql = `DELETE FROM customer WHERE ssn = "${ssn}"`;
  //   let query = db.query(sql, (err, result) => {
  //     if (err) {
  //       res.send(err);
  //       return;
  //     }
  //     console.log(result);
  //     getCustomerWallet(ssn);
  //     // res.send("customer deleted...");
  //   });
  // });
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

  router.get("/:ssn", (req, res) => {
    let ssn = req.params.ssn;
    let sql = `SELECT * FROM customer WHERE ssn = "${ssn}"`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      console.log(result);
      res.json(result[0]);
    });
  });
  router.put("/:ssn", (req, res) => {
    let ssn = req.params.ssn;
    let customer = {
      name: req.body.name,
      tel: req.body.tel,
      email: req.body.email,
      gender: req.body.gender,
      address: req.body.address
    };
    let sql = `UPDATE customer SET ? WHERE ssn = "${ssn}"`;
    let query = db.query(sql, customer, (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      console.log(result);
      res.json(result[0]);
    });
  });
  router.get("/:ssn/wallet", (req, res) => {
    const getWallet = walletId => {
      let sql = `SELECT * FROM wallet WHERE wallet_id = "${walletId}"`;
      let query = db.query(sql, (err, result) => {
        if (err) {
          res.send(err);
          return;
        }
        console.log(result);
        res.json(result[0]);
      });
    };
    let ssn = req.params.ssn;
    let sql = `SELECT wallet_id FROM customer WHERE ssn = "${ssn}"`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      console.log(result);
      getWallet(result[0].wallet_id);
    });
  });
  router.post("/:ssn/pay", (req, res) => {
    let ssn = req.params.ssn;
    const updateWallet = walletId => {
      const value = req.body.value;

      let sql = `UPDATE wallet SET value = value - ${value} WHERE wallet_id = "${walletId}"`;
      let query = db.query(sql, (err, result) => {
        if (err) {
          res.send(err);
          return;
        }
        console.log(result);
        res.json(result);
      });
    };
    let sql = `SELECT wallet_id FROM customer WHERE ssn = "${ssn}"`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      console.log(result);
      updateWallet(result[0].wallet_id);
    });
  });
  return router;
};
