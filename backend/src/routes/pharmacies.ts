import express, { Router } from 'express';
import * as pharmacyCtrl from '../controllers/pharmacies.controller';

const router = Router();

router.get('/get', pharmacyCtrl.getPharmacies);
router.get('/s', pharmacyCtrl.getStates);
router.put('/update/:id', pharmacyCtrl.updatePharmacy); // Route to update pharmacy
router.delete('/delete/:id', pharmacyCtrl.deletePharmacy); // Route to delete pharmacy
router.get('/search', pharmacyCtrl.searchPharmacies); // New route for searching pharmacies

export default router;
