import express from 'express';
import { create_order } from '../Controllers/orderController.js';
const router = express.Router();

export default router;

router.post('/create', create_order);
