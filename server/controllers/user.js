import bcrypt from 'bcrypt';
import UserModel from '../models/usersModel';
import response from '../helpers/responses';
import Token from '../helpers/tokenGen';

const isMentor = false;
const isAdmin = false;


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
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new UserModel({
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
    } catch (error) {
      return response.Error(500, error.message, res);
    }
  }

  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findBy('email', email, 'users');

      if (user.length !== 0) {
        if (bcrypt.compareSync(password, user[0].password)) {
          const token = Token.genToken(user[0]);
          return response.authsuccess(200, 'User is successfully logged in', { token }, res);
        }
        return response.Error(401, 'Incorrect password Email combination', res);
      }
      if (user.length === 0) { return response.Error(404, 'Email not found, sign up to create an account', res);}
    } catch (error) {
      return response.Error(500, error.toString(), res);
    }
  }
}

export default Authentication;
