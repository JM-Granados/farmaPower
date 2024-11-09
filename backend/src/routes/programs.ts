import express, { Router } from 'express';
import * as programCtrl from '../controllers/programs.controller';

const router = Router();

router.get('/', programCtrl.getPrograms);
router.put('/:id', programCtrl.updateProgram);
router.get('/search', programCtrl.searchPrograms);

export default router;
