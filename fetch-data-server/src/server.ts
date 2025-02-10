import express from 'express';
import mongoose from 'mongoose';
import cron from 'node-cron';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// Define Mongoose Schema
const TaskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Ensure MongoDB uses provided _id
  name: String,
  email: String,
  message: String,
  receivedAt: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', TaskSchema);

// Define the expected shape of the data from the API
interface TaskData {
  id: string;
  name: string;
  email: string;
  message: string;
}

// **Cron job to fetch data every 5 seconds**
cron.schedule('*/5 * * * * *', async () => {
  console.log('Fetching data from localhost:5050/data...');

  try {
    // Fetch data from API
    const response = await axios.get('http://localhost:5050/api/data');

    // Type assertion to tell TypeScript that we expect the response to match TaskData
    const newData = response.data as TaskData;

    // Check if data already exists
    const existingData = await Task.findOne({ _id: newData.id });

    if (existingData) {
      console.log('Data is up to date. No new entry added.');
    } else {
      // Insert new data into database
      await Task.create({
        _id: new mongoose.Types.ObjectId(newData.id), // Use provided _id
        name: newData.name,
        email: newData.email,
        message: newData.message,
      });

      console.log('✅ Data added successfully:');
    }
  } catch (error: any) {
    console.error('Error fetching or inserting data:', error.message);
  }
});

// Basic Route
app.get('/', (req, res) => {
  res.send('Cron Job Service Running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
