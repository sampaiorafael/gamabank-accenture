import { Router } from 'express';

import status from './status.route';
import users from './users.route';

const routes = Router();

routes.use('/status', status);
routes.use('/users', users);

export default routes;