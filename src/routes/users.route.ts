import { Router } from 'express';

import UsersController from '../controllers/Users.controller';

const router = Router();

router.put('/', UsersController.create);

export default router;
