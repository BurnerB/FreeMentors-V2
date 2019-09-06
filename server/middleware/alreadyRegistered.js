import response from '../helpers/responses';
import db from '../db/users';

function alreadyRegistered(req, res, next) {
  const { email } = req.body;
  const obj = db.find((o) => o.email === email);
  if (obj) {
    return response.handleError(409, 'The email has already been used to register', res);
  }
  return next();
}

export default alreadyRegistered;
