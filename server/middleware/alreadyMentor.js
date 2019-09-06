import response from '../helpers/responses';
import db from '../db/users';

function isAlreadyMentor(req, res, next) {
  const { userId } = req.params;
  const obj = db.find((o) => o.isMentor === true && o.userId === parseInt(userId, 10));
  if (obj) {
    return response.handleError(409, 'User is already a mentor', res);
  }
  return next();
}
export default isAlreadyMentor;
