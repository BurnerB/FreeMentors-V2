import BaseClass from './baseclass';
import Db from '../db/Db';

class AdminModel extends BaseClass {
  static async makeMentor(userId) {
    return Db.query(`UPDATE users SET isMentor='true' WHERE id='${userId}' RETURNING *`);
  }

  static async isalreadyMentor(userId) {
    const sql = `SELECT * FROM users WHERE id=${userId} and ismentor=true`;
    if (sql) {
      return true;
    }
    return false;
  }
}

export default AdminModel;
