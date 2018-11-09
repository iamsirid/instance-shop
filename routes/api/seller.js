const express = require("express");

const router = express.Router();
module.exports = db => {
  router.post("/create", (req, res) => {
    let seller = req.body;
    let sql = "INSERT INTO seller SET ?";
    let query = db.query(sql, seller, (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      console.log(result);
      res.send("seller created...");
    });
  });

  return router;
};
