const mongoose = require('mongoose');
import {Schema, model} from 'mongoose';
const ElegibleMedication = require('./ElegibleMedication'); 
const Rule = require('./Rule');
const Request = require('./Request');
const Pharmacy = require('./Pharmacy');

const programSchema = new Schema({
  medications: { medications: Schema.Types.ObjectId, ref: 'ElegibleMedication', required: true },
  name: { type: String, required: true },
  rule: { type: Schema.Types.ObjectId, ref: 'Rule', required: true },
  requests: [{type: Schema.Types.ObjectId, ref: 'Request'}],  
  description: { type: String, required: true },
  pharmacies: [{type: Schema.Types.ObjectId, ref: 'Pharmacy', required: true}], 

}, { timestamps: true });

export default model('Program', programSchema);