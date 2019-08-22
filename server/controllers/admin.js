import response from '../helpers/responses';
import MentorModel from '../models/mentorModel';
import UserModel from '../models/usersModel';


class Admin {
  static async makeMentor(req, res) {
    try {
      const { userId } = req.params;
      const mentor = await MentorModel.findById(userId);
      if (mentor) {
        return response.handleError(400, 'User is already a mentor', res);
      }
      const user = await UserModel.findById(userId);
      if (!user) {
        return response.handleError(404, 'User with that Id not found', res);
      }
      const newMentor = await MentorModel.makeMentor(user);
      if (newMentor) {
        return response.success(200, { message: 'User account changed to mentor' }, res);
      }
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }
}

export default Admin;
