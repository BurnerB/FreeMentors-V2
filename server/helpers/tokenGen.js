import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


class Token {
  static genToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_KEY,);
    return token;
  }
}

export default Token;
