import cron from 'node-cron';
import { v4 as uuidv4 } from 'uuid';
import Data from '../models/Data';

const generateRandomData = () => ({
  id: uuidv4(),
  name: `User_${Math.floor(Math.random() * 1000)}`,
  email: `user${Math.floor(Math.random() * 1000)}@example.com`,
  message: 'This is a generated message',
});

// Schedule a cron job to run every 30 seconds
cron.schedule('*/30 * * * * *', async () => {
  console.log('Generating new data...');
  const newData = new Data(generateRandomData());
  await newData.save();
  console.log('Data saved:', newData.id);
});
