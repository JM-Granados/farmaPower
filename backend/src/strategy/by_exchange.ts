import { IRequestStrategy } from '../strategy/get_request_by';
import Exchange from '../models/Exchange';
import Request from '../models/Request';

class ByExchange implements IRequestStrategy {
    async getRequests(userId: string, medicationId: string) {
        try {
            const exchanges = await Exchange.find({
                client: userId,
                product: medicationId
            }).populate('requests');

            const allRequests = exchanges.flatMap(exchange => exchange.requests);

            const requests = await Request.find({
                _id: { $in: allRequests },
                rStatus: 'Aprobada'
            });

            return requests;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error fetching requests by exchange: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while fetching requests by exchange');
            }
        }
    }
}

export default ByExchange;
