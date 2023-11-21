import express from 'express';
import stripeWebHooks from '../Controllers/WebHooks/stripeWebhooks.js';
const router = express.Router();

router.post('/', stripeWebHooks);

export default router;
