// get_request_by.ts
export interface IRequestStrategy {
    getRequests(userId: string, medicationId: string): Promise<any>;
}
