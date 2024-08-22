import express from 'express';
import {
  adminLogin,
  count_all,
  checkLogin,
  getAllUsers,
  getSingleOrder,
  updateOrder,
  exportPdf,
  generatePresignUrl,
  testPdf,
  searchOrder,
  getAllProducts,
  getProductFiles,
  updateProductFeature,
  updateStatus,
  editTitle,
  editPrice,
  shipOrder,
  mark_as_gift,
  cancelOrder,
  searchProducts,
  ai_word_suggestion,
  searchUser,
  updateUserStatus,
} from '../Controllers/adminController.js';
import {
  create_new_product,
  getProductsInfo,
  getVariations,
  update_product,
  update_product_category,
  update_product_delivery_profile,
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
  update_delivery_profile,
  get_delivery_profile_pagination,
} from '../Controllers/deliveryProfileController.js';
import {
  addPrivateNote,
  deletePrivateNote,
  editPrivateNote,
  getAdminOrders,
} from '../Controllers/orderController.js';
import {
  create_coupon,
  get_all_coupons,
} from '../Controllers/couponController.js';
import { get_all_category } from '../Controllers/categoryController.js';
import {
  get_setting,
  update_settings,
} from '../Controllers/settingController.js';
import stripeRoute from './stripeRoute.js';
import offerRoute from './offersRoute.js';
import giftCardRoute from './giftCardRoute.js';
const router = express.Router();

router.use('/giftcards', giftCardRoute);
router.use('/offers', offerRoute);
router.use('/stripe', stripeRoute);
router.get('/user/search', searchUser);
router.post('/user/status', updateUserStatus);

router.get('/user/all', getAllUsers);
router.post('/user/create', create_user);
router.post('/user/update/:id', update_single);
router.get('/user/:id', get_single_user);

router.get('/category/all', get_all_category);
router.get('/product/search', searchProducts);
router.get('/product/wordSuggestion', ai_word_suggestion);
router.get('/product/:id', getProductsInfo);
router.get('/product/:id/variation', getVariations);
router.get('/count', count_all);
router.get('/order/:id', getSingleOrder);
router.get('/orders', getAllOrders);
router.get('/coupon/all', get_all_coupons);
router.post('/coupon/create', create_coupon);
router.delete('/delete/user/:id', delete_user);
router.delete('/delete/product/:ids', delete_product);
router.post('/delivery/create', create_delivery_profile);
router.get('/delivery/all', get_all_delivery_profile);
router.get('/delivery/paginate', get_delivery_profile_pagination);
router.delete('/delete/delivery/:id', delete_single_delivery_profile);
router.get('/delivery/:id', get_single_delivery_profile);
router.post('/delivery/update', update_delivery_profile);
router.put('/delivery/update/:id', update_single_delivery_profile);
router.delete('/delete/user/many/:id', delete_many_user);
router.post('/product/create', create_new_product);
router.get('/product', get_all_products);
router.put('/product/update/:id', update_product);
router.put('/order/:id/update', updateOrder);
router.put('/order/:id/shipped', shipOrder);
router.post('/order/:id/cancelled', cancelOrder);
router.post('/order/mark_as_gift', mark_as_gift);
router.post('/orders/all', getAdminOrders);
router.post('/pdf/export', exportPdf);
router.post('/pdf/url', generatePresignUrl);
router.get('/pdf/test', testPdf);
router.post('/searchOrder', searchOrder);
router.post('/privateNote/add', addPrivateNote);
router.post('/privateNote/edit', editPrivateNote);
router.delete('/privateNote/delete', deletePrivateNote);
router.post('/products/all', getAllProducts);
router.get('/productFiles/:id', getProductFiles);
router.get('/product/featured/:id', updateProductFeature);
router.post('/product/status/update', updateStatus);
router.post('/product/title/update', editTitle);
router.get(`/setting`, get_setting);
router.put('/setting/update', update_settings);
router.post('/product/price/update', editPrice);
router.post('/product/delivery/update', update_product_delivery_profile);
router.put('/product/category/update', update_product_category);

export default router;
