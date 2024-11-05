import express, { Router } from 'express';
import * as pharmacyCtrl from '../controllers/pharmacies.controller';

const router = Router();

router.get('/', pharmacyCtrl.getPharmacies);
router.get('/s', pharmacyCtrl.getStates);

export default router;
