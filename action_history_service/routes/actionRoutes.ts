import { Router } from 'express';
import { recordAction } from '../controllers/actionController';

const router = Router();
router.post('/', recordAction);

export default router;
