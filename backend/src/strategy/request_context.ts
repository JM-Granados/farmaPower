// request_context.ts
import { IRequestStrategy } from './get_request_by';

class RequestContext {
    private strategy: IRequestStrategy;

    constructor(strategy: IRequestStrategy) {
        this.strategy = strategy;
    }

    // Method to set a different strategy at runtime (if needed)
    setStrategy(strategy: IRequestStrategy) {
        this.strategy = strategy;
    }

    // Method to get the requests using the current strategy
    async getRequests(userId: string, medicationId: string) {
        return await this.strategy.getRequests(userId, medicationId);
    }
}

export { RequestContext };
