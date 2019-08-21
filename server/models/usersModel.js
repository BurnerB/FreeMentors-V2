import db from '../db/users';
import mentors from '../db/mentor';

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
    this.is_Mentor = false;
    this.is_Admin = false;
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
      is_Mentor: this.is_Mentor,
      is_Admin: this.is_Admin,
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
    const obj = db.find((o) => o.userId === userId);
    if (!obj) {
      return false;
    }
    return obj;
  }

  static async makeMentor(userId) {
    const obj = db.find((o) => o.userId === parseInt(userId));
    // console.log(obj);
    if (!obj) {
      return false;
    }

    const mentor = {
      userId: obj.userId,
      firstName: obj.firstName,
      lastName: obj.lastName,
      email: obj.email,
      password: obj.password,
      address: obj.address,
      bio: obj.bio,
      occupation: obj.occupation,
      expertise: obj.expertise,
      isMentor: true,
      isAdmin: false,
    };
    db.splice(obj.userId - 1, 1, mentor);
    mentors.push(mentor);
    return mentor;
  }

  static getAllMentors() {
    if (mentors.length === 0) {
      return false;
    }
    return mentors;
  }
}

export default UserModel;
