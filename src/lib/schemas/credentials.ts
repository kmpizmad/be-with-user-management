import { z } from 'zod';

export const appCredentialSchema = z.object({
  appId: z.number(),
  apiKey: z.string(),
});

export type AppCredentialSchema = z.infer<typeof appCredentialSchema>;
