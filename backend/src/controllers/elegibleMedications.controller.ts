import { RequestHandler } from 'express';
import { Request, Response } from 'express';
import ElegibleMedicationModel from '../models/ElegibleMedication';
import MedicationModel from '../models/Medication';
import mongoose from "mongoose";

export const getElegibleMedications: RequestHandler = async (req, res) => {
    try {
        const elegibleMedications = await ElegibleMedicationModel.find().populate('medication');
        res.json(elegibleMedications);
    } catch (error) {
        res.json(error);
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

export const getMedicationsSearched: RequestHandler = async (req, res) => {
    try {
        // Obtiene el término de búsqueda del query string y asegura que sea un string
        const search = typeof req.query.search === 'string' ? req.query.search : '';

        // Asegúrate de que search no es solo espacios en blanco o vacío
        if (!search.trim()) {
            return res.status(400).json({ message: "Search query cannot be empty." });
        }

        // Buscar medicamentos que coincidan con el nombre en la colección `Medication`
        const medications = await MedicationModel.find({
            name: { $regex: `^${search}`, $options: 'i' } // Usando regex para búsqueda insensible a mayúsculas/minúsculas
        });

        if (medications.length === 0) {
            return res.status(404).json({ message: "No medications found matching your search." });
        }

        // Buscar en la colección `ElegibleMedication` aquellos medicamentos encontrados
        const elegibleMedications = await ElegibleMedicationModel.find({
            medication: { $in: medications.map(med => med._id) } // Buscar los medicamentos en `ElegibleMedication` usando los IDs encontrados
        }).populate('medication', 'name'); // Poblamos el campo `medication` con el nombre del medicamento

        // Devolver los resultados encontrados
        res.status(200).json(elegibleMedications);
    } catch (error) {
        // Manejar posibles errores de la base de datos
        if (error instanceof Error) {
            res.status(500).json({ message: "Error retrieving medications: ", error: error.message });
        } else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
};