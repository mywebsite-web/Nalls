import express from 'express';
import Lineup from '../models/Lineup.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const doc = await Lineup.findOne({});
  if (!doc) return res.json({ formation: '4-3-3', slots: [] });
  res.json(doc);
});

router.post('/', requireAuth, async (req, res) => {
  const { formation, slots } = req.body || {};
  const existing = await Lineup.findOne({});
  if (existing) await existing.deleteOne();
  const created = await Lineup.create({ formation, slots, lastUpdated: new Date() });
  res.status(201).json(created);
});

router.put('/', requireAuth, async (req, res) => {
  const { formation, slots } = req.body || {};
  const updated = await Lineup.findOneAndUpdate({}, { formation, slots, lastUpdated: new Date() }, { upsert: true, new: true });
  res.json(updated);
});

export default router;


