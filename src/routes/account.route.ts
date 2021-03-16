import { Router } from 'express';

import AccountController from '../controllers/Account.controller';

const router = Router();

router.get('/checkbalance', AccountController.checkBalance);
router.post('/selfdeposit', AccountController.selfDeposit);
router.post('/interntransfer', AccountController.internTransfer);

export default router;
