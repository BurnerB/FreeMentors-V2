import response from '../helpers/responses';
import SessionModel from '../models/sessionModel';
import MentorModel from '../models/usersModel';
import decoder from '../helpers/decodeToken';
import db from '../db/Db';


class Sessions {
  static async requestSession(req, res) {
    try {
      const status = 'pending';

      const { questions } = req.body;
      const { mentorId } = req.params;

      const mentorExists = await MentorModel.findBy('id', parseInt(mentorId, 10),'users');
      if (mentorExists.length === 0) {
        return response.Error(404, 'No Mentor with that ID found', res);
      }
      const decoded = decoder.decodeToken(req.headers.authorization);
      const { id, email } = decoded;
      const menteeId = parseInt(id, 10);
      const newSession = new SessionModel({
        mentorId, menteeId, questions, menteeEmail: email, status,
      });

      const session = await newSession.requestSession();
      return response.success(201, session, res);
    } catch (error) {
      return response.catchError(500, error.message, res);
    }
  }

  static async chooseSession(req, res) {
    try {
      const { sessionId } = req.params;
      const decoded = decoder.decodeToken(req.headers.authorization);
      const { userId } = decoded;

      const sessionExist = await SessionModel.wasRequested(sessionId, userId);

      if (!sessionExist) {
        return response.handleError(404, 'You have no requested session with that ID', res);
      }
      if (/accept/.test(req.url)) {
        const accepted = await SessionModel.acceptSession(sessionExist);
        if (accepted[0] === false) {
          return response.handleError(400, `Session already ${accepted[1].status}`, res);
        }
        return response.success(200, accepted, res);
      }
      if (/reject/.test(req.url)) {
        const rejected = await SessionModel.rejectSession(sessionExist);
        if (rejected[0] === false) {
          return response.handleError(400, `Session already ${rejected[1].status}`, res);
        }
        return response.success(200, rejected, res);
      }
    } catch (error) {
      return response.catchError(500, error.message, res);
    }
  }

  static async getallSessions(req, res) {
    try {
      const decoded = decoder.decodeToken(req.headers.authorization);
      const { userId, isMentor } = decoded;

      if (!isMentor) {
        const sessions = await SessionModel.findSessions('menteeId', userId);
        if (!sessions) {
          return response.handleError(404, 'You have no requested sessions', res);
        }
        return response.success(200, sessions, res);
      }
      const sessions = await SessionModel.findSessions('mentorId', userId);
      if (!sessions) {
        return response.handleError(404, 'You have no sessions requested', res);
      }
      return response.success(200, sessions, res);
    } catch (e) {
      return response.catchError(500, e.message, res);
    }
  }
}
export default Sessions;
