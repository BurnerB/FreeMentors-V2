import response from '../helpers/responses';

function Admin(req, res, next) {
  if (!req.locals.isAdmin) {
    return response.handleError(403, 'ACCESS DENIED! Not an Admin', res);
  }
  next();
}


export default Admin;
