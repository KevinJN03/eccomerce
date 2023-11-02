import {
  create_user,
  dummy_data,
  get_all_users,
  signUp_user,
} from '../Controllers/userController.js';
import express from 'express';
const router = express.Router();

router.get('/all', get_all_users);
router.get('/dummy', dummy_data);
router.post('/create', create_user);

router.post('/signup', signUp_user);
export default router;
