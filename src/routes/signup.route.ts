import { Router } from 'express';

import SignupController from '../controllers/Signup.controller';

const router = Router();

router.put('/', SignupController.signup);

export default router;
