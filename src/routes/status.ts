import { Router } from 'express';

import StatusController from '../controllers/Status';

const router = Router();

router.get('/', StatusController.status);

export default router;
