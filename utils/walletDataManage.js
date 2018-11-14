module.exports = {
  createWallet: (db, createUser) => {
    const getWalletID = () => {
      let sql = "SELECT DISTINCT LAST_INSERT_ID() as wallet_id FROM wallet ";
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
          return;
        }
        console.log(result);
        createUser(result[0].wallet_id);
      });
    };

    let sql = "INSERT INTO wallet SET value = 0";
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      console.log(result);
      getWalletID();
    });
  },
  deleteWallet: (db, walletId, callback) => {
    let sql = `DELETE FROM wallet WHERE wallet_id = "${walletId}"`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      console.log(result);
      callback();
    });
  }
};
