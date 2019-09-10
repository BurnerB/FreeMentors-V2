import response from '../helpers/responses';
import MentorModel from '../models/mentorModel';


class Mentor {
  static async getAllMentors(req, res) {
    try {
      const mentors = await MentorModel.getAllMentors();
      if (mentors.length === 0) {
        return response.Error(404, 'No Mentors found', res);
      }

      mentors.forEach((mentor) => {
        delete mentor.password;
      });
      return response.success(200, mentors, res);
    } catch (e) {
      return response.Error(500, e.toString(), res);
    }
  }
}

export default Mentor;
