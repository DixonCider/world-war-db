import mongoose, { Schema } from 'mongoose';

const testASchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
});

const testA = mongoose.model('testa', testASchema);

export default {
  testA,
};
