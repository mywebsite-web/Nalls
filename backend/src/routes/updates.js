import express from 'express';
import Update from '../models/Update.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const updates = await Update.find({}).sort({ publishedAt: -1 });
  res.json(updates);
});

router.post('/', requireAuth, async (req, res) => {
  const created = await Update.create(req.body);
  res.status(201).json(created);
});

router.put('/:id', requireAuth, async (req, res) => {
  const updated = await Update.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const deleted = await Update.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;


