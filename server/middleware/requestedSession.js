import response from '../helpers/responses';
import SessionModel from '../models/sessionModel';

function requestedSession(req, res, next) {
  const { menteeId } = req.params;
  const { mentorId } = req.locals;
  if (!SessionModel.wasRequested(menteeId, mentorId)) {
    return response.Error(400, 'Your session is still pending with this user,you cannot request another session', res);
  }
  return next();
}


export default requestedSession;
