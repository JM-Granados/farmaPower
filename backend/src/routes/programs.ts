import express, { Router } from 'express';
import * as programCtrl from '../controllers/programs.controller';

const router = Router();

router.get('/', programCtrl.getPrograms);

export default router;
