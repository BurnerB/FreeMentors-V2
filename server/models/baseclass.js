import Db from '../db/Db';

class BaseClass {
  constructor(payload = null) {
    this.payload = payload;
  }

  static async findBy(key, value, table) {
    const sql = `SELECT * FROM ${table} WHERE ${key}='${value}'`;
    const { rows } = await Db.query(sql);
    return rows;
  }
}
export default BaseClass;
