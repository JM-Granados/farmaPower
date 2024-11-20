const mongoose = require('mongoose');
import { Schema, model } from 'mongoose';
import ElegibleMedication from './ElegibleMedication';
import User from './User';
import Pharmacy from './Pharmacy';

const exchangeSchema = new Schema({
    exchangeNumber: { type: Number, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'ElegibleMedication', required: true },
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    pharmacy: { type: Schema.Types.ObjectId, ref: 'Pharmacy', required: true },
    requests: [{ type: Schema.Types.ObjectId, ref: 'Request', required: true }],
}, { timestamps: true });

export default model('Exchange', exchangeSchema, 'exchange');