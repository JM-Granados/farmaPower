import express, { Router } from 'express';
import * as elegibleMedicationCtrl from '../controllers/elegibleMedications.controller';

const router = Router();

router.get('/', elegibleMedicationCtrl.getElegibleMedications);
router.get('/getMedicineSearched', elegibleMedicationCtrl.getMedicationsSearched);

export default router;
