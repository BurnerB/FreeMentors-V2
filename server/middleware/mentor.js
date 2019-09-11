import response from '../helpers/responses';

function Mentor(req, res, next) {
  if (!req.locals.ismentor) {
    return response.Error(403, 'ACCESS DENIED! Not a Mentor', res);
  }
  next();
}


export default Mentor;
