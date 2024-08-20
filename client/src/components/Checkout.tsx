'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { createPaymentIntent } from 'api/checkoutApi';
import { useEffect, useState } from 'react';

import { Item } from '@/types/itemType';

const TEST_SECRET_KEY =
  'pk_test_51PlkU0IJDLrZHQu8Bfzm0EVRTcjkbmNkcKglkiHD3bzN41cLXz1oM8kJXDju10uJgrJjx3wj57vybrtQU9lNfCjv00BI8LdJ8a';

// Call loadStripe outside of a component’s render to avoid recreating the Stripe object on every render.
const stripePromise = loadStripe(TEST_SECRET_KEY);

const items: Item[] = [{ id: 'xl-tshirt' }];

interface ICheckoutProps {}

// eslint-disable-next-line
export const Checkout = ({}: ICheckoutProps) => {
  const [clientSecret, setClientSecret] = useState('');

  /* Create a PaymentIntent as soon as the page loads */
  useEffect(() => {
    (async () => {
      const data = await createPaymentIntent(items);
      console.log(data);
      setClientSecret(data.clientSecret);
    })();
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {/* <CheckoutForm /> */}
        </Elements>
      )}
    </div>
  );
};
