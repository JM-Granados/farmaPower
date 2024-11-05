import { RequestHandler } from 'express';
import PharmacyModel from '../models/Pharmacy';
import StateModel from '../models/State';

export const createPharmacy: RequestHandler = async (req, res) => {
    try {
        const { name, location, localNumber, stateId } = req.body;

        const newPharmacy = new PharmacyModel({
            name,
            location,
            localNumber,
            state: stateId
        });

        await newPharmacy.save();

        res.status(201).json({
            message: 'Pharmacy created successfully',
            pharmacy: newPharmacy
        });
    } catch (error) {
        console.error('Error creating pharmacy:', error);
        res.status(500).json({ message: 'Failed to create pharmacy', error });
    }
};

export const getPharmacies: RequestHandler = async (req, res) => {
    try {
        const pharmacies = await PharmacyModel.find()
            .populate('state')
            .sort({ name: 1 }); // Sort in ascending order by name
        res.json(pharmacies);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pharmacies", error });
    }
}


export const getStates: RequestHandler = async (req, res) => {
    try {
        const states = await StateModel.find();
        res.json(states);
    } catch (error) {
        res.status(500).json({ message: "Error fetching states", error });
    }
}

export const updatePharmacy: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPharmacy = await PharmacyModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedPharmacy);
    } catch (error) {
        res.status(500).json({ message: "Error updating pharmacy", error });
    }
}

export const deletePharmacy: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        await PharmacyModel.findByIdAndDelete(id);
        res.json({ message: "Pharmacy deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting pharmacy", error });
    }
}

export const searchPharmacies: RequestHandler = async (req, res) => {
    const { name } = req.query; // Get the search query from the request

    try {
        const pharmacies = await PharmacyModel.find({ name: { $regex: name, $options: 'i' } }).populate('state');
        res.json(pharmacies);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pharmacies", error });
    }
};
