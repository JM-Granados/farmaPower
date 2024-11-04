import express, { Router } from 'express';
import * as programsCtrl from '../controllers/programs.controller';

const router = Router();

router.get('/', programsCtrl.getPrograms);

export default router;