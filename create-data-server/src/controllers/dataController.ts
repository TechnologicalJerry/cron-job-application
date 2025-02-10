import { Request, Response } from 'express';
import Data from '../models/Data';

export const getData = async (req: Request, res: Response) => {
    try {
        const data = await Data.find().sort({ createdAt: -1 }).limit(10);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
};
