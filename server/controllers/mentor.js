import response from '../helpers/responses';
import { MentorModel } from '../models/usersModel';


class Mentor {
  static async getAllMentors(req, res) {
    try {
      const mentors = await MentorModel.getAllMentors();
      if (!mentors) {
        return response.handleError(404, 'No Mentors found', res);
      }

      mentors.forEach((mentor) => {
        delete mentor.password;
      });
      return response.success(200, mentors, res);
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }

  static async getSpecificMentors(req, res) {
    try {
      const { mentorId } = req.params;
      const mentor = await MentorModel.findById(mentorId);

      if (!mentor) {
        return response.handleError(404, 'No Mentor with that ID found', res);
      }
      const { password, ...noA } = mentor;
      return response.success(200, noA, res);
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }
}

export default Mentor;
