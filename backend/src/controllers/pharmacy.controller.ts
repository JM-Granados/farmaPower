import { RequestHandler } from 'express';
import PharmacyModel from '../models/Pharmacy';
import mongoose from 'mongoose';

// Retrieve all pharmacies
export const getPharmacies: RequestHandler = async (req, res) => {
    try {
        const pharmacies = await PharmacyModel.find().populate('state'); // Populate state details
        res.json(pharmacies);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pharmacies", error });
    }
}

// Create a new pharmacy
export const createPharmacy: RequestHandler = async (req, res) => {
    try {
        const newPharmacy = new PharmacyModel(req.body);
        const savedPharmacy = await newPharmacy.save();
        res.json(savedPharmacy);
    } catch (error) {
        res.status(500).json({ message: "Error creating pharmacy", error });
    }
}

// Search pharmacies based on the input text in the search bar
export const searchPharmacies: RequestHandler = async (req, res) => {
    try {
        const { searchText } = req.query; // Expecting searchText as a query parameter
        
        // Case-insensitive regex search to find pharmacies starting with the search text
        const pharmacies = await PharmacyModel.find({
            name: new RegExp(`^${searchText}`, 'i') // 'i' makes it case-insensitive
        }).populate('state');

        res.json(pharmacies);
    } catch (error) {
        console.error("Error searching pharmacies:", error);
        res.status(500).json({ message: "Error searching pharmacies" });
    }
};
