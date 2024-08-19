import { Stripe } from 'stripe';

import { IPaymentService } from '@/services/IPaymentService';
import { Item } from '@/types/ItemType';

const TEST_SECRET_KEY =
  'sk_test_51PlkU0IJDLrZHQu8JttWPLwaXndQzMdeyFtjLBmeB323dGx1Hi5peFvPM7sSA1QbcBfR17W29BaC3q585qHXxJxQ007k9EvvFV';

const stripe = new Stripe(TEST_SECRET_KEY);

export class PaymentService implements IPaymentService {
  async createIntent(items: Item[]) {
    return await stripe.paymentIntents.create({
      amount: PaymentService.calculateOrderAmount(items),
      currency: 'cad',
    });
  }

  static calculateOrderAmount = (items: Item[]) => {
    let total = 0;
    items.forEach((item) => {
      total += item.amount;
    });
    return total;
  };
}
