import { Router } from 'express';

import AccountController from '../controllers/Account.controller';

const router = Router();

router.get('/checkbalance', AccountController.checkBalance);
router.post('/selfdeposit', AccountController.selfDeposit);
router.post('/interntransfer', AccountController.internTransfer);
router.post('/externtransfer', AccountController.externTransfer);
router.get('/movementrecords', AccountController.movementRecords);

export default router;
