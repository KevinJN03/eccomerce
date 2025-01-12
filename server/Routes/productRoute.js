import express from 'express';
import {
  get_all_products,
  get_single_product,
  create_new_product,
  get_many_product,
  increment_visit,
  beta_get_single_product
} from '../Controllers/productController.js';
const router = express.Router();

router.get('/', get_all_products);

router.get('/many/:id', get_many_product);
router.get('/:id', beta_get_single_product);

//router.get('/:id', get_single_product);
router.get('/:id/visit', increment_visit);

export default router;
