// by_date.ts
import { IRequestStrategy } from './get_request_by';
import Request from '../models/Request';

class ByDate implements IRequestStrategy {
    async getRequests(userId: string, medicationId: string) {
        try {
            const requests = await Request.find({
                client: userId,
                medication: medicationId,
                rStatus: 'Aprobada'
            }).sort({ purchaseDate: 1 });

            return requests;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error fetching requests by date: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while fetching requests by date');
            }
        }
    }
}

export default ByDate;
