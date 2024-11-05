const mongoose = require('mongoose');
import { Schema, model } from 'mongoose';
const TypeMedication = require('./TypeMedication');

const medicationSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true },
  type: { type: Schema.Types.ObjectId, ref: 'TypeMedication' }, // Make sure this is the correct reference
  imageUrl: { type: String }
}, { timestamps: true });

export default model('Medication', medicationSchema, 'medication');
