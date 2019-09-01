/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import response from '../helpers/responses';
import SessionModel from '../models/sessionModel';
import { MentorModel } from '../models/usersModel';
import decoder from '../helpers/decodeToken';

class Sessions {
  static async requestSession(req, res) {
    try {
      const { mentorId, questions } = req.body;

      if (!await MentorModel.findById(mentorId)) {
        return response.handleError(404, 'No Mentor with that ID found', res);
      }
      const decoded = decoder.decodeToken(req.headers.authorization);
      const { userId, email } = decoded;
      const newSession = new SessionModel(parseInt(mentorId), userId, questions, email);

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
    } catch (e) {
      return response.catchError(500, e.message, res);
    }
  }

  static async getallSessions(req, res) {
    try {
      const decoded = decoder.decodeToken(req.headers.authorization);
      const { userId, isMentor } = decoded;

      if (isMentor === false) {
        const sessions = await SessionModel.getUserSessions(userId);
        if (!sessions) {
          return response.handleError(404, 'You have no requested sessions', res);
        }
        return response.success(200, sessions, res);
      }
      if (isMentor === true) {
        const sessions = await SessionModel.getMentorSessions(userId);
        if (!sessions) {
          return response.handleError(404, 'You have no sessions requested', res);
        }
        return response.success(200, sessions, res);
      }
    } catch (e) {
      return response.catchError(500, e.message, res);
    }
  }
}
export default Sessions;
