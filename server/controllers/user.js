import bcrypt from 'bcrypt';
import db from '../db/users';
import UserModel from '../models/usersModel';
import response from '../helpers/responses';
import Token from '../helpers/tokenGen';


class Authentication {
  static async registerUser(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        address,
        bio,
        occupation,
        expertise,
      } = req.body;
      const userId = db.length + 1;
      const isMentor = false;
      const isAdmin = false;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      
      const newUser = new UserModel({
        userId,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        address,
        bio,
        occupation,
        expertise,
        isMentor,
        isAdmin,
      });
      const registeredUser = await newUser.registerUser();
      
      const token = await Token.genToken(registeredUser);

      return response.authsuccess(201, 'User created successfully', { token }, res);
    } catch (e) {
      return response.catchError(500, e.message, res);
    }
  }

  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findBy('email', email, db);

      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const token = Token.genToken(user);
          return response.authsuccess(200, 'User is successfully logged in', { token }, res);
        }
        return response.handleError(401, 'Incorrect password Email combination', res);
      }
      return response.handleError(404, 'Email not found, sign up to create an account', res);
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }
}

export default Authentication;
