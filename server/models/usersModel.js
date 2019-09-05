import db from '../db/users';
import BaseClass from './baseclass';

class UserModel extends BaseClass {
  async registerUser() {
    const user = {
      userId: this.payload.userId,
      firstName: this.payload.firstName,
      lastName: this.payload.lastName,
      email: this.payload.email,
      password: this.payload.password,
      address: this.payload.address,
      bio: this.payload.bio,
      occupation: this.payload.occupation,
      expertise: this.payload.expertise,
      isMentor: this.payload.isMentor,
      isAdmin: this.payload.isAdmin,
    };
    db.push(user);
    return user;
  }
}

export default UserModel;
