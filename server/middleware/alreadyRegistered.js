import response from '../helpers/responses';
import UserModel from '../models/usersModel';


const alreadyRegistered = async (req, res, next) => {
  const { email } = req.body;
  const obj = await UserModel.findBy('email', email, 'users');
  if (obj.length !== 0) {
    return response.Error(409, 'The email has already been used to register', res);
  }
  return next();
}

export default alreadyRegistered;
