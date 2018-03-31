import mongoose, { Schema } from 'mongoose';

const countrySchema = new Schema({
  name: { type: String, required: true },
  money: { type: Number, required: true },
  enemyList: [{ type: String, required: true }],
  techTree: {
    atk: [{
      name: { type: String, required: true },
      multiplier: { type: Number, required: true },
      developed: { type: Boolean, required: true },
    }],
    hp: [{
      name: { type: String, required: true },
      multiplier: { type: Number, required: true },
      developed: { type: Boolean, required: true },
    }],
    money: [{
      name: { type: String, required: true },
      multiplier: { type: Number, required: true },
      developed: { type: Boolean, required: true },
    }],
  },
  multipliers: {
    atk: { type: Number, required: true },
    hp: { type: Number, required: true },
    money: { type: Number, required: true },
  },
});

const countryModel = mongoose.model('Country', countrySchema);

export { countryModel };
