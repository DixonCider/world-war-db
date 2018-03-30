import mongoose, { Schema } from 'mongoose';

const blockSchema = new Schema({
  name: { type: String, required: true },
  memberList: [{ type: String, required: true }],
});

const blockModel = mongoose.model('Block', blockSchema);

export { blockModel };
