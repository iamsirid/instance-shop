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

  return router;
};
