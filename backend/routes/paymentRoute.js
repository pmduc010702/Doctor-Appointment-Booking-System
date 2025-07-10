import express from 'express';
import authUser from '../middlewares/authUser.js';
import { createCheckoutSession } from '../controllers/paymentController.js';

const paymentRoute = express.Router();

paymentRoute.post('/create-checkout-session', authUser, createCheckoutSession);

export default paymentRoute;
