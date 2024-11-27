
export interface Visitor {

  visitCandidates(params: { v: Visitor; id: number; idClient: number; }): Promise<{ success: boolean; data: any; }>;

  visitExchanges(params: { v: Visitor; id: number; idClient: number; }): Promise<{ success: boolean; data: any; }>;

}