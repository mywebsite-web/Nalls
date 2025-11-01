import express from 'express';
import jwt from 'jsonwebtoken';
import Player from '../models/Player.js';

const router = express.Router();

router.post('/login', (req, res) => {
  const { password } = req.body || {};
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
  res.json({ token });
});

// Seed sample data (20 players + 1 coach). Protected by admin password in payload
router.post('/seed', async (req, res) => {
  const { password } = req.body || {};
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ message: 'Invalid credentials' });
  try {
    await Player.deleteMany({});
    const positions = ['GK', 'DF', 'DF', 'DF', 'DF', 'MF', 'MF', 'MF', 'FW', 'FW', 'FW'];
    const players = [];
    for (let i = 1; i <= 20; i++) {
      players.push({
        name: `Player ${i}`,
        number: i,
        position: positions[i % positions.length],
        photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=player${i}`,
        stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 }
      });
    }
    players.push({
      name: 'Coach',
      number: 99,
      position: 'MF',
      isCoach: true,
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=coach'
    });
    await Player.insertMany(players);
    res.json({ message: 'Seeded players and coach' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Seeding failed' });
  }
});

export default router;


