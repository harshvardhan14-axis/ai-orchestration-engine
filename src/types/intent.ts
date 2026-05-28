import { z } from "zod";

export const AppTypeSchema = z.enum([
  "crm",
  "project_management",
  "ecommerce",
  "hr_tool",
  "inventory",
  "content_platform",
  "analytics",
  "custom",
]);

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