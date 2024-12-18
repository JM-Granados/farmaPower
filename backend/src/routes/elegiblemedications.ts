import express from 'express';
import * as elegibleMedicationCtrl from '../controllers/elegibleMedications.controller';

const router = express.Router();

router.get('/', elegibleMedicationCtrl.getElegibleMedications);
router.get('/search', elegibleMedicationCtrl.searchElegibleMedications);
router.post('/create', elegibleMedicationCtrl.createElegibleMedication);
router.put('/modify/:id', elegibleMedicationCtrl.updateElegibleMedication);
router.delete('/delete/:id', elegibleMedicationCtrl.deleteElegibleMedication);
router.get('/getMedicineSearched', elegibleMedicationCtrl.getMedicationsSearched);

export default router;