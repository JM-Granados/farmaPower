import { RequestHandler } from 'express';
import { Request, Response } from 'express';
import StateModel from '../models/State';

export const getStates: RequestHandler = async (req: Request, res: Response) => {
    try {
        // Fetch all states, sorted alphabetically by 'name'
        const states = await StateModel.find().sort({ name: 1 });
        res.json(states);
    } catch (error) {
        console.error("Error fetching states:", error);
        res.status(500).json({ message: "Failed to fetch states" });
    }
};
