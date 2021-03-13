import { Router } from 'express';

import Auth from '../controllers/Auth.controller';

const router = Router();

router.post('/', Auth.login);

export default router;
