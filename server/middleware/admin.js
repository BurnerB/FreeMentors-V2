import response from '../helpers/responses';

function Admin(req, res, next) {
  if (!req.locals.isAdmin) {
    return response.Error(403, 'ACCESS DENIED! Not an Admin', res);
  }
  next();
}


export default Admin;
