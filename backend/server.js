import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import authRoutes from './src/routes/auth.js';
import playerRoutes from './src/routes/players.js';
import fixtureRoutes from './src/routes/fixtures.js';
import updateRoutes from './src/routes/updates.js';
import attendanceRoutes from './src/routes/attendance.js';
import lineupRoutes from './src/routes/lineup.js';

// ===== Setup =====
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// ===== Serve Frontend in Production =====
if (process.env.NODE_ENV === 'production') {
  // Since index.html is in the root folder
  const frontendPath = path.join(__dirname, '../');
  app.use(express.static(frontendPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// ===== Environment Variables =====
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/footballclub';
const PORT = process.env.PORT || 4000;

// ===== Routes =====
app.get('/api', (req, res) => {
  res.json({ status: 'ok', service: 'School Football Club API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/fixtures', fixtureRoutes);
app.use('/api/updates', updateRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/lineup', lineupRoutes);

// ===== Global Error Handler =====
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

// ===== Start Server =====
async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

start();
