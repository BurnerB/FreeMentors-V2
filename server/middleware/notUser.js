import response from '../helpers/responses';

function notUser(req, res, next) {
  if (req.locals.ismentor) {
    return response.Error(403, 'Mentor cant access this route', res);
  }
  return next();
}


export default notUser;
