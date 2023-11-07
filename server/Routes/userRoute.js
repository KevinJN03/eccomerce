import {
  create_user,
  dummy_data,
  get_all_users,
  signUp_user,
  loginUser,
  checkUser
} from '../Controllers/userController.js';

import passport from 'passport';
import express from 'express';
const router = express.Router();

router.get('/all', get_all_users);
router.get('/dummy', dummy_data);
router.post('/create', create_user);
router.post('/login', loginUser);
router.post('/signup', signUp_user);
router.get('/check', checkUser)
export default router;
