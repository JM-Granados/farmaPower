import { RequestHandler } from 'express';
import { Request, Response } from 'express';
import ElegibleMedicationModel from '../models/ElegibleMedication';
import { ElegibleMedicationFactory } from '../factories/ElegibleMedicationFactory';
import MedicationModel from '../models/Medication';
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

        // Primero encuentra los IDs de Medication que coinciden con el nombre
        const medications = await MedicationModel.find({
            name: { $regex: name, $options: 'i' }
        }).select('_id');

        // Convierte los resultados en un array de IDs
        const medicationIds = medications.map(med => med._id);

        // Ahora encuentra los ElegibleMedication que tienen un medication ID que coincide con los encontrados
        const elegibleMedications = await ElegibleMedicationModel.find({
            medication: { $in: medicationIds }
        }).populate({
            path: 'medication',
            populate: { path: 'type', model: 'TypeMedication' }
        });

        res.json(elegibleMedications);
    } catch (error) {
        console.error("Error searching medications:", error);
        res.status(500).json({ message: "Error searching medications", error });
    }
};




// Create a new eligible medication
export const createElegibleMedication: RequestHandler = async (req, res) => {
    const { medication, type, points, exchangeAmount } = req.body;

    if (!medication || !type || !exchangeAmount || (type === 'points' && !points)) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Create eligible medication instance using the factory
        const elegibleMedicationInstance = ElegibleMedicationFactory.createElegibleMedication(type, {
            medication,
            points,
            exchangeAmount,
        });

        // Use the instance details to create a new MongoDB document
        const newMedication = new ElegibleMedicationModel(elegibleMedicationInstance.getDetails());
        const savedMedication = await newMedication.save();
        
        res.status(201).json(savedMedication);
    } catch (error) {
        console.error("Error creating eligible medication:", error);
        res.status(500).json({ message: "Error creating eligible medication", error });
    }
};

export const updateElegibleMedication: RequestHandler = async (req, res) => {
    const { id } = req.params; // Get the ID from the URL parameters
    const { points, exchangeAmount } = req.body;

    console.log("Request Params:", req.params);
    console.log("Request Body:", req.body);

    // Check for required fields
    if (points === undefined || exchangeAmount === undefined) {
        return res.status(400).json({ message: "Both points and exchange amount are required" });
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
            { points, exchangeAmount }, // Only update points and exchangeAmount
            { new: true } // Return the updated document
        );

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
