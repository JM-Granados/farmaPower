import express, { Router } from 'express';
import * as elegibleMedicationsCtrl from '../controllers/elegibleMedications.controller';
import router from './users';

router.get('/', elegibleMedicationsCtrl.getElegibleMedications);

export default router;