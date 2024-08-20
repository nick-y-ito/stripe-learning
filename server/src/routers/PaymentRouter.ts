import express from 'express';

import { PaymentController } from '@/controllers/PaymentController';
import { ItemRepository } from '@/repositories/ItemRepositoy';
import { PaymentService } from '@/services/PaymentService';

export const paymentRouter = express.Router();

const itemRepository = new ItemRepository();
const paymentService = new PaymentService(itemRepository);
const paymentController = new PaymentController(paymentService);

paymentRouter.post('/create-intent', paymentController.createIntent.bind(paymentController));
