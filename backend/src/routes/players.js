import express from 'express';
import Player from '../models/Player.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const players = await Player.find({}).sort({ isCoach: 1, number: 1 });
  res.json(players);
});

router.get('/:id', async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (!player) return res.status(404).json({ message: 'Not found' });
  res.json(player);
});

router.post('/', requireAuth, async (req, res) => {
  const player = await Player.create(req.body);
  res.status(201).json(player);
});

router.put('/:id', requireAuth, async (req, res) => {
  const updated = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const deleted = await Player.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;


