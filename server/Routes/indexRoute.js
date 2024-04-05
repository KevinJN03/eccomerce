import express from 'express';
import urllib from 'urllib';
import 'dotenv/config.js';
import asyncHandler from 'express-async-handler';
import { adminLogin } from '../Controllers/adminController.js';
import { checkAdminAuthenticated } from '../middleware/checkAuthenticated.js';
import {
  forgetPassword,
  resetPassword,
} from '../Controllers/password-change.js';
import { orderSearchIndex, productSearchIndex } from '../utils/searchIndex.js';
import cartRoute from './cartRoute.js';
const router = express.Router();
router.use('/cart', cartRoute);
router.get('/server-status', (req, res) => {
  res.send('OK');
});
router.post('/admin/login', adminLogin);
router.get('/admin/check', [
  checkAdminAuthenticated,
  asyncHandler((req, res, next) => {
    res.send({ success: true });
  }),
]);

router.post('reset-password', resetPassword);
router.post('forget-password', forgetPassword);

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
