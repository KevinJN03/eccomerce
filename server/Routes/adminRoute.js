import express from 'express';
import { count_all } from '../Controllers/adminController.js';
import { delete_user } from '../Controllers/userController.js';
import { delete_product } from '../Controllers/productController.js';
const router = express.Router();

router.get('/count', count_all);
router.delete('/delete/user/:id', delete_user);
router.delete('/delete/product/:id', delete_product);
export default router;
