import express from 'express';
import { createCart, retrieveCart, updateCart } from '../Controllers/cartController';
const router = express.Router();

router.post('/create', createCart);
router.put('/update/:id', updateCart);

router.get('/:id', retrieveCart);

export default router;
