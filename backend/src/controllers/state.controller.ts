import { RequestHandler } from 'express';
import StateModel from '../models/State';

// Retrieve all states in alphabetical order
export const getStates: RequestHandler = async (req, res) => {
    try {
        const states = await StateModel.find().sort({ state: 1 }); // Sort by 'state' field in ascending order
        res.json(states);
    } catch (error) {
        res.status(500).json({ message: "Error fetching states", error });
    }
};
