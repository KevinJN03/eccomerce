import express from 'express';
import { monthlyStatement, stripeTransactions } from '../Controllers/stripeController.js';

const router = express.Router();

router.post('/transactions', stripeTransactions);
router.post('/monthly-statement', monthlyStatement);

export default router;
