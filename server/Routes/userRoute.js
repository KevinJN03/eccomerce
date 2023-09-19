import { dummy_data, get_all_users } from '../Controllers/userController.js';
import express from 'express';
const router = express.Router();

router.get('/all', get_all_users);
router.get('/dummy', dummy_data)

export default router;
