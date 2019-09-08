import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import response from '../helpers/responses';

dotenv.config();

function auth(req, res, next) {
  const token = req.headers.authorization;
  const jwtToken = req.headers.authorization.split(' ')[1];
  if (!token || !jwtToken) {
    return response.Error(401, 'ACCESS DENIED! No token provided', res);
  }
  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_KEY);
    if (!decoded) {
      return response.Error(400, 'Invalid or expired token', res);
    }
    req.locals = decoded;

    return next();
  } catch (error) {
    return response.Error(500, error.toString(), res);
  }
}


export default auth;
