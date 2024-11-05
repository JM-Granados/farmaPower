import { Router } from 'express';
import * as stateCtrl from '../controllers/states.controller';

const router = Router();

router.get('/get', stateCtrl.getStates); // Route to get states in alphabetical order

export default router;
