import { Router } from 'express';
import { recordAction, getActionHistory } from '../controllers/actionController';

const router = Router();

router.post('/', recordAction);
router.get('/', getActionHistory);

export default router;
