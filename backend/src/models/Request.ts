const mongoose = require('mongoose');
import { Schema, model } from 'mongoose';
import ElegibleMedication from './ElegibleMedication';
import User from './User';
import Pharmacy from './Pharmacy';

const requestSchema = new Schema({
    purchaseDate: { type: Date, required: true },
    invoiceNumber: { type: Number, required: true },
    medication: { type: Schema.Types.ObjectId, ref: 'ElegibleMedication', required: true },
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    purchasedQuantity: { type: Number, required: true }, // quantityPurchased
    invoiceImage: { type: String, required: true },
    rStatus: { type: String, enum: ['Aprobada', 'Rechazada', 'Pendiente'], default: 'Pendiente'},
    pharmacy: { type: Schema.Types.ObjectId, ref: 'Pharmacy', required: true },
}, { timestamps: true });

export default model('Request', requestSchema, 'requests');