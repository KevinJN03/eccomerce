import express from 'express';
import {
  deactivate_offer,
  get_offer,
  update_listings,
  overallPerformance,
  get_all_offers,
} from '../Controllers/offersController';

const router = express.Router();
router.post('/update/listings', update_listings);
router.get('/deactivate/:id', deactivate_offer);
router.get('/:id', get_offer);
router.post('/overall-performance', overallPerformance);
router.post('/all', get_all_offers);
export default router;
