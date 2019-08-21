import response from '../helpers/responses';
import UserModel from '../models/usersModel';


class Admin {
  static async makeMentor(req, res) {
    try {
      const { userId } = req.params;
      const user = await UserModel.makeMentor(userId);
      // console.log(user);
      if (!user) {
        return response.handleError(404, 'User with that Id not found', res);
      }
      // console.log(user);
      return response.success(200, {message:'User account changed to mentor'}, res);
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }
}

export default Admin;
