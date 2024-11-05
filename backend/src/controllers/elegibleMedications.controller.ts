import { RequestHandler } from 'express';
import { Request, Response } from 'express';
import ElegibleMedicationModel from '../models/ElegibleMedication';
import mongoose from "mongoose";

export const getElegibleMedications: RequestHandler = async (req, res) => {
    try {
        const elegibleMedications = await ElegibleMedicationModel.find().populate({path: 'medication',populate: {path: 'type', }});
        res.json(elegibleMedications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching eligible medications", error });
    }
}

export const searchElegibleMedications: RequestHandler = async (req, res) => {
    try {
        const { name } = req.query;
        const medications = await ElegibleMedicationModel.find({'medication.name': { $regex: name, $options: 'i' }}).populate({path: 'medication',populate: {path: 'type',model: 'TypeMedication'}});
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


