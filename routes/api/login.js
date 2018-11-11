2;
const express = require("express");

const router = express.Router();
module.exports = db => {
  router.post("/", (req, res) => {
    let loginInfo = req.body;

    let sql = `SELECT ssn,name FROM ${loginInfo.role} WHERE ssn = ${
      loginInfo.ssn
    }`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        res.status(404).json(err);
        return;
      }
      console.log(result);
      //   res.send("seller login...");
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ errMsg: `No ${loginInfo.role} with this SSN` });
      }
    });
  });

  return router;
};
