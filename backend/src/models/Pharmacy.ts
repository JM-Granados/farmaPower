import {Schema, model} from 'mongoose';

const pharmacySchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  state: {type: Schema.Types.ObjectId, ref: 'State', required: true},
  localNumber: { type: Number, required: true },
}, { timestamps: true });

export default model('Pharmacy', pharmacySchema);