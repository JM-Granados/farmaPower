import { Router } from 'express';
import * as exchangeCtrl from '../controllers/exchanges.controller';

const router = Router();

router.get('/all', exchangeCtrl.getExchanges); // Route to get exchanges
router.post('/newExchange', exchangeCtrl.createExchange);
router.get('/points/:id', exchangeCtrl.getPoints);

export default router;