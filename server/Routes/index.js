import express from 'express';
import urllib from 'urllib';
import 'dotenv/config.js';
import asyncHandler from 'express-async-handler';
import { adminLogin } from '../Controllers/adminController.js';
import {
  checkAdminAuthenticated,
  checkAuthenticated,
} from '../middleware/checkAuthenticated.js';
import {
  forgetPassword,
  resetPassword,
} from '../Controllers/password-change.js';
import { orderSearchIndex, productSearchIndex } from '../utils/searchIndex.js';
import cartRoute from './cartRoute.js';
import wishlistRoute from './wishlistRoute.js';
import emailTestRoute from '../React Email/emailtest.js';
import { loginUser, signUp_user, userLogout } from '../Controllers/userController.js';
import { get_single_giftCard } from '../Controllers/giftCardController.js';
import productRoute from './productRoute.js';
import categoryRoute from './categoryRoute.js';
import couponRoute from './couponRoute.js';
import searchRoute from './searchRoute.js';
import webHookRoute from './webhookRoute.js';
import userRoute from './userRoute.js';
import adminRoute from './adminRoute.js';
import orderRoute from './orderRoute.js';
import deliveryRoute from './deliveryRoute.js';
import authRoute from './authRoute.js';
const router = express.Router();
router.post('/user/login', loginUser);
router.get('/user/logout', userLogout);
router.post('/user/sign-up', signUp_user);
router.post('/admin/login', adminLogin);
router.get('/admin/check', [
  checkAdminAuthenticated,
  asyncHandler((req, res, next) => {
    res.status(200).send({ success: true });
  }),
]);
router.post('/reset-password', resetPassword);
router.post('/forget-password', forgetPassword);

// Add routes to the index router
router.use('/product', productRoute);
router.use('/coupon', couponRoute);
router.use('/category', categoryRoute);
router.use('/search', searchRoute);
//router.use('/giftcard', giftCardRoute);

// attach oauth route and user authorization route to /user
router.use('/user', [authRoute, [checkAuthenticated, userRoute]]);
router.use('/admin', [checkAdminAuthenticated, adminRoute]);
router.use('/order', orderRoute);
router.use('/delivery', deliveryRoute);
router.use('/webhook', webHookRoute);
router.use('/test', emailTestRoute);
router.get('/giftCard', get_single_giftCard);
router.use('/cart', cartRoute);
router.use('/wishlist', wishlistRoute);

router.get('/server-status', (req, res) => {
  return res.send({ success: true });
});





// router.get(
//   '/searchIndex',
//   asyncHandler(async (req, res, next) => {
//     const { GROUP_ID, CLUSTER_NAME, ATLAS_USER, ATLAS_USER_KEY } = process.env;
//     const url = `https://cloud.mongodb.com/api/atlas/v2/groups/${GROUP_ID}/clusters/${CLUSTER_NAME}/fts/indexes?pretty=true`;

//     const options = {
//       digestAuth: `${ATLAS_USER}:${ATLAS_USER_KEY}`,
//       data: { ...productSearchIndex },

//       headers: {
//         Accept: 'application/vnd.atlas.2023-02-01+json',
//       },
//     };

//     const { data, res: response } = await urllib.request(url, options);

//     res.status(200).send({ data: JSON.parse(data.toString('utf8')) });
//   }),
// );

export default router;
