import { Order } from '@/types/itemType';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const createPaymentIntent = async (order: Order) => {
  const res = await fetch(`${BACKEND_API_URL}/payment/create-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order }),
  });

  return await res.json();
};
