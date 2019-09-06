import Users from './userRoutes';
import Session from './sessionRoutes';
import Admin from './adminRoutes';
import Review from './reviewRoutes';

const appPrefix = '/api/v1';

const routes = (app) => {
  app.use(appPrefix, Users);
  app.use(appPrefix, Session);
  app.use(appPrefix, Admin);
  app.use(appPrefix, Review);
};

export default routes;
