import { Request, Response } from 'express';

import { IPaymentController } from '@/controllers/IPaymentController';
import { IPaymentService } from '@/services/IPaymentService';
import { Item } from '@/types/ItemType';

export class PaymentController implements IPaymentController {
  constructor(private paymentService: IPaymentService) {}

  /**
   * POST /payment/create-intent
   */
  async createIntent(req: Request, res: Response) {
    const { items } = req.body as { items: Item[] };

    try {
      const paymentIntent = await this.paymentService.createIntent(items);

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ error: err.message });
      } else {
        res.status(500).send({ error: 'An unknown error occurred.' });
      }
    }
  }
}
