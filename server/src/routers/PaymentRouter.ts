import express from 'express';
import Stripe from 'stripe';

import { PaymentController } from '@/controllers/PaymentController';
import { CustomerRepository } from '@/repositories/CustomerRepository';
import { ItemRepository } from '@/repositories/ItemRepositoy';
import { PaymentService } from '@/services/PaymentService';

export const paymentRouter = express.Router();

const TEST_SECRET_KEY =
  'sk_test_51PlkU0IJDLrZHQu8JttWPLwaXndQzMdeyFtjLBmeB323dGx1Hi5peFvPM7sSA1QbcBfR17W29BaC3q585qHXxJxQ007k9EvvFV';

const stripe = new Stripe(TEST_SECRET_KEY);

const customerRepository = new CustomerRepository(stripe);
const itemRepository = new ItemRepository();
const paymentService = new PaymentService(stripe, customerRepository, itemRepository);
const paymentController = new PaymentController(paymentService);

paymentRouter.post('/create-intent', paymentController.createIntent.bind(paymentController));
