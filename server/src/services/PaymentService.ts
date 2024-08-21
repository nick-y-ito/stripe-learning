import { Stripe } from 'stripe';

import { IItemRepository } from '@/repositories/IItemRepository';
import { IPaymentService } from '@/services/IPaymentService';
import { Order } from '@/types/itemType';

const TEST_SECRET_KEY =
  'sk_test_51PlkU0IJDLrZHQu8JttWPLwaXndQzMdeyFtjLBmeB323dGx1Hi5peFvPM7sSA1QbcBfR17W29BaC3q585qHXxJxQ007k9EvvFV';

const stripe = new Stripe(TEST_SECRET_KEY);

const CURRENCY = 'cad';

export class PaymentService implements IPaymentService {
  constructor(private itemRepository: IItemRepository) {}

  async createIntent(order: Order) {
    const totalAmountInCents = this.calculateOrderAmount(order);
    return await stripe.paymentIntents.create({
      amount: totalAmountInCents,
      currency: CURRENCY,

      // // Manually configure the payment method types
      // payment_method_types: ['card', 'google_pay'],

      // // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      // automatic_payment_methods: {
      //   enabled: true,
      // },
    });
  }

  private calculateOrderAmount(orderItems: Order): number {
    let totalAmountInCents = 0;
    orderItems.forEach((item) => {
      const itemFromDb = this.itemRepository.getItemById(item.id);
      if (itemFromDb) {
        totalAmountInCents += itemFromDb.priceInCents * item.quantity;
      }
    });
    return totalAmountInCents;
  }
}
