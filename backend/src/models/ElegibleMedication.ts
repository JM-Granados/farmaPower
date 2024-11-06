const mongoose = require('mongoose');
import {Schema, model} from 'mongoose';
const Medication = require('./Medication'); 

const elegibleMedicationSchema = new Schema({
  medication: { type: Schema.Types.ObjectId, ref: 'Medication', required: true },
  points: { type: Number, required: true },
  exchangeAmount: { type: Number, required: true }
}, { timestamps: true });

export default model('ElegibleMedication', elegibleMedicationSchema, 'elegiblemedication');