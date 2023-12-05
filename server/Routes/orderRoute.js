import express from 'express';
import {
  createPaymentIntent,
  create_order,
  getOrderDetails,
} from '../Controllers/orderController.js';
const router = express.Router();

router.post('/create', create_order);
router.post('/create-payment-intent', createPaymentIntent);
router.get('/:id', getOrderDetails);
export default router;
