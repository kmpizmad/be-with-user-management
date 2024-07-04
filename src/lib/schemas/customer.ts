import { z } from 'zod';

export const customerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(4).max(16),
  password: z.string().min(8),
  paymentInfo: z.object({
    card: z.object({
      number: z.string(),
      expirationYear: z.number(),
      expirationMonth: z.number(),
      cvc: z.string(),
    }),
    amount: z.number(),
    dueDate: z.date(),
  }),
});

export type CustomerSchema = z.infer<typeof customerSchema>;
