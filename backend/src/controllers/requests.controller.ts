import { RequestHandler } from 'express';
import RequestModel from '../models/Request';
import mongoose from "mongoose";

export const getRequests: RequestHandler = async (req, res) => {
    try {
        const requests = await RequestModel.find();
        res.json(requests);
    } catch (error) {
        res.json(error);
    }
}

export const createRequest: RequestHandler = async (req, res) => {
    try {
        const newRequest = new RequestModel(req.body);
        const savedRequest = await newRequest.save();
        res.json(savedRequest);
    } catch (error) {
        res.json(error);
    }
}

import { Request, Response } from 'express';

export const getRequests_RStatus = async (req: Request, res: Response) => {
    try {
        const rStatus  = req.body.rStatus; 
        
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


