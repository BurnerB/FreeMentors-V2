import response from '../helpers/responses';

function Mentor(req, res, next) {
  if (req.locals.isMentor) {
    return response.handleError(403, 'ACCESS DENIED! A mantor cannot review a session', res);
  }
  next();
}


export default Mentor;
