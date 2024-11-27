import express, { Router } from 'express';
import * as requestCtrl from '../controllers/requests.controller';
import { RequestContext } from '../strategy/request_context';
import ByDate from '../strategy/by_date';  // Import strategy classes
import ByExchange from '../strategy/by_exchange'; 
import { upload } from '../multerConfig';

const router = Router();

router.get('/strategy/:id', async (req, res) => {
    const medicationId = "672ac28c9fe42fd066c6a743";
    const userId = "672b5b2e88b3e64a2752d585";

    if (!userId) {
        return res.status(401).json({ message: 'User is not authenticated' });
    }

    try {
        // Example: Use ByDate strategy, you can switch to ByExchange or another strategy
        const context = new RequestContext(new ByDate());  // Change strategy as needed
        const requests = await context.getRequests(userId, medicationId);
        
        res.json(requests);
    } catch (error) {
        console.error('Error fetching requests by strategy:', error);
        res.status(500).json({ message: 'Error fetching requests by strategy', error });
    }
});

router.get('/x/:id', requestCtrl.getRequests); // This route still uses the original controller function

// Other routes
router.get('/all', requestCtrl.getAllRequests);
router.post('/c/', upload.single('invoiceImage'), requestCtrl.createRequest);
router.get('/rStatus', requestCtrl.getRequests_RStatus);
router.get('/p/totalPointsByMedication/:clientId', requestCtrl.getPointsByMedication);
router.get('/request/:id', requestCtrl.getRequestById);
router.put('/save/:id', requestCtrl.updateRStatus);

router.post('/vs/visitCandidates', requestCtrl.visitCandidates);

export default router;