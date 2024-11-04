const mongoose = require('mongoose');
import {Schema, model} from 'mongoose';
const State = require('./State');

const pharmacySchema = new Schema({
  name: { type: String, required: true },
  lacation: { type: String, required: true },
  localNumber: { type: Number, required: true },
  state: {type: Schema.Types.ObjectId, ref: 'State', required: true},  
}, { timestamps: true });

export default model('Pharmacy', pharmacySchema, 'pharmacy');
