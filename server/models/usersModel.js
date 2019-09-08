import BaseClass from './baseclass';
import Db from '../db/Db';

class UserModel extends BaseClass {
  async registerUser() {
    const sql = 'INSERT INTO users(firstName,lastName,email,password, address, bio,occupation,expertise,isMentor, isAdmin) VALUES($1, $2, $3, $4, $5 ,$6, $7, $8, $9, $10) returning *';
    const values = [this.payload.firstName, this.payload.lastName,
      this.payload.email, this.payload.password,
      this.payload.address, this.payload.bio, this.payload.occupation,
      this.payload.expertise, this.payload.isMentor, this.payload.isAdmin];
    const { rows } = await Db.query(sql, values);
    return rows[0];
  }
}

export default UserModel;
