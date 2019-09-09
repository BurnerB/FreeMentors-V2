import response from '../helpers/responses';
import AdminModel from '../models/AdminModel';


class Admin {
  static async makeMentor(req, res) {
    try {
      const { userId } = req.params;
      

      const user = await AdminModel.findBy('id', parseInt(userId, 10), 'users');
      if (user[0].length === 0) {
        return response.handleError(404, 'User with that Id not found', res);
      }
      await AdminModel.makeMentor(user[0].id);
      return response.success(200, { message: 'User account changed to mentor' }, res);
    } catch (e) {
      return response.Error(500, e.toString(), res);
    }
  }
}

export default Admin;
