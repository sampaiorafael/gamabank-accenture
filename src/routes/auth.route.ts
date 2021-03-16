import { Router } from 'express';

import AuthController from '../controllers/Auth.controller';

const router = Router();

router.post('/', AuthController.login);

export default router;
