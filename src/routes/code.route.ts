import { Router } from 'express';
import { compareCode, createCode, getCodes } from '../controllers/code.controllers';

const router = Router();

router.post('/compare-code', compareCode);
router.post('/add-code', createCode);
router.get('/code', getCodes);

export default router;
