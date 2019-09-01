// eslint-disable-next-line max-classes-per-file
import db from '../db/users';

class UserModel {
  constructor(firstName, lastName, email, password, address, bio, occupation, expertise) {
    this.userId = db.length + 1;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.address = address;
    this.bio = bio;
    this.occupation = occupation;
    this.expertise = expertise;
    this.isMentor = false;
    this.isAdmin = false;
  }

  async registerUser() {
    const user = {
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      address: this.address,
      bio: this.bio,
      occupation: this.occupation,
      expertise: this.expertise,
      isMentor: this.isMentor,
      isAdmin: this.isAdmin,
    };
    const obj = db.find((o) => o.email === this.email);
    if (!obj) {
      db.push(user);
      return user;
    }
    return false;
  }

  static async findByEmail(email) {
    const obj = db.find((o) => o.email === email);
    if (!obj) {
      return false;
    }
    return obj;
  }

  static async findById(userId) {
    const obj = db.find((o) => o.userId === parseInt(userId));
    if (!obj) {
      return false;
    }
    return obj;
  }
}

class MentorModel extends UserModel {
  static async getAllMentors() {
    const obj = db.filter((o) => o.isMentor === true && o.isAdmin === false);
    if (!obj) {
      return false;
    }
    return obj;
  }
}
class AdminModel extends MentorModel {
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
    const obj = db.find((o) => o.isMentor === true && o.userId === parseInt(userId));   
    if (obj) {
      return true;
    }
    return false;
  }
}
export { AdminModel, MentorModel, UserModel };
