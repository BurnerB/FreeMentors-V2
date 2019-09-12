import response from '../helpers/responses';
import SessionModel from '../models/sessionModel';


const alreadyRequested = async (req, res, next) => {
  const { mentorId } = req.params;
  const { id } = req.locals;
  const checker = await SessionModel.findBy('id', mentorId, 'users');
  if (checker.length === 0 || checker[0].ismentor === false) {
    return response.Error(404, 'No Mentor with that ID found', res);
  }
  const obj = await SessionModel.wasRequested(id, mentorId);
  if (obj || checker[0].status === 'pending') {
    return response.Error(409, 'Session already requested with this mentor and is pending', res);
  }
  return next();
};

export default alreadyRequested;
