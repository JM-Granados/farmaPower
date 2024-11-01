import { RequestHandler } from 'express';
import { Request, Response } from 'express';
import ElegibleMedicationModel from '../models/ElegibleMedication';
import mongoose from "mongoose";

// Retrieve all eligible medications
export const getElegibleMedications: RequestHandler = async (req, res) => {
    try {
        const medications = await ElegibleMedicationModel.find().populate('medication'); // Populates the medication details
        res.json(medications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching eligible medications", error });
    }
}

// Create a new eligible medication
export const createElegibleMedication: RequestHandler = async (req, res) => {
    try {
        const newMedication = new ElegibleMedicationModel(req.body);
        const savedMedication = await newMedication.save();
        res.json(savedMedication);
    } catch (error) {
        res.status(500).json({ message: "Error creating eligible medication", error });
    }
}

// Search eligible medications based on the input text in the search bar
export const searchElegibleMedications = async (req: Request, res: Response) => {
    try {
        const { searchText } = req.query; // Expecting searchText as a query parameter
        
        // Case-insensitive regex search to find medications starting with the search text
        const medications = await ElegibleMedicationModel.find()
            .populate({
                path: 'medication',
                match: { name: new RegExp(`^${searchText}`, 'i') } // 'i' makes it case-insensitive
            })
            .exec();

        // Filter out medications where no match was found in 'medication' population
        const filteredMedications = medications.filter(med => med.medication !== null);
        
        res.json(filteredMedications);
    } catch (error) {
        console.error("Error searching eligible medications:", error);
        res.status(500).json({ message: "Error searching eligible medications" });
    }
};
