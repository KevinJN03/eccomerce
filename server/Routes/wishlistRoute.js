import express from 'express';
import WishlistModel from '../Models/wishlist.js';
import generateModelSchemaRoute from '../Controllers/cartController.js';

const router = express.Router();
const {
  createDocument,
  retrieveDocument,
  updateDocument,
  removeFromDocument,
  addToDocument,
  updateProperty,
  getVariationValue
} = generateModelSchemaRoute(WishlistModel, 'wishlist');
router.post('/create', createDocument);
router.put('/update/:id', updateDocument);
router.get('/remove', removeFromDocument);
router.post('/add', addToDocument);
router.post('/updateProperty', updateProperty);
router.get('/:id', retrieveDocument);
router.post('/:id/variation', getVariationValue);

export default router;
