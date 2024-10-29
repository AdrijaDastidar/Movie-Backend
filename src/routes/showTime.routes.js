import express from 'express';
import { 
  getshowTime, 
  getshowTimeById, 
  createshowTime, 
  updateshowTime, 
  deleteshowTime 
} from '../controllers/ShowTime.controllers.js';

const router = express.Router();

router.get('/', getshowTime);
router.get('/:id', getshowTimeById);
router.post('/create', createshowTime);
router.put('/:id', updateshowTime);
router.delete('/:id', deleteshowTime);

export default router;
