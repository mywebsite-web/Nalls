import mongoose from 'mongoose';

const StatsSchema = new mongoose.Schema({
  goals: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  appearances: { type: Number, default: 0 },
  yellowCards: { type: Number, default: 0 },
  redCards: { type: Number, default: 0 }
}, { _id: false });

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  position: { type: String, enum: ['GK', 'DF', 'MF', 'FW'], required: true },
  photoUrl: { type: String },
  isCoach: { type: Boolean, default: false },
  stats: { type: StatsSchema, default: () => ({}) }
}, { timestamps: true });

export default mongoose.model('Player', PlayerSchema);


