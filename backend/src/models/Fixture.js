import mongoose from 'mongoose';

const FixtureSchema = new mongoose.Schema({
  opponent: { type: String, required: true },
  home: { type: Boolean, default: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['upcoming', 'completed'], default: 'upcoming' },
  score: { type: String },
  venue: { type: String },
  lineup: {
    formation: { type: String, default: '4-3-3' },
    slots: [{
      x: Number,
      y: Number,
      role: { type: String, enum: ['GK', 'DF', 'MF', 'FW'] },
      player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }
    }]
  },
  stats: {
    homeScore: { type: Number, default: 0 },
    awayScore: { type: Number, default: 0 },
    scorers: [{
      player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
      minute: Number,
      type: { type: String, enum: ['goal', 'own-goal'], default: 'goal' }
    }],
    assists: [{
      player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
      minute: Number
    }]
  }
}, { timestamps: true });

export default mongoose.model('Fixture', FixtureSchema);


