import { Router } from 'express';

import UserController from '../controllers/User';

const router = Router();

router.get('/', UserController.test);

export default router;
