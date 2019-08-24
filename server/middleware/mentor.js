import response from '../helpers/responses';

function Mentor(req, res, next) {
  // console.log(req.locals.isAdmin);
  if (!req.locals.isMentor) {
    return response.handleError(403, 'ACCESS DENIED! Not a Mentor', res);
  }
  next();
}


export default Mentor;