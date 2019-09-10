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
      const nowMentor = await AdminModel.makeMentor(user[0].id);
      const { ismentor } = nowMentor[0];
      return response.authsuccess(200, 'User account changed to mentor', { ismentor }, res);
    } catch (error) {
      return response.Error(500, v.toString(), res);
    }
  }
}

export default Admin;
