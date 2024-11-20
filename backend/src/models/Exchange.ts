import mongoose, { Schema, model } from 'mongoose';

const exchangeSchema = new Schema({
    exchangeNumber: { type: Number, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'ElegibleMedication', required: true },
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    pharmacy: { type: Schema.Types.ObjectId, ref: 'Pharmacy', required: true },
    requests: [{ type: Schema.Types.ObjectId, ref: 'Request', required: true }],
}, { timestamps: true });

export default model('Exchange', exchangeSchema, 'exchange');