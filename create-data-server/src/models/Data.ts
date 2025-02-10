import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const Data = mongoose.model('Data', DataSchema);
export default Data;
