import express, { Router } from 'express';
import * as pharmacyCtrl from '../controllers/pharmacy.controller';

const router = Router();

router.get('/search', pharmacyCtrl.searchPharmacies);
router.get('/', pharmacyCtrl.getPharmacies);
router.post('/', pharmacyCtrl.createPharmacy);

export default router;
