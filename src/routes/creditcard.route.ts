import { Router } from 'express';

import CreditCardController from '../controllers/CreditCard.controller';

const router = Router();

router.post('/purchase', CreditCardController.purchase);

export default router;
