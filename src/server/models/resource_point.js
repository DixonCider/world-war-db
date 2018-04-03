import mongoose, { Schema } from 'mongoose';

const resourcePointSchema = new Schema({
  id: { type: Number, required: true },
  loc: { type: Array, required: true },
  cost: {
    a: { type: Number, required: true },
    b: { type: Number, required: true },
    c: { type: Number, required: true },
    d: { type: Number, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    z: { type: Number, required: true },
  },
  range: { type: Number, required: true },
});

const resourcePointModel = mongoose.model('resourcePoint', resourcePointSchema);

export { resourcePointModel };
