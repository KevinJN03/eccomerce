import express from 'express';
import { stripeTransactions } from '../Controllers/stripeController.js';

const router = express.Router();

router.post('/transactions', stripeTransactions);

export default router;
