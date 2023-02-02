const db = require("../config/db");

module.exports = class CronModel {
  constructor() {}

  static async save(ts, aqius, mainus, aqicn, maincn) {
    let sql = `INSERT INTO pollution(ts, aqius, mainus, aqicn, maincn) VALUES(?,?,?,?,?)`;

    await db.execute(sql, [ts, aqius, mainus, aqicn, maincn]);
  }

  static async read() {
    let sql = `SELECT * FROM pollution WHERE aqius = (SELECT MAX(aqius) FROM pollution)`;
    return await db.execute(sql);
  }

};
