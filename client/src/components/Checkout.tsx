'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { createPaymentIntent } from 'api/checkoutApi';
import { useEffect, useState } from 'react';

import { CheckoutForm } from '@/components/CheckoutForm';
import { Order } from '@/types/itemType';

const TEST_SECRET_KEY =
  'pk_test_51PlkU0IJDLrZHQu8Bfzm0EVRTcjkbmNkcKglkiHD3bzN41cLXz1oM8kJXDju10uJgrJjx3wj57vybrtQU9lNfCjv00BI8LdJ8a';

// Call loadStripe outside of a component’s render to avoid recreating the Stripe object on every render.
const stripePromise = loadStripe(TEST_SECRET_KEY);

const order: Order = [{ id: '827cff0b-be12-4891-a411-c86fa12f0d34', quantity: 3 }];

interface ICheckoutProps {}

// eslint-disable-next-line
export const Checkout = ({}: ICheckoutProps) => {
  const [clientSecret, setClientSecret] = useState('');

  /* Create a PaymentIntent as soon as the page loads */
  useEffect(() => {
    (async () => {
      const data = await createPaymentIntent(order);
      setClientSecret(data.clientSecret);
    })();
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'flat', // 'stripe' | 'night' | 'flat'
      variables: {
        // colorPrimary: 'rgb(255, 157, 77)',
        // colorBackground: 'rgb(247, 247, 247)',
        // colorText: 'rgb(0, 0, 0)',
      },
    },
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};
