import { Item } from '@/types/itemType';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const createPaymentIntent = async (items: Item[]) => {
  const res = await fetch(`${BACKEND_API_URL}/payment/create-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });

  return await res.json();
};
