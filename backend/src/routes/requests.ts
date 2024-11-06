import express, { Router } from 'express';
import * as requestCtrl from '../controllers/requests.controller';

const router = Router();


router.get('/x/:id', requestCtrl.getRequests); //Esto debemos arreglarlo
//Deberia haber algo en la x diferente a todos
router.get('/all', requestCtrl.getAllRequests);
router.post('/', requestCtrl.createRequest);
router.get('/rStatus', requestCtrl.getRequests_RStatus);
router.get('/totalPointsByMedication/:clientId', requestCtrl.getPointsByMedication);
router.get('/request/:id', requestCtrl.getRequestById);
router.put('/save/:id', requestCtrl.updateRStatus)

export default router;