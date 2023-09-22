import express from 'express';
import { count_all } from '../Controllers/adminController.js';
import { delete_user } from '../Controllers/userController.js';
import { delete_product } from '../Controllers/productController.js';
import {
  create_delivery_profile,
  delete_single_delivery_profile,
  get_all_delivery_profile,
  get_single_delivery_profile,
  update_single_delivery_profile,
} from '../Controllers/deliveryProfieController.js';
const router = express.Router();

router.get('/count', count_all);
router.delete('/delete/user/:id', delete_user);
router.delete('/delete/product/:id', delete_product);
router.post('/delivery/create', create_delivery_profile);
router.get('/delivery/all', get_all_delivery_profile);
router.delete('/delete/delivery/:id', delete_single_delivery_profile);
router.get('/delivery/:id', get_single_delivery_profile)
router.put('/delivery/update/:id', update_single_delivery_profile);
export default router;
