import mongoose from 'mongoose';

const SlotSchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  role: { type: String, required: true },
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }
}, { _id: false });

const LineupSchema = new mongoose.Schema({
  formation: { type: String, default: '4-3-3' },
  slots: { type: [SlotSchema], default: [] },
  lastUpdated: { type: Date, default: () => new Date() }
}, { timestamps: true });

export default mongoose.model('Lineup', LineupSchema);


