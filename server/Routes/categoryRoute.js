import express from 'express';
import {
  get_all_category,
  get_singleCategory,
  query_category_products_by_gender,
} from '../Controllers/categoryController.js';

const router = express.Router();

// router.get('/', get_all_category);
router.get('/:name', get_singleCategory);
router.get('/:name/:gender', query_category_products_by_gender);
export default router;
