import { Router } from 'express';

import AuthController from '../controllers/Auth.controller';

const router = Router();

router.get('/', AuthController.login);

export default router;
