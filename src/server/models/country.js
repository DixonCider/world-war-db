import mongoose, { Schema } from 'mongoose';

const countrySchema = new Schema({
  name: { type: String, required: true },
  capital: [{ type: Number, required: true }, { type: Number, required: true }],
  // capital: { type: Array, required: true },
  money: { type: Number, required: true },
  income: { type: Number, required: true },
  troop: {
    fogR: { type: Number, required: true },
    attackR: { type: Number, required: true },
  },
  troopCost: { type: Number, required: true },
  resource: {
    a: { type: Number, required: true },
    b: { type: Number, required: true },
    c: { type: Number, required: true },
    d: { type: Number, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    z: { type: Number, required: true },
  },
  enemyList: [{ type: String, required: true }],
  techTree: {
    atk: [{
      name: { type: String, required: true },
      effect: { type: Number, required: true },
      developed: { type: Boolean, required: true },
      cost: {
        a: { type: Number, required: true },
        b: { type: Number, required: true },
        c: { type: Number, required: true },
        d: { type: Number, required: true },
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        z: { type: Number, required: true },
      },
    }],
    hp: [{
      name: { type: String, required: true },
      effect: { type: Number, required: true },
      developed: { type: Boolean, required: true },
      cost: {
        a: { type: Number, required: true },
        b: { type: Number, required: true },
        c: { type: Number, required: true },
        d: { type: Number, required: true },
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        z: { type: Number, required: true },
      },
    }],
    money: [{
      name: { type: String, required: true },
      effect: { type: Number, required: true },
      developed: { type: Boolean, required: true },
      cost: {
        a: { type: Number, required: true },
        b: { type: Number, required: true },
        c: { type: Number, required: true },
        d: { type: Number, required: true },
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        z: { type: Number, required: true },
      },
    }],
    nuclear: {
      name: { type: String, required: true },
      effect: { type: Number, required: true },
      developed: { type: Boolean, required: true },
      cost: {
        a: { type: Number, required: true },
        b: { type: Number, required: true },
        c: { type: Number, required: true },
        d: { type: Number, required: true },
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        z: { type: Number, required: true },
      },
    },
  },
  multipliers: {
    atk: { type: Number, required: true },
    hp: { type: Number, required: true },
    money: { type: Number, required: true },
  },
  nuclear: { type: Boolean, required: true },
});

const countryModel = mongoose.model('Country', countrySchema);

export { countryModel };
