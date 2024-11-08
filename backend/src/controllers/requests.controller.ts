import { RequestHandler } from 'express';
import { cloudinary } from '../cloudinaryConfig';
import fs from 'fs';
import { Request, Response } from 'express';
import RequestModel from '../models/Request';
import ProgramModel from '../models/Program'
import mongoose from "mongoose";
import { MongoError } from 'mongodb';

export const getRequests: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const requests = await RequestModel.find({ client: new mongoose.Types.ObjectId(id) })
      .populate({
        path: 'medication',               
        populate: {
          path: 'medication',            
          model: 'Medication',            
          select: 'name',                 
        },
      })
      .exec();
      
    res.json(requests);
  } catch (error) {
    console.error("Error al obtener los requests:", error);
    res.status(500).json({ message: "Error al obtener los requests", error });
  }
};


export const createRequest: RequestHandler = async (req, res) => {
  try {
    let invoiceImageUrl = process.env.DEFAULT_INVOICE_IMAGE_URL;
    let principalImage = false;
    console.log("Datos recibidos:", req.body); 
    // Verifica si el archivo está en la solicitud
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'Requests-invoices',
        });
        invoiceImageUrl = result.secure_url;  // URL de la imagen en Cloudinary
        fs.unlinkSync(req.file.path);  // Elimina el archivo local después de subirlo
        principalImage = true;
      } catch (cloudError: unknown) {
        const error = cloudError as Error;
        console.error("Cloudinary error:", error.message);
        return res.status(500).json({ message: "Failed to upload image to Cloudinary.", error: error.message });
      }
    }

    // Crear un nuevo Request con los datos de la solicitud y la URL de la imagen
    const newRequest = new RequestModel({
      purchaseDate: req.body.purchaseDate,
      invoiceNumber: req.body.invoiceNumber,
      medication: req.body.medication,
      client: req.body.client,
      purchasedQuantity: req.body.purchasedQuantity,
      invoiceImage: invoiceImageUrl, // Guarda la URL de la imagen
      pharmacy: req.body.pharmacy,
      rStatus: req.body.rStatus || 'Pendiente', // Estado predeterminado
    });

    const savedRequest = await newRequest.save();

    const programId = req.body.program;
    const program = await ProgramModel.findById(programId);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    program.requests.push(savedRequest._id);
    await program.save();

    res.status(200).json({
      message: "Request created successfully",
      requestId: savedRequest._id,
      invoiceImageUrl, // Devuelve la URL de la imagen para referencia
    });
  } catch (error) {
    // Manejo de errores para la base de datos y otras excepciones
    const mongoError = error as MongoError;
    if (mongoError.code === 11000) {
      res.status(400).json({ message: "Request creation error: Duplicate entry." });
    } else if (error instanceof Error) {
      res.status(400).json({ message: "Request creation error:", error: error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};


export const getRequests_RStatus = async (req: Request, res: Response) => {
  try {
    const rStatus = req.body.rStatus;

    let query: { rStatus?: string } = {};
    if (rStatus) {
      query.rStatus = rStatus;
    }
    const requests = await RequestModel.find(query);

    res.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Error fetching requests" });
  }
};

export const getPointsByMedication: RequestHandler = async (req, res) => {
  try {
    const { clientId } = req.params;

    const results = await RequestModel.aggregate([
      {
        $match: {
          client: new mongoose.Types.ObjectId(clientId),
          rStatus: "Aprobada"
        },
      },
      {
        $lookup: {
          from: 'elegiblemedication',
          localField: 'medication',
          foreignField: '_id',
          as: 'medicationInfo'
        }
      },
      { $unwind: '$medicationInfo' },
      {
        $lookup: {
          from: 'medication',
          localField: 'medicationInfo.medication',
          foreignField: '_id',
          as: 'medicationDetails'
        }
      },
      { $unwind: '$medicationDetails' },
      {
        $lookup: {
          from: 'typemedication',
          localField: 'medicationDetails.type',
          foreignField: '_id',
          as: 'medicationType'
        }
      },
      { $unwind: '$medicationType' },
      {
        $addFields: {
          totalPoints: { $multiply: ['$purchasedQuantity', '$medicationInfo.points'] },
          originalPoints: '$medicationInfo.points'  // Calculate originalPoints
        }
      },
      {
        $group: {
          _id: {
            medicationId: '$medicationInfo._id',
            presentation: '$medicationType.typeMedication' // Correct field name
          },
          totalPoints: { $sum: '$totalPoints' },
          medicationName: { $first: '$medicationDetails.name' },
          exchangeAmount: { $first: '$medicationInfo.exchangeAmount' },
          originalPoints: { $first: '$originalPoints' }  // Include originalPoints in the group
        }
      },
      {
        $project: {
          _id: 0,
          medicationId: '$_id.medicationId',
          medicationName: '$medicationName',
          totalPoints: 1,
          exchangeAmount: 1,
          originalPoints: 1,  // Project originalPoints to the output
          presentation: '$_id.presentation' // Correctly reference presentation
        }
      }
    ]);

    res.json(results);
  } catch (error) {
    console.error('Error al recuperar puntos por medicación:', error);
    res.status(500).json({ message: 'Error al recuperar puntos por medicación' });
  }
};



// Obtener una solicitud por su _id
export const getRequestById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await RequestModel.findById(id)
      .populate({
        path: 'medication',
        populate: {
          path: 'medication', 
          model: 'Medication', 
        },
      }) //obtiene todo el objeto, no solo su id
      .populate('client') // con esto evitamos realizar varias consultas 
      .populate('pharmacy');

    res.json(request);
  } catch (error) {
    console.error("Error fetching request by ID:", error);
    res.status(500).json({ message: "Error fetching request" });
  }
};

// Obtener todas las solicitudes
export const getAllRequests: RequestHandler = async (req, res) => {
  try {
    const requests = await RequestModel.find()
      .populate({
        path: 'medication',
        populate: {
          path: 'medication', 
          model: 'Medication', 
        },
      })
      .populate('client')
      .populate('pharmacy');

    res.json(requests);
  } catch (error) {
    console.error("Error al obtener los requests:", error); 
    res.status(500).json({
      message: "Error al obtener los requests",
      error: error, 
    });
  }
}

// Actualizar estado
export const updateRStatus: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params; 
    const { rStatus } = req.body; 

    // Busca y actualiza el campo `rStatus` de la solicitud específica
    const updatedRequest = await RequestModel.findByIdAndUpdate(
      id,
      { rStatus },
      { new: true } // Para devolver el documento actualizado
    )
      .populate('medication')
      .populate('client')
      .populate('pharmacy');

    // Responde con la solicitud actualizada
    res.json(updatedRequest);
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ message: "Error updating request status" });
  }
};
