import { RequestHandler } from 'express';
import ProgramModel from '../models/Program';

export const getPrograms: RequestHandler = async (req, res) => {
    try {
        const programs = await ProgramModel.find();
        res.json(programs);
    } catch (error) {
        res.json(error);
    }
}