import { z } from "zod";

export const AppTypeSchema =
  z.string().min(1);

export const AppIntentSchema = z.object({
  appName: z.string().min(1),

  appType: AppTypeSchema,

  features: z.array(z.string()),

  entities: z.array(z.string()),

  integrations_requested:
    z.array(z.string()),

  assumptions: z.array(z.string()),
});

export type AppIntent = z.infer<
  typeof AppIntentSchema
>;