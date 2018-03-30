import mongoose, { Schema } from 'mongoose';

const countrySchema = new Schema({
  name: { type: String, required: true },
  money: { type: Number, required: true },
  enemyList: [{ type: String, required: true }],
});

const countryModel = mongoose.model('Country', countrySchema);

export { countryModel };
