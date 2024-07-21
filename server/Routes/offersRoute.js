import express from 'express';
import { get_offer } from '../Controllers/offersController';

const router = express.Router();

router.get('/:id', get_offer);

export default router;
