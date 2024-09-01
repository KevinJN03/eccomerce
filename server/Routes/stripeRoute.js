import express from 'express';
import {
  add_bank_account,
  generateCsv,
  monthlyStatement,
  retrieve_bank_account,
  stripeTransactions,
  update_schedule,
  verify_bank_account,
} from '../Controllers/stripeController.js';

const router = express.Router();

router.post('/transactions', stripeTransactions);
router.post('/monthly-statement', monthlyStatement);
router.get('/generate-csv', generateCsv);
router.post('/add-account', add_bank_account);
router.get('/bank-account', retrieve_bank_account);
router.post('/verify-bank-account', verify_bank_account);
router.get('/payout-schedule', update_schedule)

export default router;
