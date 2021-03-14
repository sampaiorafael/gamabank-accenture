import { Router } from 'express';

import status from './status.route';
import users from './signup.route';
import auth from './auth.route';
import account from './account.route'

const routes = Router();

routes.use('/status', status);
routes.use('/signup', users);
routes.use('/auth', auth);
routes.use('/account', account);

export default routes;