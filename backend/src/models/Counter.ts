import mongoose, { Schema, model } from 'mongoose';

const counterSchema = new Schema({
    sequenceName: { type: String, required: true },
    sequenceValue: { type: Number, required: true },
});

export default model('Counter', counterSchema, 'counter');