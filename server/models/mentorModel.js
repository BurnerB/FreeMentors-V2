import users from '../db/users';
import mentors from '../db/mentor';

class MentorModel {
  constructor() {}

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
    users.splice(user.userId - 1, 1, mentor);
    mentors.push(mentor);
    return mentor;
  }

  static async getAllMentors() {
    if (mentors.length === 0) {
      return false;
    }
    return mentors;
  }

  static async findById(userId) {
    const obj = mentors.find((o) => o.userId === parseInt(userId));
    if (!obj) {
      return false;
    }
    return obj;
  }
}

export default MentorModel;