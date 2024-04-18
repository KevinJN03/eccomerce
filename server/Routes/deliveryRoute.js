import express from 'express';
import { get_many_delivery_profile } from '../Controllers/deliveryProfileController.js';

const router = express.Router();

router.post('/many/', get_many_delivery_profile);

export default router;
