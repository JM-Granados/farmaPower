import { RequestHandler } from 'express';
import ElegibleMedicationModel from '../models/ElegibleMedication';
import mongoose from "mongoose";

export const getElegibleMedications: RequestHandler = async (req, res) => {
    try {
        const elegibleMedications = await ElegibleMedicationModel.find().populate('medication');
        res.json(elegibleMedications);
    } catch (error) {
        res.json(error);
    }
}