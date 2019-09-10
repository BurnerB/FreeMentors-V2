import response from '../helpers/responses';
import SessionModel from '../models/sessionModel';


const alreadyRequested = async (req, res, next) => {
  const { mentorId } = req.params;
  const { id } = req.locals;
  const obj = await SessionModel.wasRequested(id, mentorId);
  if (!obj) {
    return response.Error(400, 'Session already requested with this mentor and is pending', res);
  }
  return next();
}

export default alreadyRequested;
