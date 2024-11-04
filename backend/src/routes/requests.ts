import express, { Router } from 'express';
import * as requestCtrl from '../controllers/requests.controller';

const router = Router();


router.get('/:id', requestCtrl.getRequests);
router.post('/', requestCtrl.createRequest);
router.get('/rStatus', requestCtrl.getRequests_RStatus);
router.get('/totalPointsByMedication/:clientId', requestCtrl.getPointsByMedication);
router.get('/request/:id', requestCtrl.getRequestById);

export default router;