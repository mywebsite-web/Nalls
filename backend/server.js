import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './src/routes/auth.js';
import playerRoutes from './src/routes/players.js';
import fixtureRoutes from './src/routes/fixtures.js';
import updateRoutes from './src/routes/updates.js';
import attendanceRoutes from './src/routes/attendance.js';
import lineupRoutes from './src/routes/lineup.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../')); // Serve the frontend files
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'index.html'));
  });
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/footballclub';
const PORT = process.env.PORT || 4000;

// Routes
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'School Football Club API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/fixtures', fixtureRoutes);
app.use('/api/updates', updateRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/lineup', lineupRoutes);

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

async function start() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/schoolDB");
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
  }
}

start();

