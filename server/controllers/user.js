import bcrypt from 'bcrypt';
import { UserModel } from '../models/usersModel';
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

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      

      const newUser = new UserModel(
        firstName,
        lastName,
        email,
        hashedPassword,
        address,
        bio,
        occupation,
        expertise,
      );

      // const modifiedUser = (JSON.parse(JSON.stringify(newUser)));
      const registeredUser = await newUser.registerUser();
      // console.log(registeredUser);
      if (!registeredUser) {
        return response.handleError(409, 'The email has already been used to register', res);
      }
      const token = await Token.genToken(registeredUser);
      // console.log(token);
      return response.authsuccess(201, 'User created successfully', { token }, res);
    } catch (e) {
      return response.catchError(500, e.message, res);
    }
  }

  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findByEmail(email);

      if (user) {
        // console.log(user);
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
