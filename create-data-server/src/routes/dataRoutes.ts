import express from 'express';
import { getData } from '../controllers/dataController';

const router = express.Router();

// GET route to fetch stored data
router.get('/data', getData);

export default router;
