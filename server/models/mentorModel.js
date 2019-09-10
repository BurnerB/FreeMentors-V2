import Db from '../db/Db';
import BaseClass from './baseclass';

class MentorModel extends BaseClass {
  static async getAllMentors() {
    const { rows } = await Db.query('SELECT * FROM users WHERE ismentor=\'true\'');
    return rows;
  }
}

export default MentorModel;
