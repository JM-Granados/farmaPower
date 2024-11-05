import express from 'express';
import * as elegibleMedicationCtrl from '../controllers/elegibleMedications.controller';

const router = express.Router();

router.get('/', elegibleMedicationCtrl.getElegibleMedications);
router.get('/search', elegibleMedicationCtrl.searchElegibleMedications);
router.post('/create', elegibleMedicationCtrl.createElegibleMedication);

export default router;
