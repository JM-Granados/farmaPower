import { Router } from 'express';
import * as stateCtrl from '../controllers/state.controller';

const router = Router();

router.get('/', stateCtrl.getStates); // Route to get states in alphabetical order

export default router;
