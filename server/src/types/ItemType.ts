export type Item = {
  id: string;
  name: string;
  priceInCents: number;
};

type OrderItem = {
  id: Item['id'];
  quantity: number;
};

export type Order = OrderItem[];
