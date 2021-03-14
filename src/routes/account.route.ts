import { Router } from 'express';

import AccountController from '../controllers/Account.controller';

const router = Router();

router.get('/checkbalance', AccountController.checkBalance);

export default router;
