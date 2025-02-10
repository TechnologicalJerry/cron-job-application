import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import dataRoutes from './routes/dataRoutes';
import './jobs/dataCron'; // Import the cron job

dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use('/api', dataRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
