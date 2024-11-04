const mongoose = require('mongoose');
import {Schema, model} from 'mongoose';

const typeMedicationSchema = new Schema({
    typeMedication: { type: String, required: true, trim: true }
}, { timestamps: true });

export default model('TypeMedication', typeMedicationSchema, 'typemedication');