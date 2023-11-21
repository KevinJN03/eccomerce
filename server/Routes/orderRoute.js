import express from 'express';
import { create_order } from '../Controllers/orderController.js';
const router = express.Router();

router.post('/create', create_order);
export default router;
