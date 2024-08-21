import Stripe from 'stripe';

import { ICustomerRepository } from '@/repositories/ICustomerRepository';
import { IItemRepository } from '@/repositories/IItemRepository';
import { IPaymentService } from '@/services/IPaymentService';
import { Order } from '@/types/itemType';

const CURRENCY = 'cad';

export class PaymentService implements IPaymentService {
  constructor(
    private stripe: Stripe,
    private customerRepository: ICustomerRepository,
    private itemRepository: IItemRepository,
  ) {}

  async createIntent(order: Order) {
    const customer = await this.customerRepository.findOrCreateCustomer();

    const totalAmountInCents = this.calculateOrderAmount(order);
    return await this.stripe.paymentIntents.create({
      customer: customer.id,
      setup_future_usage: 'off_session', // 'on_session' or 'off_session'

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
