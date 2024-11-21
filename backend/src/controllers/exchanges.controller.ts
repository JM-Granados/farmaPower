import { RequestHandler } from 'express';
import ExchangeModel from '../models/Exchange';
import CounterModel from '../models/Counter';
import RequestModel from '../models/Request';
import mongoose from "mongoose";

//A este método le falta ordenar los canjes
export const getExchanges: RequestHandler = async (req, res) => {
    try {
        const exchanges = await ExchangeModel.find()
            .populate('client')   
            .populate('pharmacy') 
            .populate('requests')
            .populate({
                path: 'product', 
                populate: {
                    path: 'medication',            
                    model: 'Medication',            
                    select: 'name',
                }
            });
        res.json(exchanges);
    } catch (error) {
        res.json(error);
    }
}

// Crear un nuevo canje
export const createExchange: RequestHandler = async (req, res) => {
    try {
        const { product, client, pharmacy, requests } = req.body;

        if (!product || !client || !pharmacy || !requests) {
            return res.status(400).json({ message: 'Missing required field' });
        }
        
        const counter = await CounterModel.findOneAndUpdate(
            { sequenceName: 'exchangeNumber' },
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );

        // Crear el nuevo canje
        const newExchange = await ExchangeModel.create({
            exchangeNumber: counter.sequenceValue,
            product: product, // _id del producto canjeado
            client: client, // _id del cliente a quien se le da el canje
            pharmacy: pharmacy, //_id de la pharmacia en la que se realiza el canje (usuario farmacia actual)
            requests: requests, //esto debe ser un [] con los _ids de las requests que respaldan el canje
        });

        res.status(201).json({ message: 'Exchange created successfully', exchange: newExchange });
    } catch (error) {
        res.status(500).json({ message: 'Error creating exchange', error });
    }
};

//obtener todos los puntos de un cliente para la ventana de exchanges
export const getPoints: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try{
        // Obtener puntos acumulados
        const totalPointsResult = await RequestModel.aggregate([
            { $match: { client: new mongoose.Types.ObjectId(id), rStatus: 'Aprobada' } }, //buscamos las solicitudes aprobadas del cliente
            {
                $lookup: { // Esto es como hacer un join entre requests y elegible medication
                from: 'elegiblemedication', // Collection que vamos a unir
                localField: 'medication', // Campo de requests a unir
                foreignField: '_id', // Campo de elegibleMedication a unir
                as: 'medicationInfo', // Nombre del array de salida de la unión
                },
            },
            { $unwind: '$medicationInfo' }, //convierte el array en documentos individuales en caso de que hayan varios campos
            {
                $addFields: {
                  totalPoints: { $multiply: ['$purchasedQuantity', '$medicationInfo.points'] },
                }
            },
            {
                $group: {
                    _id: {
                       clientID: '$client',
                    },
                    totalPoints: { $sum: '$totalPoints' }
                },
            },
        ]);
        const totalPoints = totalPointsResult[0]?.totalPoints || 0;

        // Obtener puntos usados en canjes
        const usedPointsResult = await ExchangeModel.aggregate([
            { $match: { client: new mongoose.Types.ObjectId(id) } }, //buscamos los exchanges del cliente
            {
                $lookup: { // Join
                from: 'elegiblemedication', // Collection que vamos a unir
                localField: 'product', // Campos a unir
                foreignField: '_id',
                as: 'productInfo', //Nombre de la unión
                },
            },
            { $unwind: '$productInfo' }, //convierte el array en documentos individuales
            {
                $group: {
                    _id: {
                        clientID: '$client',
                    },
                    totalUsedPoints: {
                        $sum: {$sum: '$productInfo.exchangeAmount'}, //Obtenemos la cantidad canjeada
                    },
                },
            },
        ]);
        const usedPoints = usedPointsResult[0]?.totalUsedPoints || 0;

        // Calcular puntos disponibles
        const availablePoints = totalPoints - usedPoints; //diferencia ente acumulados y utilizados

        // Enviar respuesta
        res.json({
            totalPoints,
            usedPoints,
            availablePoints,
        });
    } catch (error) {
        console.error('Error al obtener puntos del cliente:', error);
        res.status(500).json({ message: 'Error al obtener puntos del cliente' });
    }
}