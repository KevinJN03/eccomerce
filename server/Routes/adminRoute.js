import express from 'express';
import {
  adminLogin,
  count_all,
  checkLogin,
  getAllUsers,
  getSingleOrder,
  updateOrder,
} from '../Controllers/adminController.js';
import {
  create_new_product,
  get_single_admin_product,
  getVariations,
  delete_many_product,
  update_product,
} from '../Controllers/productController.js';
import {
  create_user,
  delete_user,
  get_single_user,
  delete_many_user,
  update_single,
} from '../Controllers/userController.js';
import {
  delete_product,
  get_all_products,
} from '../Controllers/productController.js';
import {
  create_delivery_profile,
  delete_single_delivery_profile,
  get_all_delivery_profile,
  get_single_delivery_profile,
  update_single_delivery_profile,
  getAllOrders,
} from '../Controllers/deliveryProfileController.js';
const router = express.Router();
router.get('/product/:id', get_single_admin_product);
router.get('/product/:id/variation', getVariations);

router.get('/count', count_all);
router.get('/order/:id', getSingleOrder);
router.get('/orders', getAllOrders);

router.delete('/delete/user/:id', delete_user);
router.delete('/delete/product/:id', delete_product);
router.delete('/delete/product/many/:id', delete_many_product);
router.post('/delivery/create', create_delivery_profile);
router.get('/delivery/all', get_all_delivery_profile);
router.delete('/delete/delivery/:id', delete_single_delivery_profile);
router.get('/delivery/:id', get_single_delivery_profile);
router.put('/delivery/update/:id', update_single_delivery_profile);
router.post('/user/create', create_user);
router.post('/user/update/:id', update_single);
router.get('/user/all', getAllUsers);
router.get('/user/:id', get_single_user);
router.delete('/delete/user/many/:id', delete_many_user);
router.post('/product/create', create_new_product);
router.get('/product', get_all_products);

router.put('/product/update/:id', update_product);
router.put('/order/:id/update', updateOrder);
// router.get('/check', checkLogin)
export default router;
