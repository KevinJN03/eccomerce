import mongoose from 'mongoose';
import { productSchema } from './product.js';

export default mongoose.model('draftProduct', productSchema);
