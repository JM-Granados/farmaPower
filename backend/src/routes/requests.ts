import express, { Router } from 'express';
import * as requestCtrl from '../controllers/requests.controller';

const router = Router();


router.get('/', requestCtrl.getRequests);
router.post('/', requestCtrl.createRequest);
router.get('/rStatus', requestCtrl.getRequests_RStatus);

export default router;