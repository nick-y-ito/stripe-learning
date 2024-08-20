import { Stripe } from 'stripe';

import { Order } from '@/types/itemType';

export interface IPaymentService {
  createIntent(order: Order): Promise<Stripe.PaymentIntent>;
}
