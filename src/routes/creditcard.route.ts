import { Router } from 'express';

import CreditCardController from '../controllers/CreditCard.controller';

const router = Router();

router.post('/purchase', CreditCardController.purchaseCredit);
router.get('/checkinvoice', CreditCardController.checkInvoice);
router.get('/paydueinvoice', CreditCardController.payDueInvoice);

export default router;
