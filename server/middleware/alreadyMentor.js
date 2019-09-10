import response from '../helpers/responses';
import UserModel from '../models/usersModel';

const isAlreadyMentor = async (req, res, next) => {
  const { userId } = req.params;
  const obj = await UserModel.findBy('id', parseInt(userId, 10), 'users');

  if (obj.length === 0) {
    return response.Error(404, 'No Mentor with that Id found', res);
  }
  if (obj[0].ismentor === true) {
    return response.Error(409, 'The user is  already a mentor', res);
  }
  return next();
};
export default isAlreadyMentor;
