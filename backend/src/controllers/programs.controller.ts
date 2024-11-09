import { RequestHandler } from 'express';
import ProgramModel from '../models/Program';

export const getPrograms: RequestHandler = async (req, res) => {
  try {
    const programs = await ProgramModel.find()
      .populate({
        path: 'medications',
        populate: {
          path: 'medication',
          model: 'Medication',
        },
      })
      .populate('rule')
      .populate('requests')
      .populate('pharmacies');

    res.json(programs);
  } catch (error) {
    console.error("Error al obtener los programas:", error);
    res.status(500).json({
      message: "Error al obtener los programas",
      error: error,
    });
  }
};

export const updateProgram: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name, description, pharmacies } = req.body;

  try {
    const updatedProgram = await ProgramModel.findByIdAndUpdate(
      id, 
      { name, description, pharmacies },  
      { new: true }
    ).populate('pharmacies');

    if (!updatedProgram) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.json(updatedProgram);
  } catch (error) {
    console.error("Error updating program:", error);
    res.status(500).json({
      message: "Error updating the program",
      error: error,
    });
  }
};

export const searchPrograms: RequestHandler = async (req, res) => {
  const { name } = req.query; // Get the search query from the request

  try {
      const programs = await ProgramModel.find({ name: { $regex: name, $options: 'i' } }).populate('medications'); // Adjust populate fields based on your schema
      res.json(programs);
  } catch (error) {
      res.status(500).json({ message: "Error fetching programs", error });
  }
};