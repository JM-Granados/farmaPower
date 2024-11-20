import { Router } from 'express';
import * as exchangeCtrl from '../controllers/exchanges.controller';

const router = Router();

router.get('/', exchangeCtrl.getExchanges); // Route to get exchanges
router.post('/newExchange', exchangeCtrl.createExchange);

export default router;