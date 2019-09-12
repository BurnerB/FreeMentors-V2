import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


class Token {
  static genToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '100h',
    });
    return token;
  }
}

export default Token;
