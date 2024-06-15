import express from 'express';
import {
  generateCsv,
  monthlyStatement,
  stripeTransactions,
} from '../Controllers/stripeController.js';

const router = express.Router();

router.post('/transactions', stripeTransactions);
router.post('/monthly-statement', monthlyStatement);
router.get('/generate-csv', generateCsv);

export default router;
