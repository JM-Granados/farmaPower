import { RequestHandler } from 'express';
import PharmacyModel from '../models/Pharmacy';

export const getPharmacies: RequestHandler = async (req, res) => {
    try {
        const pharmacies = await PharmacyModel.find();
        res.json(pharmacies);
    } catch (error) {
        res.json(error);
    }
}