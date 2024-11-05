const mongoose = require('mongoose');
import {Schema, model} from 'mongoose';

const stateSchema = new Schema({
    state: { type: String, required: true, trim: true }
}, { timestamps: true });

export default model('State', stateSchema, 'state');