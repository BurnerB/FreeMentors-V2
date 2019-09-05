import db from '../db/users';
import BaseClass from './baseclass';

class MentorModel extends BaseClass {
  static async getAllMentors() {
    const obj = db.filter((o) => o.isMentor === true && o.isAdmin === false);
    if (!obj) {
      return false;
    }
    return obj;
  }
}

export default MentorModel;
