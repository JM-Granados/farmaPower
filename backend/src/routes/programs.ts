import express, { Router } from 'express';
import * as programCtrl from '../controllers/program.controller';

const router = Router();

router.get('/search', programCtrl.searchPrograms);
router.get('/', programCtrl.getPrograms);
router.post('/', programCtrl.createProgram);

export default router;
