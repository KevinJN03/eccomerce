import express from 'express';
import asyncHandler from 'express-async-handler';
import { adminLogin } from '../Controllers/adminController.js';
import { checkAdminAuthenticated } from '../middleware/checkAuthenticated.js';
import {
  forgetPassword,
  resetPassword,
} from '../Controllers/password-change.js';

const router = express.Router();

router.get('/server-status', (req, res) => {
  res.send('OK');
});
router.post('/admin/login', adminLogin);
router.get('/admin/check', [
  checkAdminAuthenticated,
  asyncHandler((req, res, next) => {
    res.send({ success: true });
  }),
]);

router.post('reset-password', resetPassword);
router.post('forget-password', forgetPassword);

export default router;
