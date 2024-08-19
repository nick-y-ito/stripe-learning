import { Stripe } from 'stripe';

import { Item } from '@/types/ItemType';

export interface IPaymentService {
  createIntent(items: Item[]): Promise<Stripe.PaymentIntent>;
}
