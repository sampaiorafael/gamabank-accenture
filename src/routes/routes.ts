import { Router } from 'express';

import status from './status.route';
import users from './signup.route';
import auth from './auth.route';
import account from './account.route';
import creditcard from './creditcard.route';

const routes = Router();

routes.use('/status', status);
routes.use('/signup', users);
routes.use('/auth', auth);
routes.use('/account', account);
routes.use('/creditcard', creditcard);

export default routes;