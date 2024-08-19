import { Request, Response } from 'express';

export interface IPaymentController {
  createIntent(req: Request, res: Response): Promise<void>;
}
