import express from 'express';
import {
  get_all_category,
  get_singleCategory,
} from '../Controllers/categoryController.js';

const router = express.Router();

router.get('/', get_all_category);
router.get('/:name', get_singleCategory);

export default router;
