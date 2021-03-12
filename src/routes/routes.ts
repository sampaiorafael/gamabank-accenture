import { Router } from 'express';

import status from './status';

const routes = Router();

routes.use('/status', status);

export default routes;