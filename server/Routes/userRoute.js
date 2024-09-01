import {
  create_user,
  dummy_data,
  signUp_user,
  loginUser,
  checkUser,
  logoutUser,
  getAllUserData,
  changeDetails,
  addUserAddress,
  deleteAddress,
  editAddress,
  updatePreferences,
  updateDefaultAddress,
  addPaymentMethod,
  deletePaymentMethod,
  changeDefaultMethod,
  saveCustomerCard,
  getPaymentMethods,
  setUpPaypal,
  setUpKlarna,
  getOrders,
  changePassword,
  addDigitalPaymentMethod,
  cancelOrder,
  getWishlist,
  updateWishlist,
  userLogout,
} from '../Controllers/userController.js';

import passport from 'passport';
import express from 'express';
import AuthRoute from '../Controllers/authController';
import {
  getAllUserGiftCards,
  saveGiftCard,
} from '../Controllers/giftCardController.js';

const router = express.Router();
router.use('/', AuthRoute);
router.get('/dummy', dummy_data);
router.post('/create', create_user);
router.post('/login', loginUser);
router.get('/logout', userLogout);
router.post('/signup', signUp_user);
router.get('/check', checkUser);
router.get('/userData', getAllUserData);
router.post('/address/add', addUserAddress);
router.put('/address/edit/:id', editAddress);
router.delete('/address/delete/:id', deleteAddress);
router.put('/address/changeDefault', updateDefaultAddress);
router.put('/changedetails', changeDetails);
router.put('/changepreferences', updatePreferences);

router.get('/payment-method/card/save', saveCustomerCard);
router.get('/payment-method/paypal', setUpPaypal);
router.get('/payment-method/klarna', setUpKlarna);
router.post('/payment-method/add', addPaymentMethod);
router.post('/payment-method/changedefault/:id', changeDefaultMethod);
router.delete('/payment-method/delete/:id', deletePaymentMethod);
router.get('/payment-method/all', getPaymentMethods);
router.get('/orders', getOrders);
router.post('/change-password', changePassword);
router.post('/cancel-order', cancelOrder);
router.post('/payment-method/digital', addDigitalPaymentMethod);
router.get('/wishlist', getWishlist);
router.post('/gift-card/save', saveGiftCard);
router.get('/gift-card/all', getAllUserGiftCards);

router.post('/wishlist/update', updateWishlist);
export default router;
