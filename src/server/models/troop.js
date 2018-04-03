import mongoose, { Schema } from 'mongoose';

const troopSchema = new Schema({
  id: { type: Number, required: true },
  country: { type: String, required: true },
  loc: { type: Array, required: true },
  dest: { type: Array, required: true },
  size: { type: Number, required: true },
  // surroundingTroops: { type: Number, required: true },
  unitAD: { type: Number, required: true },
  unitHP: { type: Number, required: true },
  // fogR: { type: Number, required: true },
  // attackR: { type: Number, required: true },
});

const troopModel = mongoose.model('Troop', troopSchema);

export { troopModel };
