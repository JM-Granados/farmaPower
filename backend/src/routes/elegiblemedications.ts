import express, { Router } from 'express';
import * as elegibleMedicationCtrl from '../controllers/elegiblemedication.controller';

const router = Router();

router.get('/search', elegibleMedicationCtrl.searchElegibleMedications);
router.get('/', elegibleMedicationCtrl.getElegibleMedications);
router.post('/', elegibleMedicationCtrl.createElegibleMedication);

export default router;
