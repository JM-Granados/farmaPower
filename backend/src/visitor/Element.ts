import { Visitor } from './Visitor';

export interface Element {
    accept(params: { v: Visitor; id: number; idClient: number }): Promise<{ success: boolean; data: any }>;
}