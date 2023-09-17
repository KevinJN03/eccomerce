import express from 'express';
import { search_product } from '../Controllers/searchController.js';
const router = express.Router();

router.get('/', search_product);

export default router;
