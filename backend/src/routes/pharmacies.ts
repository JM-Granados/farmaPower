import express, { Router } from 'express';
import * as pharmaciesCtrl from '../controllers/pharmacies.controller';

const router = Router();

router.get('/', pharmaciesCtrl.getPharmacies);

export default router;