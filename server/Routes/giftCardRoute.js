import {
  create_giftCard,
  get_all_giftCard,
  get_single_giftCard,
  delete_all,
  delete_single,
} from '../Controllers/giftCardController.js';
import express from 'express';

const router = express.Router();

router.get('/', get_single_giftCard);
router.post('/create', create_giftCard);
router.get('/all', get_all_giftCard);
router.delete('/delete/all', delete_all);
router.delete('/delete/:id', delete_single);

export default router;
