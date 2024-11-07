import express, { Router } from 'express';
import * as requestCtrl from '../controllers/requests.controller';
import { upload } from '../multerConfig';

const router = Router();


router.get('/x/:id', requestCtrl.getRequests); //Esto debemos arreglarlo
router.get('/all', requestCtrl.getAllRequests);
router.post('/c/',  upload.single('invoiceImage'),requestCtrl.createRequest);
router.get('/rStatus', requestCtrl.getRequests_RStatus);
router.get('/p/totalPointsByMedication/:clientId', requestCtrl.getPointsByMedication);
router.get('/request/:id', requestCtrl.getRequestById);
router.put('/save/:id', requestCtrl.updateRStatus);



export default router;