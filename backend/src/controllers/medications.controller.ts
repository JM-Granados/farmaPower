import { RequestHandler } from 'express';
import MedicationModel from '../models/Medication';
import mongoose from "mongoose";

export const getMedications: RequestHandler = async (req, res) => {
    try {
        const medications = await MedicationModel.find().populate('type');
        res.json(medications);
    } catch (error) {
        res.json(error);
    }
}


export const getMedication: RequestHandler = async (req, res) => {
    try {
        const medication = await MedicationModel.findById(req.params.id);
        res.json(medication);
    } catch (error) {
        res.json(error);
    }
}
