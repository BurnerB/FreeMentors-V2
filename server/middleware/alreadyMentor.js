import response from '../helpers/responses';
import Db from '../db/Db';
import UserModel from '../models/usersModel';

function isAlreadyMentor(req, res, next) {
  const { isMentor } = req.body;
  const obj = UserModel.findBy('isMentor', isMentor, Db);
  if (obj) {
    return response.Error(409, 'The email has already been used to register', res);
  }
  return next();
}
export default isAlreadyMentor;
