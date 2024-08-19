import express from 'express';

import { PaymentController } from '@/controllers/PaymentController';
import { PaymentService } from '@/services/PaymentService';

export const paymentRouter = express.Router();

const paymentService = new PaymentService();
const paymentController = new PaymentController(paymentService);

paymentRouter.post('/create-intent', paymentController.createIntent.bind(paymentController));
