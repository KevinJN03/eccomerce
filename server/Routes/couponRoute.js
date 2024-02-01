import express from 'express';
import {
  create_coupon,
  get_all_coupons,
  get_single_coupon,
  delete_single_coupon,
} from '../Controllers/couponController.js';
const router = express.Router();
router.get('/', get_single_coupon);
router.delete('/delete/:id', delete_single_coupon);
// router.get('/all', get_all_coupons);

router.post('/create', create_coupon);

export default router;
