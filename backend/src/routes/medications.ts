import express, { Router } from 'express';
import * as medicationsCtrl from '../controllers/medications.controller';
// import router from './users';

const router = Router();

router.get('/', medicationsCtrl.getMedications);
router.get('/:id', medicationsCtrl.getMedication);

export default router;