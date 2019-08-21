import response from '../helpers/responses';
import UserModel from '../models/usersModel';


class Mentor {
  static async getAllMentors(req, res) {
    try {
      const mentors = await UserModel.getAllMentors();
      // console.log(user);
      if (!mentors) {
        return response.handleError(404, 'No Mentors found', res);
      }
      // console.log(user);
      return response.success(200, mentors, res);
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }
}

export default Mentor;
