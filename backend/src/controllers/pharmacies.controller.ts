import { RequestHandler } from 'express';
import PharmacyModel from '../models/Pharmacy';
import StateModel from '../models/State';

export const getPharmacies: RequestHandler = async (req, res) => {
    try {
        const pharmacies = await PharmacyModel.find().populate('state');
        res.json(pharmacies);
    } catch (error) {
        res.json(error);
    }
}

export const getStates: RequestHandler = async (req, res) => {
    try {
        const states = await StateModel.find();
        res.json(states);
    } catch (error) {
        res.json(error);
    }
}