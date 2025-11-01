import express from 'express';
import Attendance from '../models/Attendance.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/:playerId', async (req, res) => {
  const records = await Attendance.find({ player: req.params.playerId }).sort({ date: -1 });
  res.json(records);
});

router.post('/', requireAuth, async (req, res) => {
  const created = await Attendance.create(req.body);
  res.status(201).json(created);
});

router.put('/:id', requireAuth, async (req, res) => {
  const updated = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const deleted = await Attendance.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;


