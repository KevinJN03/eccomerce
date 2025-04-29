import express from 'express';
import { find_variation_option } from '../Controllers/variationController';


const router = express.Router()
router.post('/option', find_variation_option)

export default router;