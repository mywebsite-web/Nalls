import express from 'express';
import Fixture from '../models/Fixture.js';
import Player from '../models/Player.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all fixtures with populated player data
router.get('/', async (req, res) => {
  try {
    const fixtures = await Fixture.find({})
      .populate('lineup.slots.player', 'name number position')
      .populate('stats.scorers.player', 'name number')
      .populate('stats.assists.player', 'name number')
      .sort({ date: 1 });
    res.json(fixtures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single fixture by ID
router.get('/:id', async (req, res) => {
  try {
    const fixture = await Fixture.findById(req.params.id)
      .populate('lineup.slots.player', 'name number position')
      .populate('stats.scorers.player', 'name number')
      .populate('stats.assists.player', 'name number');
    if (!fixture) return res.status(404).json({ message: 'Fixture not found' });
    res.json(fixture);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new fixture
router.post('/', requireAuth, async (req, res) => {
  try {
    const fixture = new Fixture(req.body);
    const created = await fixture.save();
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update fixture
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { score, lineup, stats, ...update } = req.body;

    // If score is being updated, parse and update stats
    if (score) {
      const [home, away] = score.split('-').map(n => parseInt(n, 10));
      update.stats = {
        ...stats,
        homeScore: home || 0,
        awayScore: away || 0
      };
    }

    // Update the fixture in the database (example: MongoDB)
    const fixture = await Fixture.findByIdAndUpdate(req.params.id, update, { new: true });

    if (!fixture) {
      return res.status(404).json({ message: 'Fixture not found' });
    }

    res.status(200).json(fixture);

  } catch (error) {
    console.error('Error updating fixture:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.delete('/:id', requireAuth, async (req, res) => {
  const deleted = await Fixture.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;


