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