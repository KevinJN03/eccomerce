import express from 'express';
import generateModelSchemaRoute from '../Controllers/cartController.js';
import CartModel from '../Models/cart.js';

const router = express.Router();
const {
  createDocument,
  retrieveDocument,
  updateDocument,
  removeFromDocument,
  addToDocument,
  updateProperty,
} = generateModelSchemaRoute(CartModel, 'cart');
router.post('/create', createDocument);
router.put('/update/:id', updateDocument);
router.get('/remove', removeFromDocument);
router.post('/add', addToDocument);
router.post('/updateProperty', updateProperty);
router.get('/:id', retrieveDocument);
export default router;
