import BaseClass from './baseclass';
import db from '../db/users';

class AdminModel extends BaseClass {
  static async makeMentor(user) {
    const mentor = {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      address: user.address,
      bio: user.bio,
      occupation: user.occupation,
      expertise: user.expertise,
      isMentor: true,
      isAdmin: false,
    };
    db.splice(user.userId - 1, 1, mentor);
    return mentor;
  }

  static async isalreadyMentor(userId) {
    const obj = db.find((o) => o.isMentor === true && o.userId === parseInt(userId, 10));
    if (obj) {
      return true;
    }
    return false;
  }
}

export default AdminModel;
