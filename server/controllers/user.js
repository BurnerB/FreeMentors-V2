import bcrypt from 'bcrypt';
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

      // console.log(newUser);
      if (!await newUser.registerUser()) {
        return response.handleError(409, 'The email has already been used to register', res);
      }
      const token = Token.genToken(newUser);
      // console.log(token);
      return response.authsuccess(201, 'User created successfully', { token }, res);
    } catch (e) {
      return response.catchError(500, e.message, res);
    }
  }
}


export default Authentication;
