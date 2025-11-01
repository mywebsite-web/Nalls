import mongoose from 'mongoose';

const UpdateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  publishedAt: { type: Date, default: () => new Date() }
}, { timestamps: true });

export default mongoose.model('Update', UpdateSchema);


