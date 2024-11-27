import { Router } from 'express';
import * as exchangeCtrl from '../controllers/exchanges.controller';

const router = Router();

router.get('/all', exchangeCtrl.getExchanges); // Route to get exchanges
router.post('/newExchange', exchangeCtrl.createExchange);
router.get('/points/:id', exchangeCtrl.getPoints);
router.get('/points/medication/:id', exchangeCtrl.getMedicationPoints);
router.post('/ve/visitExchanges', exchangeCtrl.visitExchanges);
router.get('/getIdClientByExchange', exchangeCtrl.getIdClientByExchange);


export default router;