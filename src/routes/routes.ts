import { Router } from 'express';

import user from './user';

const routes = Router();

routes.use('/', user);

export default routes;