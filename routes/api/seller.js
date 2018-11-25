const express = require("express");
const walletM = require("../../utils/walletDataManage");
const router = express.Router();
module.exports = db => {
  router.post("/create", (req, res) => {
    const createSeller = walletId => {
      let seller = {
        ssn: req.body.ssn,
        name: req.body.name,
        tel: req.body.tel,
        email: req.body.email,
        address: req.body.address,
        wallet_id: walletId
      };
      let sql = "INSERT INTO seller SET ?";
      let query = db.query(sql, seller, (err, result) => {
        if (err) {
          res.send(err);
          return;
        }
        console.log(result);
        res.send("seller created...");
      });
    };

    walletM.createWallet(db, createSeller);
  });

  router.delete("/delete/:ssn", (req, res) => {
    let ssn = req.params.ssn;
    let sql = `SELECT wallet_id FROM seller WHERE ssn = "${ssn}"`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      console.log(result);
      walletM.deleteWallet(db, result[0].wallet_id, () =>
        res.send("seller deleted...")
      );
    });
  });
  router.get("/:ssn", (req, res) => {
    let ssn = req.params.ssn;
    let sql = `SELECT * FROM seller WHERE ssn = "${ssn}"`;
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
    let seller = {
      name: req.body.name,
      tel: req.body.tel,
      email: req.body.email,
      address: req.body.address
    };
    let sql = `UPDATE seller SET ? WHERE ssn = "${ssn}"`;
    let query = db.query(sql, seller, (err, result) => {
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
    let sql = `SELECT wallet_id FROM seller WHERE ssn = "${ssn}"`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      console.log(result);
      getWallet(result[0].wallet_id);
    });
  });

  router.post("/:ssn/receivePayment", (req, res) => {
    let ssn = req.params.ssn;
    const updateWallet = walletId => {
      const value = req.body.value;

      let sql = `UPDATE wallet SET value = value + ${value} WHERE wallet_id = "${walletId}"`;
      let query = db.query(sql, (err, result) => {
        if (err) {
          res.send(err);
          return;
        }
        console.log(result);
        res.json(result);
      });
    };
    let sql = `SELECT wallet_id FROM seller WHERE ssn = "${ssn}"`;
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
