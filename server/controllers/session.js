import response from '../helpers/responses';
import SessionModel from '../models/sessionModel';
import MentorModel from '../models/mentorModel';
import decoder from '../helpers/decodeToken';

class Sessions {
  static async requestSession(req, res) {
    try {
      const { mentorId, questions } = req.body;

      // console.log(questions);
      if (!await MentorModel.findById(mentorId)) {
        return response.handleError(404, 'No Mentor with that ID found', res);
      }
      const decoded = decoder.decodeToken(req.headers.authorization);
      const { userId, email } = decoded;
      const newSession = new SessionModel(parseInt(mentorId), userId, questions, email);
      // console.log(newSession);
      const session = await newSession.requestSession();
      if (!session) {
        return response.handleError(400, 'Session already requested with this mentor', res);
      }
      return response.success(201, session, res);
    } catch (e) {
      return response.catchError(500, e.message, res);
    }
  }

  static async chooseSession(req, res) {
    try {
      const { sessionId } = req.params;
      const decoded = decoder.decodeToken(req.headers.authorization);
      const { userId } = decoded;

      const sessionExist = await SessionModel.wasRequested(sessionId, userId);
      // console.log(sessionExist);
      if (!sessionExist) {
        return response.handleError(404, 'You have no requested session with that ID', res);
      }
      if (/accept/.test(req.url)) {
        const accepted = await SessionModel.acceptSession(sessionExist);
        return response.success(200, accepted, res);
      }
      if (/reject/.test(req.url)) {
        const rejected = await SessionModel.rejectSession(sessionExist);
        return response.success(200, rejected, res);
      }
    } catch (e) {
      return response.catchError(500, e.message, res);
    }
  }
}
export default Sessions;
