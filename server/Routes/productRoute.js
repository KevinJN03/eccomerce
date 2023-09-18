import express from 'express';
import {
  get_all_products,
  get_single_product,
} from '../Controllers/productController.js';
const router = express.Router();

router.get('/', get_all_products);

// router.get('/category', get_all_by_category);

router.get('/:id', get_single_product);

export default router;
