import { Stripe } from 'stripe';

export class CustomerRepository {
  constructor(private stripe: Stripe) {}

  async findOrCreateCustomer(): Promise<Stripe.Response<Stripe.Customer>> {
    // TODO: Handle the case where the customer already exists
    // Currently, this method always creates a new customer
    return await this.stripe.customers.create();
  }
}
