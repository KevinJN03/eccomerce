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
const { EASYSHIP_ACCESS_TOKEN, EASYSHIP_ACCESS_TOKEN_PROD } = process.env;
import Easyship from 'easyship';

const easyship = Easyship(EASYSHIP_ACCESS_TOKEN_PROD);
const router = express.Router();

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

router.get(
  '/easyship',
  asyncHandler(async (req, res, next) => {
    // POST /rate/v1/rates
    const result = await easyship.rate.create({
      origin_postal_code: '60605',
      destination_country_alpha2: 'US',
      destination_postal_code: '60605',
      taxes_duties_paid_by: 'Sender',
      is_insured: false,
      apply_shipping_rules: true,
      items: [
        {
          actual_weight: 1.2,
          height: 10,
          width: 15,
          length: 20,
          category: 'mobiles',
          declared_currency: 'SGD',
          declared_customs_value: 100,
        },
      ],
    });
    console.log(result);

    res.send(result);
  }),
);

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
