import { RequestHandler } from 'express';
import ExchangeModel from '../models/Exchange';
import mongoose from "mongoose";

export const getExchanges: RequestHandler = async (req, res) => {
    try {
        const exchanges = await ExchangeModel.find()
            .populate('product')  
            .populate('client')   
            .populate('pharmacy') 
            .populate('requests'); 
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

        // Crear el nuevo canje
        const newExchange = await ExchangeModel.create({
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