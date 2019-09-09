import response from '../helpers/responses';
import AdminModel from '../models/AdminModel';
// import db from '../db/users';


class Admin {
  static async makeMentor(req, res) {
    try {
      const { userId } = req.params;

      const user = await AdminModel.findBy('userId', parseInt(userId, 10), db);
      if (!user) {
        return response.handleError(404, 'User with that Id not found', res);
      }
      await AdminModel.makeMentor(user);
      return response.success(200, { message: 'User account changed to mentor' }, res);
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }
}

export default Admin;
