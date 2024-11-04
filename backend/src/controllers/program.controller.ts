import { RequestHandler } from 'express';
import ProgramModel from '../models/Program';

// Retrieve all programs
export const getPrograms: RequestHandler = async (req, res) => {
    try {
        const programs = await ProgramModel.find().populate('rule medications pharmacies');
        res.json(programs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching programs", error });
    }
};

// Create a new program
export const createProgram: RequestHandler = async (req, res) => {
    try {
        const newProgram = new ProgramModel(req.body);
        const savedProgram = await newProgram.save();
        res.json(savedProgram);
    } catch (error) {
        res.status(500).json({ message: "Error creating program", error });
    }
};

// Search programs based on the input text in the search bar
export const searchPrograms: RequestHandler = async (req, res) => {
    try {
        const { searchText } = req.query;

        // Find programs where the name starts with the search text
        const programs = await ProgramModel.find({
            name: new RegExp(`^${searchText}`, 'i')
        }).populate('rule medications pharmacies');

        res.json(programs);
    } catch (error) {
        console.error("Error searching programs:", error);
        res.status(500).json({ message: "Error searching programs" });
    }
};
