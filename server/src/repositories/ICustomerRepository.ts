import { Stripe } from 'stripe';

export interface ICustomerRepository {
  findOrCreateCustomer(): Promise<Stripe.Response<Stripe.Customer>>;
}
