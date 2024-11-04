const mongoose = require('mongoose');
import {Schema, model} from 'mongoose';
const TypeMedication = require('./TypeMedication'); 

const medicationSchema = new Schema({
  name: { type: String, required: true },
  type: { type: Schema.Types.ObjectId, ref: 'TypeMedication', required: true },
  amount: { type: String, required: true }
}, { timestamps: true });

export default model('Medication', medicationSchema, 'medication');

