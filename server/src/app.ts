import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { paymentRouter } from '@/routers/payment.router';

export const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.json());

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.use('/payment', paymentRouter);
