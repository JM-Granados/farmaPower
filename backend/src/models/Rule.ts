const mongoose = require('mongoose');
import {Schema, model} from 'mongoose';

const ruleSchema = new Schema({
    rule: { type: String, required: true, trim: true }
}, { timestamps: true });

export default model('Rule', ruleSchema);