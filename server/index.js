import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cropRoutes from './routes/cropRoutes.js';
import fertilizerRoutes from './routes/fertilizerRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import ruleRoutes from './routes/ruleRoutes.js';

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/fertilizers', fertilizerRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rules', ruleRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Agro.io API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
