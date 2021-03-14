import { Router } from 'express';

import SignupController from '../controllers/Signup.controller';

const router = Router();

router.post('/', SignupController.signup);

export default router;
