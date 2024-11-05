import { RequestHandler } from 'express';
import { Request, Response } from 'express';
import ElegibleMedicationModel from '../models/ElegibleMedication';
import mongoose from "mongoose";

export const getElegibleMedications: RequestHandler = async (req, res) => {
    try {
        const elegibleMedications = await ElegibleMedicationModel.find().populate({ path: 'medication', populate: { path: 'type', } });
        res.json(elegibleMedications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching eligible medications", error });
    }
}

export const searchElegibleMedications: RequestHandler = async (req, res) => {
    try {
        const { name } = req.query;

        const medications = await ElegibleMedicationModel.find({
            medication: { $exists: true },
            'medication.name': { $regex: name, $options: 'i' }
        }).populate({
            path: 'medication',
            populate: { path: 'type', model: 'TypeMedication' }
        });

        res.json(medications);
    } catch (error) {
        console.error("Error searching medications:", error);
        res.status(500).json({ message: "Error searching medications", error });
    }
};


// Create a new eligible medication
export const createElegibleMedication: RequestHandler = async (req, res) => {
    const { medication, points, exchangeAmount } = req.body;

    if (!medication || !points || !exchangeAmount) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newMedication = new ElegibleMedicationModel({ medication, points, exchangeAmount });
        const savedMedication = await newMedication.save();
        res.status(201).json(savedMedication);
    } catch (error) {
        res.status(500).json({ message: "Error creating eligible medication", error });
    }
};

export const updateElegibleMedication: RequestHandler = async (req, res) => {
    const { id } = req.params; // Get the ID from the URL parameters
    const { medication, points, exchangeAmount } = req.body;

    // Log incoming request data for debugging
    console.log("Request Params:", req.params);
    console.log("Request Body:", req.body);

    // Check for required fields
    if (!medication || points === undefined || exchangeAmount === undefined) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if the medication exists before updating
        const existingMedication = await ElegibleMedicationModel.findById(id);
        if (!existingMedication) {
            return res.status(404).json({ message: "Eligible medication not found" });
        }

        // Attempt to update the eligible medication
        const updatedMedication = await ElegibleMedicationModel.findByIdAndUpdate(
            id,
            { medication, points, exchangeAmount },
            { new: true } // Return the updated document
        );

        // Check if the update was successful
        if (!updatedMedication) {
            return res.status(500).json({ message: "Failed to update eligible medication" });
        }

        res.json({ message: "Eligible medication updated successfully", updatedMedication });
    } catch (error) {
        console.error("Error updating eligible medication:", error);
        res.status(500).json({ message: "Error updating eligible medication", error });
    }
};


export const deleteElegibleMedication: RequestHandler = async (req, res) => {
    const { id } = req.params; // Get the ID from the URL parameters
    console.log("Deleting eligible medication with ID:", id); // Log the incoming ID

    try {
        await ElegibleMedicationModel.findByIdAndDelete(id);
        res.json({ message: "Eligible medication deleted successfully" }); // Success response
    } catch (error) {
        console.error("Error deleting eligible medication:", error); // Log the error
        res.status(500).json({ message: "Error deleting eligible medication", error }); // Error response
    }
};
