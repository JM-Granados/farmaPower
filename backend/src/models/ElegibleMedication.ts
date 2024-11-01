const mongoose = require('mongoose');
import {Schema, model} from 'mongoose';
const Medication = require('./Medication'); 

const elegibleMedicationSchema = new Schema({
  points: { type: Number, required: true },  //Por que en loa puntos  estan como string?
  exchangeAmount: { type: Number, required: true },
  medication: { type: Schema.Types.ObjectId, ref: 'Medication', required: true }
}, { timestamps: true });

export default model('ElegibleMedication', elegibleMedicationSchema);