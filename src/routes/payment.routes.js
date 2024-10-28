import express from 'express';
import { checkout, paymentVerification } from '../controllers/payment.controllers.js';

const paymentsRouter = express.Router();

paymentsRouter.post('/checkout', checkout);
paymentsRouter.post('/paymentVerification', paymentVerification);

export default paymentsRouter;