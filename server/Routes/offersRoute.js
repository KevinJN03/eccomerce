import express from 'express';
import {
  deactivate_offer,
  get_offer,
  update_listings,
} from '../Controllers/offersController';

const router = express.Router();
router.post('/update/listings', update_listings);
router.get('/deactivate/:id', deactivate_offer);

router.get('/:id', get_offer);

export default router;
