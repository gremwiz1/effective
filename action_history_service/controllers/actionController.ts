import { Request, Response } from 'express';
import ActionHistory from '../models/actionHistory';

export const recordAction = async (req: Request, res: Response) => {
  try {
    const action = await ActionHistory.create(req.body);
    res.status(201).json(action);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
