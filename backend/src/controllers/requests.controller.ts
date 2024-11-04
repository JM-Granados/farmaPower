import { RequestHandler } from 'express';
import { Request, Response } from 'express';
import RequestModel from '../models/Request';
import mongoose from "mongoose";

export const getRequests: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const requests = await RequestModel.find({ client: new mongoose.Types.ObjectId(id) }).populate("medication").populate("medication").exec();
    res.json(requests);
  } catch (error) {
    console.error("Error al obtener los requests:", error);
    res.status(500).json({ message: "Error al obtener los requests", error });
  }
};


export const createRequest: RequestHandler = async (req, res) => {
  try {
    const newRequest = new RequestModel(req.body);
    const savedRequest = await newRequest.save();
    res.json(savedRequest);
  } catch (error) {
    res.json(error);
  }
}

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



// Define una función asincrónica de manejador de solicitudes llamada getPointsByMedication
export const getPointsByMedication: RequestHandler = async (req, res) => {
  try {
    // Extrae clientId de los parámetros de la solicitud
    const { clientId } = req.params;

    // Realiza una agregación en la colección RequestModel
    const results = await RequestModel.aggregate([
      // Coincide documentos donde el campo client coincide con el clientId proporcionado
      {
        $match: {
          client: new mongoose.Types.ObjectId(clientId),
          rStatus: "Aprobada" // Filtra solo las solicitudes aprobadas
        },

      },

      // Realiza una búsqueda para unirse con la colección elegiblemedication
      {
        $lookup: {
          from: 'elegiblemedication',
          localField: 'medication',
          foreignField: '_id',
          as: 'medicationInfo'
        }
      },
      // Descompone el array medicationInfo
      { $unwind: '$medicationInfo' },

      // Realiza una búsqueda para unirse con la colección medication
      {
        $lookup: {
          from: 'medication',
          localField: 'medicationInfo.medication',
          foreignField: '_id',
          as: 'medicationDetails'
        }
      },
      // Descompone el array medicationDetails
      { $unwind: '$medicationDetails' },

      // Añade un nuevo campo totalPoints multiplicando purchasedQuantity y medicationInfo.points
      {
        $addFields: {
          totalPoints: { $multiply: ['$purchasedQuantity', '$medicationInfo.points'] },
          originalPoints: '$medicationInfo.points'

        }
      },

      // Agrupa los resultados por medicationInfo._id y calcula totalPoints, medicationName y exchangeAmount
      {
        $group: {
          _id: '$medicationInfo._id',
          totalPoints: { $sum: '$totalPoints' },
          medicationName: { $first: '$medicationDetails.name' },
          exchangeAmount: { $first: '$medicationInfo.exchangeAmount' }
        }
      },

      // Proyecta los campos de salida finales
      {
        $project: {
          _id: 0,
          medicationId: '$_id',
          medicationName: '$medicationName',
          totalPoints: 1,
          exchangeAmount: 1
        }
      }
    ]);

    // Envía los resultados como una respuesta JSON
    res.json(results);
  } catch (error) {
    // Registra el error y envía un estado 500 con un mensaje de error
    console.error('Error al recuperar puntos por medicación:', error);
    res.status(500).json({ message: 'Error al recuperar puntos por medicación' });
  }
};

// Obtener una solicitud por su _id
export const getRequestById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await RequestModel.findById(id)
      .populate('medication') //obtiene todo el objeto, no solo su id
      .populate('client') // con esto evitamos realizar varias consultas 
      .populate('pharmacy');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(request);
  } catch (error) {
    console.error("Error fetching request by ID:", error);
    res.status(500).json({ message: "Error fetching request" });
  }
};