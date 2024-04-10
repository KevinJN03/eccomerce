import mongoose from 'mongoose';
import { cartSchema } from './cart.js';

export default mongoose.model('wishlist', cartSchema);
