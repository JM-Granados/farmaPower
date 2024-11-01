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


