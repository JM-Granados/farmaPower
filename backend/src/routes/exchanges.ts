import { Router } from 'express';
import * as exchangeCtrl from '../controllers/exchanges.controller';

const router = Router();

router.get('/', exchangeCtrl.getExchanges); // Route to get states in alphabetical order

export default router;